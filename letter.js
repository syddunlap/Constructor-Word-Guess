// Constructor holding the correct letter and displaying it as the letter or an underscore after comparing it to the user's guess
function Letter(actualLetter) {
	this.actualLetter = actualLetter;
	this.guess = false;
	this.returnLetter = function() {
		if (this.guess == true) {
			return actualLetter;
		} else {
			return "_";
		}
	}
	this.checkGuess = function(userGuess) {
        // Checks to see if the user's guess was correct and updates the corresponding letter if it is correct.
		if (this.guess == true) {
			this.guess = true;
			return false;
		} else if (actualLetter == " ") {
			this.guess = true;
			return false;
		} else if (userGuess == actualLetter) {
			this.guess = true;
			return true;
		} else {
			this.guess = false;
			return false;
		}
	};
}

module.exports = Letter;