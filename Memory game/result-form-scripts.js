function submitResult() {
    // Your logic for handling the result submission
    var playerName = document.getElementById('player-name').value;
  
    // Get the score, moves, and time from your game (replace these with your actual variables)
    var score = document.getElementById('score').innerText;
    var moves = document.getElementById('moves').innerText;
    var time = document.getElementById('timer').innerText;
  
    // Create a result object with the obtained data
    var result = {
      playerName: playerName,
      score: score,
      moves: moves,
      time: time
    };
  
    // Call a function to handle the result (you need to implement this function)
    handleResult(result);
  
    // Wait for 3 seconds before redirecting to the game page
    setTimeout(function () {
      window.location.href = 'Main1.html'; // Change 'Main1.html' to the actual filename of your game page
    }, 3000);
  }
  