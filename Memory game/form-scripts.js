function startGame() {
    // Get the player name and selected level from the form
    const playerName = document.getElementById('player-name').value;
    const selectedLevel = document.getElementById('level').value;
  
    // Save player name and selected level in localStorage (or use another storage method)
    localStorage.setItem('playerName', playerName);
    localStorage.setItem('selectedLevel', selectedLevel);
  
    // Redirect to the main game page
    window.location.href = 'Main1.html';
  }
  