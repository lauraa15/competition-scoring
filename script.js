// Simplified Competition Scorer - Indonesian Cultural Theme
// Only team naming and scoring functionality

// Global variables
let team1Score = 0;
let team2Score = 0;

// DOM elements
const team1NameInput = document.getElementById('team1-name');
const team2NameInput = document.getElementById('team2-name');
const team1InstitutionInput = document.getElementById('team1-institution');
const team2InstitutionInput = document.getElementById('team2-institution');
const team1Display = document.getElementById('team1-display');
const team2Display = document.getElementById('team2-display');
const team1InstitutionDisplay = document.getElementById('team1-institution-display');
const team2InstitutionDisplay = document.getElementById('team2-institution-display');
const team1ScoreDisplay = document.getElementById('team1-score');
const team2ScoreDisplay = document.getElementById('team2-score');
const winnerText = document.getElementById('winner-text');
const resetScoresBtn = document.getElementById('reset-scores');
const saveScoreBtn = document.getElementById('save-score');
const viewHistoryBtn = document.getElementById('view-history');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Event listeners
    resetScoresBtn.addEventListener('click', resetScores);
    saveScoreBtn.addEventListener('click', saveScore);
    viewHistoryBtn.addEventListener('click', viewHistory);
    
    // Initialize team names
    updateTeamName(1);
    updateTeamName(2);
    updateInstitution(1);
    updateInstitution(2);
});

// Update team name display
function updateTeamName(teamNumber) {
    if (teamNumber === 1) {
        const name = team1NameInput.value.trim() || 'Tim 1';
        team1Display.textContent = name;
        team1NameInput.value = name;
    } else {
        const name = team2NameInput.value.trim() || 'Tim 2';
        team2Display.textContent = name;
        team2NameInput.value = name;
    }
}

// Update institution display
function updateInstitution(teamNumber) {
    if (teamNumber === 1) {
        const institution = team1InstitutionInput.value.trim();
        team1InstitutionDisplay.textContent = institution;
    } else {
        const institution = team2InstitutionInput.value.trim();
        team2InstitutionDisplay.textContent = institution;
    }
}

// Add points to a team
function addPoints(teamNumber, points) {
    if (teamNumber === 1) {
        team1Score = Math.max(0, team1Score + points);
        team1ScoreDisplay.textContent = team1Score;
        
        // Add animation effect
        team1ScoreDisplay.classList.add('score-change');
        setTimeout(() => team1ScoreDisplay.classList.remove('score-change'), 400);
    } else {
        team2Score = Math.max(0, team2Score + points);
        team2ScoreDisplay.textContent = team2Score;
        
        // Add animation effect
        team2ScoreDisplay.classList.add('score-change');
        setTimeout(() => team2ScoreDisplay.classList.remove('score-change'), 400);
    }
    
    // Update winner display
    updateWinner();
}

// Update winner display
function updateWinner() {
    const team1Name = team1Display.textContent;
    const team2Name = team2Display.textContent;
    
    if (team1Score === team2Score) {
        if (team1Score === 0) {
            winnerText.textContent = '';
        } else {
            winnerText.textContent = '🤝 Seri!';
        }
    } else if (team1Score > team2Score) {
        winnerText.textContent = `🏆 ${team1Name} Memimpin!`;
    } else {
        winnerText.textContent = `🏆 ${team2Name} Memimpin!`;
    }
}

// Reset scores to 0
function resetScores() {
    Swal.fire({
        title: 'Reset Skor?',
        text: 'Apakah Anda yakin ingin mereset skor ke 0?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#FFB300',
        cancelButtonColor: '#8D6E63',
        confirmButtonText: 'Ya, Reset!',
        cancelButtonText: 'Batal',
        background: '#FFF8E1',
        color: '#2E1A16'
    }).then((result) => {
        if (result.isConfirmed) {
            team1Score = 0;
            team2Score = 0;
            
            team1ScoreDisplay.textContent = '0';
            team2ScoreDisplay.textContent = '0';
            
            winnerText.textContent = '';
            
            // Add animation to both score displays
            team1ScoreDisplay.classList.add('score-change');
            team2ScoreDisplay.classList.add('score-change');
            setTimeout(() => {
                team1ScoreDisplay.classList.remove('score-change');
                team2ScoreDisplay.classList.remove('score-change');
            }, 400);
            
            Swal.fire({
                icon: 'success',
                title: 'Skor Direset!',
                text: 'Kedua tim telah direset ke 0.',
                confirmButtonColor: '#FFB300',
                timer: 2000,
                showConfirmButton: false,
                background: '#FFF8E1',
                color: '#2E1A16'
            });
        }
    });
}

// Keyboard shortcuts for quick scoring
document.addEventListener('keydown', function(e) {
    // Only activate shortcuts when not typing in input fields
    if (e.target.tagName === 'INPUT') return;
    
    switch(e.key) {
        case '1':
            addPoints(1, 10);
            break;
        case '2':
            addPoints(2, 10);
            break;
        case 'q':
        case 'Q':
            addPoints(1, 5);
            break;
        case 'w':
        case 'W':
            addPoints(2, 5);
            break;
        case 'a':
        case 'A':
            addPoints(1, -5);
            break;
        case 's':
        case 'S':
            addPoints(2, -5);
            break;
        case 'r':
        case 'R':
            if (e.ctrlKey) {
                e.preventDefault();
                resetScores();
            }
            break;
    }
});

// Add some traditional Indonesian touches
function showWelcomeMessage() {
    Swal.fire({
        title: 'Selamat Datang!',
        text: 'Sistem Skor Pertandingan dengan Nuansa Tradisional Indonesia',
        icon: 'info',
        confirmButtonColor: '#FFB300',
        confirmButtonText: 'Mulai!',
        background: '#FFF8E1',
        color: '#2E1A16'
    });
}

// Show welcome message on first load (optional)
// Uncomment the line below if you want a welcome message
// setTimeout(showWelcomeMessage, 1000);

// Save score function
function saveScore() {
    const team1Name = team1Display.textContent;
    const team2Name = team2Display.textContent;
    const team1Institution = team1InstitutionDisplay.textContent;
    const team2Institution = team2InstitutionDisplay.textContent;
    
    if (team1Score === 0 && team2Score === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Skor Kosong!',
            text: 'Tidak ada skor untuk disimpan.',
            confirmButtonColor: '#FFB300',
            background: '#FFF8E1',
            color: '#2E1A16'
        });
        return;
    }
    
    Swal.fire({
        title: 'Simpan Skor?',
        html: `
            <div style="text-align: left; margin: 20px 0;">
                <p><strong>${team1Name}</strong>${team1Institution ? ' (' + team1Institution + ')' : ''}<strong>:</strong> ${team1Score}</p>
                <p><strong>${team2Name}</strong>${team2Institution ? ' (' + team2Institution + ')' : ''}<strong>:</strong> ${team2Score}</p>
            </div>
            <input type="text" id="match-note" class="swal2-input" placeholder="Catatan pertandingan (opsional)">
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#FFB300',
        cancelButtonColor: '#8D6E63',
        confirmButtonText: 'Ya, Simpan!',
        cancelButtonText: 'Batal',
        background: '#FFF8E1',
        color: '#2E1A16',
        preConfirm: () => {
            return document.getElementById('match-note').value;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const note = result.value || '';
            
            // Get existing history from localStorage
            let history = JSON.parse(localStorage.getItem('scoreHistory') || '[]');
            
            // Determine winner
            let winner = '';
            if (team1Score > team2Score) {
                winner = team1Name;
            } else if (team2Score > team1Score) {
                winner = team2Name;
            } else {
                winner = 'Seri';
            }
            
            // Create new score entry
            const scoreEntry = {
                id: Date.now(),
                date: new Date().toLocaleString('id-ID'),
                team1: {
                    name: team1Name,
                    score: team1Score,
                    institution: team1Institution
                },
                team2: {
                    name: team2Name,
                    score: team2Score,
                    institution: team2Institution
                },
                winner: winner,
                note: note
            };
            
            // Add to history
            history.unshift(scoreEntry);
            
            // Save to localStorage
            localStorage.setItem('scoreHistory', JSON.stringify(history));
            
            Swal.fire({
                icon: 'success',
                title: 'Skor Tersimpan!',
                text: 'Skor pertandingan telah disimpan ke riwayat.',
                confirmButtonColor: '#FFB300',
                timer: 2000,
                showConfirmButton: false,
                background: '#FFF8E1',
                color: '#2E1A16'
            });
        }
    });
}

// View history function
function viewHistory() {
    window.location.href = 'history.html';
}

