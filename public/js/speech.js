// Speech Recognition with Turkish language support and smart parser
class SpeechManager {
    constructor() {
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.available = !!SpeechRec;
        this.recognition = null;
        this.isListening = false;
        this.onResultCallback = null;
        this.onErrorCallback = null;

        if (this.available) {
            this.recognition = new SpeechRec();
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
                if (this.onErrorCallback) this.onErrorCallback(event.error);
            };

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                const parsed = this.parseTurkishVoiceInput(transcript);
                if (this.onResultCallback) {
                    this.onResultCallback(parsed, transcript);
                }
            };
        }
    }

    start(onResult, onError, onStateChange) {
        if (!this.available) {
            if (onError) onError('Tarayıcınız sesle yazmayı desteklemiyor. Lütfen Chrome, Edge veya Safari kullanın.');
            return;
        }

        this.onResultCallback = onResult;
        this.onErrorCallback = onError;
        this.onStateChange = onStateChange;

        try {
            this.recognition.start();
        } catch (e) {
            console.warn('Speech rec start error:', e);
            if (this.isListening) {
                this.recognition.stop();
            }
        }
    }

    stop() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
        }
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
