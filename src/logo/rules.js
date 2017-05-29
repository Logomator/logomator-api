class Rules {
  constructor(chars) {
    this.chars = chars;
  }

  parseRules() {
    console.log("Parsing rules", this.chars);
  }
}

module.exports = Rules;