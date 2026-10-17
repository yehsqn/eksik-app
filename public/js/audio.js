// Web Audio API Synthesizer - Zero dependencies, zero latency
class SoundManager {
    constructor() {
        this.ctx = null;
        this.muted = localStorage.getItem('sound_muted') === 'true';
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        localStorage.setItem('sound_muted', this.muted);
        return this.muted;
    }

    // New item added chime (pleasant marimba bell)
    playNewItem() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        // First tone
        this.playTone(523.25, now, 0.15, 'sine'); // C5
        // Second higher tone
        this.playTone(659.25, now + 0.08, 0.25, 'sine'); // E5
        // Third chime
        this.playTone(783.99, now + 0.16, 0.35, 'sine'); // G5
    }

    // Urgent item alert (sharper warning tone)
    playUrgent() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        this.playTone(880, now, 0.12, 'triangle', 0.25);
        this.playTone(880, now + 0.15, 0.18, 'triangle', 0.3);
    }

    // Item completed / checked (uplifting resolution)
    playCompleted() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        this.playTone(440, now, 0.1, 'sine', 0.15);
        this.playTone(554.37, now + 0.08, 0.12, 'sine', 0.2);
        this.playTone(659.25, now + 0.16, 0.3, 'sine', 0.25);
    }

    // Delete sound (soft low blip)
    playDelete() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        this.playTone(300, now, 0.1, 'sine', 0.15);
        this.playTone(200, now + 0.05, 0.15, 'sine', 0.1);
    }

    playTone(freq, startTime, duration, type = 'sine', maxGain = 0.2) {
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, startTime);

            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(maxGain, startTime + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(startTime);
            osc.stop(startTime + duration);
        } catch (e) {
            console.warn('Audio tone error:', e);
        }
    }
}

window.soundManager = new SoundManager();
