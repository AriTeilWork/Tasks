// Rock, Paper, Scissors Game
function playGame() {
    const userChoice = document.getElementById('choice').value;
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    let result;

    if (userChoice === computerChoice) {
        result = 'It\'s a tie!';
        document.getElementById('gameResult').className = 'tie';
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = 'You win!';
        document.getElementById('gameResult').className = 'win';
    } else {
        result = 'Computer wins!';
        document.getElementById('gameResult').className = 'lose';
    }

    // Update the result text with the appropriate class for color
    const gameResultElement = document.getElementById('gameResult');
    gameResultElement.textContent = `You chose ${userChoice}, computer chose ${computerChoice}. ${result}`;
    
    // Add animation to the computer's choice
    const computerChoiceElement = document.getElementById('computerChoice');
    computerChoiceElement.style.animation = 'spin 1s linear infinite';
    setTimeout(() => {
        computerChoiceElement.style.animation = '';
    }, 1000);
}
// Lucky Number Calculator
function calculateLuckyNumber() {
    const birthdate = document.getElementById('birthdate').value;
    
    // Perform calculations based on the birthdate and display the result.
    // You can use various numerology methods to calculate the lucky number.
    // Here, we'll just take the sum of all digits until we get a single-digit number.
    let luckyNumber = 0;
    for (const digit of birthdate) {
        if (!isNaN(digit)) {
            luckyNumber += parseInt(digit);
        }
    }
    while (luckyNumber > 9) {
        let sum = 0;
        while (luckyNumber > 0) {
            sum += luckyNumber % 10;
            luckyNumber = Math.floor(luckyNumber / 10);
        }
        luckyNumber = sum;
    }
    
    document.getElementById('luckyNumber').textContent = luckyNumber;
}
