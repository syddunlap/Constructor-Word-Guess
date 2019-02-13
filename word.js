// Import Letter constructor
const Letter = require("./letter.js");

// Constructor to hold the word and splits the word into a letter Array
function Word(word) {
	this.word = word;
    this.letterArray = word.split("");
    // Array to hold the objects created in the makeWord() function
    this.letterObjectArray = [];
    // Array to hold user's guesses
	this.currentGuess = [];
	this.flag = false;
	this.makeWord = function() {
		// For loop through Letter constructor for each letter of the word
		for (let i = 0; i < this.letterArray.length; i++) {
			this.letterObjectArray[i] = new Letter(this.letterArray[i]);
		}
	};
	this.showGuess = function(userGuess) {
		let correctGuess = false;

		// For loop to check if the user's guess is correct for any of the letters in the array.
		for (let i = 0; i < this.letterArray.length; i++) {
            correctGuess = this.letterObjectArray[i].checkGuess(userGuess);
            // Prints updated word
			this.currentGuess[i] = this.letterObjectArray[i].returnLetter();

			if (correctGuess == true) {
                // Whether this is true or false will go through the if/then statement below to display corresponding message to the user.
				this.flag = true;
			}
		}

		if (this.flag == true) {
			console.log("\x1b[32m", "Great guess!");
			console.log("\x1b[37m", this.currentGuess.join(" ") + "\n");
			this.flag = false;
			return true;
		} else {
			console.log("\x1b[31m", "Wrong, but so close!");
			console.log("\x1b[37m", this.currentGuess.join(" ") + "\n");
			return false;
		}
	};
	
}

module.exports = Word;