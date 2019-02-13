// Import Word constructor
const Word = require("./word.js");
const inquirer = require("inquirer");

// Declaration of global variables.
let alreadyGuessed = false;				
let currentWord;								
let lives = 10;						
const guessedLetters = [];	
let guessedRight = false;					
let userGuess;								
let won = false;							
const wordChoices = ["cappuccino", "caffe americano", "caffe mocha", "caffee machiato", "latte", "flat white", "affogato", "espresso", "cafe au late", "irish coffee", "cortado", "long black"];	 
let fullWord = true; 					

startGame();

// Functionality for the game
function startGame() {
	console.log("\x1b[36m", "Your hangman category is COFFEE!!!");

	// Selects a random word for hangman
	let word = wordChoices[Math.floor(Math.random() * wordChoices.length)];

	// Pushes the word into the Word constructor
	currentWord = new Word(word);
	currentWord.makeWord();

	// A new array for the word to be displayed as underscores and spaces
	let blankWord = [];
	for (let i = 0; i < currentWord.letterArray.length; i++) {
		if (currentWord.letterArray[i] == " ") {
			blankWord.push(" ");
		} else {
			blankWord.push("_");
		}
	}
	console.log("\x1b[37m", blankWord.join(" ") + "\n");

    // Starts the inquirer prompts
	inquire();
}

function inquire() {
	inquirer.prompt([
	{
		message: "Which letter do you guess?",
		name: "userGuess"
	}
	]).then(function(answer) {
		userGuess = answer.userGuess.toLowerCase();
		console.log("\x1b[37m", "\nYour guess: " + userGuess);

		// Runs through array of guessed Letters to see if it's already there.
		for (let i = 0; i < guessedLetters.length; i++) {
			if (userGuess == guessedLetters[i]) {
				console.log("\x1b[33m", "Try again! You already guessed this!");
				alreadyGuessed = true;
				break;
			} 
		}

		// True if user has correctly guessed a new letter
		guessedRight = currentWord.showGuess(userGuess);

		// Pushes userGuess to the guessedLetters array & updates lives if guess was incorrect
		if (alreadyGuessed == true) {
			alreadyGuessed = false;
		} else if (guessedRight == false) {
			lives--;
			guessedLetters.push(userGuess);
		} else {
			guessedLetters.push(userGuess);
			guessedRight = false;
		}

		// Displays user's guesses
		guessedLetters = guessedLetters.sort();
		console.log("\x1b[35m", "Guesses: " + guessedLetters.join(" | "));
		console.log("\x1b[33m", "Guesses left: " + lives + " \n");

		// For loop to see if all of the letters have been guessed for the fullWord to be true.
		for (let i = 0; i < currentWord.letterArray.length; i++) {
			if (currentWord.currentGuess[i] != currentWord.letterArray[i]) {
				fullWord = false;
			}
		}

		// If full word is guessed, the value of 'won' changes to true
		if (fullWord == true) {
			won = true;
			fullWord = false;
		} else {
			fullWord = true;
		}

		// Runs at the end of the game if/else user has won, still has guesses remaining, or lost
		if (won == true) {
			won = false;
			console.log("\x1b[32m", "WINNER! WINNER! You got it!");
			resetGame();
		} else if (lives > 0) {
			inquire();
		} else {
			console.log("\x1b[31m", "You lose! No more lives remaining.")
			resetGame();
		}
	});
}

function resetGame() {
	alreadyGuessed = false;
	currentWord;
	lives = 10;
	guessedLetters = [];
	guessedRight = false;
	userGuess;
	won = false;
	fullWord = true; 

	inquirer.prompt([
	{
		message: "Would you like to keep playing?",
		type: "confirm",
		default: true,
		name: "continue"
	}
	]).then(function(answer) {
		if(answer.continue == true) {
			startGame();
		} else {
			console.log("Come back soon for another challenge!");
		}
	});
}