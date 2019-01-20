var userGuess = process.argv[2];

function Letter(character) {
    this.character = character;
    this.guessed = false;
    this.Correct = function() {
        if (this.guessed === true) {
            console.log("You're correct, the letter was: " + this.character);
        } else {
            console.log("Guess what letter I'm thinking of: " + "_");
        }
    }
    this.Guess = function() {
        if (userGuess === this.character) {
            this.guessed = true;
            this.Correct();
        }
    }
};

var a = new Letter("a");

a.Guess();