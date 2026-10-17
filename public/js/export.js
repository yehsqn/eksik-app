// PDF / Print Order Sheet Manager
class ExportManager {
    // Generate and open clean, well-structured PDF print dialog
    printOrderSheet(items, shopName = 'Dükkan') {
        const activeItems = (items || []).filter(i => i.status !== 'completed');

        if (activeItems.length === 0) {
            if (window.app && window.app.showToast) {
                window.app.showToast('Yazdırılacak aktif eksik ürün bulunmuyor.');
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

        const dateStr = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
        const timeStr = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

        // Build clean printable document inside print container
        let printArea = document.getElementById('pdf-print-area');
        if (!printArea) {
            printArea = document.createElement('div');
            printArea.id = 'pdf-print-area';
            document.body.appendChild(printArea);
        }

        const urgencyLabel = (u) => {
            if (u === 'critical') return '<span class="print-urgent">🔴 YOK SATIYOR</span>';
            if (u === 'urgent') return '<span class="print-urgent">🚨 ACİL</span>';
            return 'Normal';
        };

        let html = `
            <div class="pdf-container">
                <div class="pdf-header">
                    <div class="pdf-title-block">
                        <h1>${shopName.toUpperCase()} - EKSİK SİPARİŞ LİSTESİ</h1>
                        <p class="pdf-meta">Tarih: ${dateStr} ${timeStr} | Toplam Çeşit: <strong>${activeItems.length} Ürün</strong></p>
                    </div>
                </div>
        `;

        Object.keys(groups).forEach(supplier => {
            const supItems = groups[supplier];
            html += `
                <div class="pdf-supplier-section">
                    <div class="pdf-supplier-title">🏢 TOPTANCI: ${supplier.toUpperCase()} (${supItems.length} Çeşit)</div>
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
                            ${supItems.map((item, idx) => `
                                <tr>
                                    <td style="text-align: center;"><div class="print-checkbox"></div></td>
                                    <td class="pdf-item-name">${item.name}</td>
                                    <td class="pdf-item-qty"><strong>${item.quantity}</strong></td>
                                    <td>${urgencyLabel(item.urgency)}</td>
                                    <td style="color:#555; font-size:12px;">${item.notes || '-'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        });

        html += `
                <div class="pdf-footer">
                    <div>Bu liste Dükkan Eksik Takip uygulaması ile oluşturulmuştur.</div>
                </div>
            </div>
        `;

        printArea.innerHTML = html;

        // Trigger browser print dialog (Users can select "Save as PDF" / "PDF olarak kaydet" or Print)
        setTimeout(() => {
            window.print();
        }, 150);
    }
}

window.exportManager = new ExportManager();
