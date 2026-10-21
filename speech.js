// Speech Recognition with Turkish language support, iOS getUserMedia prompt & smart parser
class SpeechManager {
    constructor() {
        this.SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.available = !!this.SpeechRec;
        this.recognition = null;
        this.isListening = false;
        this.onResultCallback = null;
        this.onErrorCallback = null;
        this.onStateChange = null;
        this.hasPromptedMic = false;
    }

    translateError(err) {
        const errorMap = {
            'aborted': 'Mikrofon bağlantısı durduruldu veya izin bekleniyor. Lütfen "Tekrar Dene" butonuna basın.',
            'not-allowed': 'Mikrofon izni verilmedi. iPhone Ayarlar > Safari > Mikrofon bölümünden "İzin Ver"i seçiniz.',
            'service-not-allowed': 'Mikrofon servisine erişim izni verilmedi. Lütfen izinleri kontrol ediniz.',
            'no-speech': 'Ses algılanamadı. Lütfen mikrofona yakın konuşarak tekrar deneyiniz.',
            'network': 'Ses tanıma için internet bağlantısı gerekiyor.',
            'audio-capture': 'Mikrofon donanımı bulunamadı veya başka bir uygulama tarafından kullanılıyor.'
        };
        return errorMap[err] || `Ses algılama hatası: ${err}`;
    }

    async requestMicPermission() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                stream.getTracks().forEach(t => t.stop());
                this.hasPromptedMic = true;
                return true;
            } catch (err) {
                console.warn('getUserMedia permission error:', err);
                return false;
            }
        }
        return true;
    }

    async start(onResult, onError, onStateChange) {
        if (!this.available) {
            if (onError) onError('Tarayıcınız sesle yazmayı desteklemiyor. Lütfen Chrome, Edge veya Safari kullanın.', 'not_supported');
            return;
        }

        this.onResultCallback = onResult;
        this.onErrorCallback = onError;
        this.onStateChange = onStateChange;

        // On iOS Safari / Standalone Home Screen PWA: Request getUserMedia first to trigger system permission prompt
        if (!this.hasPromptedMic && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                stream.getTracks().forEach(t => t.stop());
                this.hasPromptedMic = true;
            } catch (permErr) {
                console.warn('Mikrofon izni alınamadı:', permErr);
                if (permErr.name === 'NotAllowedError' || permErr.name === 'PermissionDeniedError') {
                    if (this.onErrorCallback) {
                        this.onErrorCallback('Mikrofon izni verilmedi. iPhone Ayarları > Safari > Mikrofon bölümünden izin veriniz.', 'not-allowed');
                    }
                    return;
                }
            }
        }

        // Clean up any stale recognition instance (prevents iOS InvalidStateError)
        if (this.recognition) {
            try {
                this.recognition.onstart = null;
                this.recognition.onend = null;
                this.recognition.onerror = null;
                this.recognition.onresult = null;
                this.recognition.abort();
            } catch (e) {}
            this.recognition = null;
        }

        try {
            this.recognition = new this.SpeechRec();
            this.recognition.lang = 'tr-TR';
            this.recognition.continuous = false;
            this.recognition.interimResults = false;

            this.recognition.onstart = () => {
                this.isListening = true;
                if (this.onStateChange) this.onStateChange(true);
            };

            this.recognition.onend = () => {
                this.isListening = false;
                if (this.onStateChange) this.onStateChange(false);
            };

            this.recognition.onerror = (event) => {
                this.isListening = false;
                if (this.onStateChange) this.onStateChange(false);
                const translated = this.translateError(event.error);
                if (this.onErrorCallback) {
                    this.onErrorCallback(translated, event.error);
                }
            };

            this.recognition.onresult = (event) => {
                if (event.results && event.results[0] && event.results[0][0]) {
                    const transcript = event.results[0][0].transcript;
                    const parsed = this.parseTurkishVoiceInput(transcript);
                    if (this.onResultCallback) {
                        this.onResultCallback(parsed, transcript);
                    }
                }
            };

            this.recognition.start();
        } catch (e) {
            console.warn('Speech rec start error:', e);
            this.isListening = false;
            if (this.onStateChange) this.onStateChange(false);
            if (this.onErrorCallback) {
                this.onErrorCallback('Ses tanıma başlatılamadı. Lütfen "Tekrar Dene"ye basınız.', 'start_failed');
            }
        }
    }

    stop() {
        if (this.recognition) {
            try {
                this.recognition.stop();
            } catch (e) {}
        }
        this.isListening = false;
    }

    // Smart natural language parser for Turkish retail missing items
    parseTurkishVoiceInput(text) {
        if (!text) return { name: '', quantity: '1 adet', urgency: 'normal' };

        let cleanText = text.trim();
        let urgency = 'normal';
        let quantity = '1 adet';

        // Check urgency keywords
        if (/\b(çok acil|kritik|hemen|kalmadı|bitti|tükendi|yok satıyor)\b/i.test(cleanText)) {
            urgency = 'critical';
            cleanText = cleanText.replace(/\b(çok acil|kritik|hemen|kalmadı|bitti|tükendi|yok satıyor)\b/gi, '').trim();
        } else if (/\b(acil|çabuk|lazım)\b/i.test(cleanText)) {
            urgency = 'urgent';
            cleanText = cleanText.replace(/\b(acil|çabuk|lazım)\b/gi, '').trim();
        }

        // Match Turkish numbers & units: e.g. "3 koli", "5 paket", "10 adet", "2 kasa", "1 çuval", "4 şişe"
        const unitRegex = /^(\d+|bir|iki|üç|dört|beş|altı|yedi|sekiz|dokuz|on|on beş|yirmi|elli|yüz)\s*(koli|paket|adet|tane|kasa|çuval|şişe|kutu|kg|kilo|litre|bağ)\b/i;
        const match = cleanText.match(unitRegex);

        if (match) {
            const rawNumber = match[1].toLowerCase();
            const unit = match[2].toLowerCase();

            // Word number conversion
            const wordToNum = {
                'bir': '1', 'iki': '2', 'üç': '3', 'dört': '4', 'beş': '5',
                'altı': '6', 'yedi': '7', 'sekiz': '8', 'dokuz': '9', 'on': '10',
                'on beş': '15', 'yirmi': '20', 'elli': '50', 'yüz': '100'
            };

            const num = wordToNum[rawNumber] || rawNumber;
            quantity = `${num} ${unit}`;
            cleanText = cleanText.slice(match[0].length).trim();
        } else {
            // Check trailing quantity: e.g. "süt 3 koli"
            const trailRegex = /\b(\d+)\s*(koli|paket|adet|tane|kasa|çuval|şişe|kutu|kg|kilo|litre)\b/i;
            const trailMatch = cleanText.match(trailRegex);
            if (trailMatch) {
                quantity = `${trailMatch[1]} ${trailMatch[2].toLowerCase()}`;
                cleanText = cleanText.replace(trailRegex, '').trim();
            }
        }

        // Clean up punctuation
        cleanText = cleanText.replace(/^[,.\s]+|[,.\s]+$/g, '');
        // Capitalize first letter
        if (cleanText.length > 0) {
            cleanText = cleanText.charAt(0).toLocaleUpperCase('tr-TR') + cleanText.slice(1);
        }

        return {
            name: cleanText || text,
            quantity: quantity,
            urgency: urgency,
            rawText: text
        };
    }
}

window.speechManager = new SpeechManager();
