// Intelligent Turkish Product Name Normalizer & Duplicate Detector
class DuplicateDetector {
    // Basic normalization: trim, lowercase, Turkish characters
    static normalizeBasic(text) {
        if (!text) return '';
        let s = String(text).toLowerCase().trim();
        s = s.replace(/ğ/g, 'g')
             .replace(/ü/g, 'u')
             .replace(/ş/g, 's')
             .replace(/ı/g, 'i')
             .replace(/ö/g, 'o')
             .replace(/ç/g, 'c');
        // Collapse multiple spaces
        return s.replace(/\s+/g, ' ');
    }

    // Advanced normalization: strip pack units and packaging numbers
    static normalizeWithoutPackaging(text) {
        let s = this.normalizeBasic(text);
        if (!s) return '';

        // Remove packaging patterns (e.g. "12 li", "12li", "36 lı", "6 lı", "500g", "1000gr", "1kg", "1.5lt", "750ml")
        s = s.replace(/\b\d+(\.\d+)?\s*(li|lı|lu|lü|lik|lık|adet|tane|paket|koli|kasa|kg|kilo|gr|gram|ml|lt|litre|cl|kutu|çuval|bag|bağ)\b/gi, ' ');
        s = s.replace(/\b\d+(li|lı|lu|lü|lik|lık|g|gr|kg|ml|lt)\b/gi, ' ');

        // Remove standalone numbers
        s = s.replace(/\b\d+\b/g, ' ');

        // Remove punctuation
        s = s.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"?]/g, ' ');

        return s.replace(/\s+/g, ' ').trim();
    }

    // Extract word tokens (allowing single-character tokens as well)
    static getTokens(text) {
        const norm = this.normalizeWithoutPackaging(text);
        if (!norm) return [];
        return norm.split(' ').filter(w => w.trim().length > 0);
    }

    // Check if new product name is duplicate or very similar to any active item
    static findSimilarItem(newName, activeItems) {
        if (!newName || !activeItems || activeItems.length === 0) return null;

        const rawNew = this.normalizeBasic(newName);
        const pkgNew = this.normalizeWithoutPackaging(newName);
        const tokensNew = this.getTokens(newName);

        for (const item of activeItems) {
            // Only check non-completed items
            if (item.status === 'completed') continue;

            const rawExisting = this.normalizeBasic(item.name);
            const pkgExisting = this.normalizeWithoutPackaging(item.name);

            // 1. EXACT match (works for "a" vs "a", "defter" vs "defter")
            if (rawNew === rawExisting) {
                return { item, matchType: 'exact', reason: 'Birebir aynı ürün adı' };
            }

            // 2. PACKAGING STRIPPED match (e.g. "defter 12 li" vs "defter" -> both become "defter")
            if (pkgNew && pkgExisting && pkgNew === pkgExisting) {
                return { item, matchType: 'pack_match', reason: `Aynı ürün kökü: "${pkgNew}"` };
            }

            // 3. One contains the other
            // e.g. "defter" inside "kareli defter 12li" or "çaykur rize" inside "çaykur rize çay"
            if (pkgNew && pkgExisting) {
                const wordsNew = tokensNew;
                const wordsExisting = this.getTokens(item.name);

                // If one contains the other as full phrase
                if (pkgNew.includes(pkgExisting) || pkgExisting.includes(pkgNew)) {
                    return { item, matchType: 'contained', reason: 'Benzer/içeren ürün adı' };
                }

                // If multi-word overlap
                if (wordsNew.length > 0 && wordsExisting.length > 0) {
                    const common = wordsNew.filter(w => wordsExisting.includes(w));
                    if (common.length >= Math.min(wordsNew.length, wordsExisting.length)) {
                        return { item, matchType: 'token_overlap', reason: `Ortak ürün: "${common.join(' ')}"` };
                    }
                }
            }
        }

        return null;
    }
}

if (typeof window !== 'undefined') {
    window.DuplicateDetector = DuplicateDetector;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DuplicateDetector;
}
