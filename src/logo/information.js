class Information {
  constructor(name, tagline) {
    console.log(name);
    this.name = name;
    this.tagline = tagline;
  }
  getInformation() {
    return {
      name: this.name,
      tagline: this.tagline,
    };
  }
}

module.exports = Information;
