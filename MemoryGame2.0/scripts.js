const cards = document.querySelectorAll('.memory-card');
let flips = 0; // Initialize the flip count
let movesElement = document.getElementById('moves'); // Find the element for displaying the flip count
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0; // Initialize the score count
const scoreElement = document.getElementById('score'); // Find the element for displaying the score

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

    // Check for game over: if the number of flips exceeds the allowed number, show game over message
    if (flips >= 15 && score < 6) {
      document.getElementById('game-over-message').style.display = 'block';
      return; // Exit the function early since the game is over
    }
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
  if (score === 6 && flips < 15) {
    document.getElementById('win-message').style.display = 'block';
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
