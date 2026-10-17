// Barcode Scanner using Html5Qrcode
class BarcodeScanner {
    constructor() {
        this.html5QrCode = null;
        this.isScanning = false;
        this.onScanSuccessCallback = null;
    }

    start(elementId, onSuccess, onError) {
        if (typeof Html5Qrcode === 'undefined') {
            if (onError) onError('Barkod kütüphanesi yüklenemedi. İnternet bağlantınızı kontrol edin.');
            return;
        }

        this.onScanSuccessCallback = onSuccess;
        const qrBoxSize = (viewfinderWidth, viewfinderHeight) => {
            const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
            return {
                width: Math.floor(minEdge * 0.75),
                height: Math.floor(minEdge * 0.45)
            };
        };

        const config = {
            fps: 15,
            qrbox: qrBoxSize,
            aspectRatio: 1.333334,
            experimentalFeatures: {
                useBarCodeDetectorIfSupported: true
            }
        };

        try {
            this.html5QrCode = new Html5Qrcode(elementId);
            this.html5QrCode.start(
                { facingMode: 'environment' }, // Back camera on mobile
                config,
                (decodedText, decodedResult) => {
                    this.stop();
                    if (this.onScanSuccessCallback) {
                        this.onScanSuccessCallback(decodedText, decodedResult);
                    }
                },
                (errorMessage) => {
                    // Frame scan failed, normal while seeking barcode
                }
            ).then(() => {
                this.isScanning = true;
            }).catch(err => {
                this.isScanning = false;
                if (onError) onError(err.message || 'Kamera açılamadı. Lütfen kamera izni verin.');
            });
        } catch (e) {
            if (onError) onError(e.message || 'Kamera başlatma hatası.');
        }
    }

    stop() {
        if (this.html5QrCode && this.isScanning) {
            this.html5QrCode.stop().then(() => {
                this.html5QrCode.clear();
                this.isScanning = false;
            }).catch(err => {
                console.warn('Barkod durdurma hatası:', err);
                this.isScanning = false;
            });
        }
    }
}

window.barcodeScanner = new BarcodeScanner();
