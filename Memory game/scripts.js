const cards = document.querySelectorAll('.memory-card');
let flips = 0; // Initialize the flip count
let movesElement = document.getElementById('moves'); // Find the element for displaying the flip count
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0; // Initialize the score count
const scoreElement = document.getElementById('score'); // Find the element for displaying the score
let results = []; // Array to store player results

// Function to initialize a level
function initializeLevel(levelId, winMessageId, gameOverMessageId) {
  // ... (your existing level initialization code) ...
}

// Function to submit player result
function submitResult() {
  const playerName = document.getElementById('player-name').value;
  const playerResult = { name: playerName, flips: flips, time: timerElement.textContent, score: score };

  // Store the result (you might want to use localStorage or send it to a server)
  storeResult(playerResult);

  // Display the results
  displayResults();
}

// Function to store player result
function storeResult(result) {
  // Store the result as needed (e.g., use localStorage or send it to a server)
  results.push(result);
}

// Function to display results
function displayResults() {
  // Fetch and display results (you might want to retrieve them from localStorage or a server)
  const resultsList = document.getElementById('results-list');
  resultsList.innerHTML = ''; // Clear existing results

  // Display each result as a list item
  // Note: You might want to format this better based on your needs
  results.forEach(result => {
    const listItem = document.createElement('li');
    listItem.textContent = `${result.name} - Score: ${result.score}, Flips: ${result.flips}, Time: ${result.time}`;
    resultsList.appendChild(listItem);
  });

  // Show the results section
  document.getElementById('results').style.display = 'block';
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    secondCard = this;
    checkForMatch();
    flips += 1; // Increase the flip count
    movesElement.textContent = `${flips}`; // Update the display of the flip count
  }
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  // Increase the score count and update the display
  score += 1;
  scoreElement.textContent = `${score}`;

  resetBoard();

  // Check for a win: if all pairs are collected, show a win message
  if (score === cards.length / 2) {
    document.getElementById('win-message').style.display = 'block';
    document.getElementById('player-form').style.display = 'block';
  }
  // Check for a loose: if all pairs are collected, and to match flips show a loose message
  else if (score <= 6 && flips >= 18) {
    document.getElementById('game-over-message').style.display = 'block';
  }
  
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

// Logic for toggling music on/off
const backgroundMusic = document.getElementById('background-music');
const musicCheckbox = document.querySelector('input[name="myCheckboxMusik"]');

// Function to play the background music
function playBackgroundMusic() {
  backgroundMusic.play();
  console.log('Music On');
}

// Function to pause the background music
function pauseBackgroundMusic() {
  backgroundMusic.pause();
  console.log('Music Off');
}

musicCheckbox.addEventListener('change', function () {
  if (musicCheckbox.checked) {
    playBackgroundMusic();
  } else {
    pauseBackgroundMusic();
  }
});

// Logic for resetting the game
const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', function () {
  // Reset the game timer
  timerElement.textContent = '0 seconds';
  startTime = new Date();

  // Hide the win message and game over message
  document.getElementById('win-message').style.display = 'none';
  document.getElementById('game-over-message').style.display = 'none';

  // Reset the flip count
  flips = 0;
  movesElement.textContent = `${flips}`;
  // Reset the score count and update the display
  score = 0;
  scoreElement.textContent = `${score}`;
  // Reset other game variables and make all cards unflipped
  cards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });
  // Shuffle the cards again
  shuffle();
});

// Set the initial game time
let startTime = new Date();
function updateTime() {
  const currentTime = new Date();
  const elapsedTime = Math.floor((currentTime - startTime) / 1000); // Convert the difference to seconds
  timerElement.textContent = `${elapsedTime} seconds`;
}

const timerElement = document.getElementById('timer'); // Find the element for displaying the time
const timerInterval = setInterval(updateTime, 1000); // Update the time every second

// Функция для выбора уровня
function selectLevel(levelId) {
  // Скрыть все сообщения о выигрыше/проигрыше
  hideAllMessages();

  // Сбросить предыдущий уровень (если есть)
  resetCurrentLevel();

  // Инициализировать выбранный уровень
  initializeLevel(levelId, `win-message-${levelId}`, `game-over-message-${levelId}`);
}

// Функция для сокрытия всех сообщений о выигрыше/проигрыше
function hideAllMessages() {
  const allWinMessages = document.querySelectorAll('.win-message');
  const allGameOverMessages = document.querySelectorAll('.game-over-message');

  allWinMessages.forEach(message => (message.style.display = 'none'));
  allGameOverMessages.forEach(message => (message.style.display = 'none'));
}

// Функция для сброса текущего уровня
function resetCurrentLevel() {
  timerElement.textContent = '0 seconds';
  startTime = new Date();

  // Hide the win message and game over message
  document.getElementById('win-message').style.display = 'none';
  document.getElementById('game-over-message').style.display = 'none';
  // Reset the flip count
  flips = 0;
  movesElement.textContent = `${flips}`;
  // Reset the score count and update the display
  score = 0;
  scoreElement.textContent = `${score}`;
  // Reset other game variables and make all cards unflipped
  cards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });
  // Shuffle the cards again
  shuffle();
}

function selectLevel(level) {
  // Hide all level containers
  document.getElementById('level-one-container').style.display = 'none';
  document.getElementById('level-two-container').style.display = 'none';

  // Show the selected level container
  document.getElementById(level + '-container').style.display = 'block';

  // Show the player form and results section
  document.getElementById('player-form').style.display = 'block';
  document.getElementById('results').style.display = 'block';
  
}

function submitResult() {
  // Your logic for handling the result submission
}

// Add an event listener for the "Level 1" button
document.getElementById('level-one-button').addEventListener('click', function() {
  selectLevel('level-one');
});

// Add an event listener for the "Level 2" button
document.getElementById('level-two-button').addEventListener('click', function() {
  selectLevel('level-two');
});

// Function to handle level selection
function selectLevel(level) {
  // Hide all level containers
  document.getElementById('level-one-container').style.display = 'none';
  document.getElementById('level-two-container').style.display = 'none';

  // Show the selected level container
  document.getElementById(level + '-container').style.display = 'block';

  // Show the player form and results section
  document.getElementById('player-form').style.display = 'block';
  document.getElementById('results').style.display = 'block';
}

// Function to handle result submission
function submitResult() {
  // Get the player name from the input field
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
}

// Function to handle the result (replace this with your actual logic)
function handleResult(result) {
  // For now, let's log the result to the console
  console.log('Result submitted:', result);

  // You can add more logic here, like saving the result to a database, displaying it on the page, etc.
}

function startGame() {
 const playerName = document.getElementById('player-name').value;
  const selectedLevel = document.getElementById('level').value;
  window.location.href = `Main1.html?player=${playerName}&level=${selectedLevel}`;
  return false; // to prevent the form from submitting conventionally
}



