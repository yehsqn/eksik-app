// PDF / Print Order Sheet Manager
class ExportManager {
    escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // Generate and open clean, well-structured PDF print dialog
    printOrderSheet(items, shopName = 'HKC') {
        const activeItems = (items || []).filter(i => i.status !== 'completed' && i.status !== 'deleted');

        if (activeItems.length === 0) {
            if (window.app && typeof window.app.showToast === 'function') {
                window.app.showToast('Yazdırılacak / PDF yapılacak aktif eksik ürün bulunmuyor.');
            } else {
                alert('Yazdırılacak / PDF yapılacak aktif eksik ürün bulunmuyor.');
            }
            return;
        }

        // Group items by supplier
        const groups = {};
        activeItems.forEach(item => {
            const sup = item.supplier || 'Belirtilmedi';
            if (!groups[sup]) groups[sup] = [];
            groups[sup].push(item);
        });

        const safeShop = this.escapeHtml((shopName || 'HKC').trim() || 'HKC');
        const dateStr = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
        const timeStr = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

        let printArea = document.getElementById('pdf-print-area');
        if (!printArea) {
            printArea = document.createElement('div');
            printArea.id = 'pdf-print-area';
            document.body.appendChild(printArea);
        }

        const urgencyLabel = (u) => {
            if (u === 'critical') return '<span class="print-urgent">YOK SATIYOR</span>';
            if (u === 'urgent') return '<span class="print-urgent">ACİL</span>';
            return 'Normal';
        };

        let html = `
            <div class="pdf-container">
                <div class="pdf-header">
                    <div class="pdf-title-block">
                        <h1>${safeShop.toLocaleUpperCase('tr-TR')} EKSİK LİSTESİ</h1>
                        <p class="pdf-meta">Tarih: ${dateStr} ${timeStr} | Toplam Çeşit: <strong>${activeItems.length} Ürün</strong></p>
                    </div>
                </div>
        `;

        Object.keys(groups).forEach(supplier => {
            const supItems = groups[supplier];
            const safeSup = this.escapeHtml(supplier.toLocaleUpperCase('tr-TR'));
            html += `
                <div class="pdf-supplier-section">
                    <div class="pdf-supplier-title">TOPTANCI: ${safeSup} (${supItems.length} Çeşit)</div>
                    <table class="pdf-table">
                        <thead>
                            <tr>
                                <th style="width: 40px; text-align: center;">✓</th>
                                <th>Ürün Adı</th>
                                <th style="width: 110px;">Miktar</th>
                                <th style="width: 120px;">Aciliyet</th>
                                <th>Not / Açıklama</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${supItems.map(item => `
                                <tr>
                                    <td style="text-align: center;"><div class="print-checkbox"></div></td>
                                    <td class="pdf-item-name">${this.escapeHtml(item.name)}</td>
                                    <td class="pdf-item-qty"><strong>${this.escapeHtml(item.quantity)}</strong></td>
                                    <td>${urgencyLabel(item.urgency)}</td>
                                    <td style="color:#475569; font-size:12px;">${item.notes ? this.escapeHtml(item.notes) : '-'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        });

        html += `
                <div class="pdf-footer">
                    <div>Bu liste ${safeShop} Eksik &amp; Sipariş Takip Sistemi ile oluşturulmuştur.</div>
                </div>
            </div>
        `;

        printArea.innerHTML = html;

        const originalTitle = document.title;
        document.title = `${(shopName || 'HKC').trim() || 'HKC'} Eksik Listesi`;
        window.addEventListener('afterprint', () => { document.title = originalTitle; }, { once: true });

        setTimeout(() => {
            window.print();
        }, 150);
    }
}

window.exportManager = new ExportManager();
