// History Page Script - Indonesian Cultural Theme

// DOM elements
const historyContainer = document.getElementById('history-container');
const backToScorerBtn = document.getElementById('back-to-scorer');
const clearHistoryBtn = document.getElementById('clear-history');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadHistory();
    
    // Event listeners
    backToScorerBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    
    clearHistoryBtn.addEventListener('click', clearAllHistory);
});

// Load and display history
function loadHistory() {
    const history = JSON.parse(localStorage.getItem('scoreHistory') || '[]');
    
    if (history.length === 0) {
        historyContainer.innerHTML = `
            <div class="no-history">
                <p>Belum ada riwayat skor tersimpan</p>
            </div>
        `;
        return;
    }
    
    let historyHTML = '';
    
    history.forEach((entry, index) => {
        const winnerClass = entry.winner === 'Seri' ? 'draw' : 'winner';
        const winnerIcon = entry.winner === 'Seri' ? '🤝' : '🏆';
        
        historyHTML += `
            <div class="history-card">
                <div class="history-header">
                    <span class="history-number">#${index + 1}</span>
                    <span class="history-date">${entry.date}</span>
                    <button class="btn-delete" onclick="deleteEntry(${entry.id})">🗑️</button>
                </div>
                <div class="history-body">
                    <div class="team-result">
                        <span class="team-name">${entry.team1.name}</span>
                        <span class="team-score ${entry.winner === entry.team1.name ? 'winning-score' : ''}">${entry.team1.score}</span>
                    </div>
                    <div class="vs-divider">VS</div>
                    <div class="team-result">
                        <span class="team-name">${entry.team2.name}</span>
                        <span class="team-score ${entry.winner === entry.team2.name ? 'winning-score' : ''}">${entry.team2.score}</span>
                    </div>
                </div>
                <div class="history-footer">
                    <div class="${winnerClass}">
                        ${winnerIcon} Pemenang: <strong>${entry.winner}</strong>
                    </div>
                    ${entry.note ? `<div class="match-note">📝 ${entry.note}</div>` : ''}
                </div>
            </div>
        `;
    });
    
    historyContainer.innerHTML = historyHTML;
}

// Delete a single entry
function deleteEntry(id) {
    Swal.fire({
        title: 'Hapus Riwayat?',
        text: 'Apakah Anda yakin ingin menghapus riwayat ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#8D6E63',
        cancelButtonColor: '#FFB300',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal',
        background: '#FFF8E1',
        color: '#2E1A16'
    }).then((result) => {
        if (result.isConfirmed) {
            let history = JSON.parse(localStorage.getItem('scoreHistory') || '[]');
            history = history.filter(entry => entry.id !== id);
            localStorage.setItem('scoreHistory', JSON.stringify(history));
            
            Swal.fire({
                icon: 'success',
                title: 'Terhapus!',
                text: 'Riwayat telah dihapus.',
                confirmButtonColor: '#FFB300',
                timer: 1500,
                showConfirmButton: false,
                background: '#FFF8E1',
                color: '#2E1A16'
            });
            
            loadHistory();
        }
    });
}

// Clear all history
function clearAllHistory() {
    const history = JSON.parse(localStorage.getItem('scoreHistory') || '[]');
    
    if (history.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Riwayat Kosong',
            text: 'Tidak ada riwayat untuk dihapus.',
            confirmButtonColor: '#FFB300',
            background: '#FFF8E1',
            color: '#2E1A16'
        });
        return;
    }
    
    Swal.fire({
        title: 'Hapus Semua Riwayat?',
        text: 'Semua riwayat skor akan dihapus permanen!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#8D6E63',
        cancelButtonColor: '#FFB300',
        confirmButtonText: 'Ya, Hapus Semua!',
        cancelButtonText: 'Batal',
        background: '#FFF8E1',
        color: '#2E1A16'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('scoreHistory');
            
            Swal.fire({
                icon: 'success',
                title: 'Semua Riwayat Terhapus!',
                text: 'Semua riwayat skor telah dihapus.',
                confirmButtonColor: '#FFB300',
                timer: 1500,
                showConfirmButton: false,
                background: '#FFF8E1',
                color: '#2E1A16'
            });
            
            loadHistory();
        }
    });
}
