function Letter(character) {
    this.character = character;
    this.guessed = false;
    this.placeholder = function() {
        if (this.guessed === true) {
            return this.character;
        } else {
            return "_";
        }
    }
    this.Guess = function(guess) {
        if (userGuess.toLowerCase() === this.character.toLowerCase()) {
            this.guessed = true;
            this.placeholder();
        } else {
            this.placeholder();
        }
    }
};