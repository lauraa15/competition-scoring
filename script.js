// Simplified Competition Scorer - Indonesian Cultural Theme
// Only team naming and scoring functionality

// Global variables
let team1Score = 0;
let team2Score = 0;

// DOM elements
const team1NameInput = document.getElementById('team1-name');
const team2NameInput = document.getElementById('team2-name');
const team1Display = document.getElementById('team1-display');
const team2Display = document.getElementById('team2-display');
const team1ScoreDisplay = document.getElementById('team1-score');
const team2ScoreDisplay = document.getElementById('team2-score');
const winnerText = document.getElementById('winner-text');
const resetScoresBtn = document.getElementById('reset-scores');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Event listeners
    resetScoresBtn.addEventListener('click', resetScores);
    
    // Initialize team names
    updateTeamName(1);
    updateTeamName(2);
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

