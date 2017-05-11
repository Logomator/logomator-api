class Recipes {
  constructor(name, tagline) {
    this.companyName = name;
    this.tagline = tagline;
  }
  getRecipes() {
    return [
      // Recipe 1
      {
        companyNameAnchor: 'middle',
        companyBaseline: 'middle',
        companyNameX: '50%',
        companyNameY: '33%',
        companyNameFontSize: 30,
      },
      // Recipe 2
      {
        // Company name
        hasTagline: true,
        companyNameAnchor: 'middle',
        companyBaseline: 'middle',
        companyNameX: '50%',
        companyNameY: '25%',
        companyNameFontSize: 30,
        // Tagline
        taglineAnchor: 'middle',
        taglineBaseline: 'middle',
        taglineX: '50%',
        taglineY: '45%',
        taglineFontSize: 16,
      },
      // Recipe 3
      {
        hasIcon: true,
        companyNameAnchor: 'middle',
        companyBaseline: 'middle',
        companyNameX: '50%',
        companyNameY: '33%',
        companyNameFontSize: 30,
        iconX: '50%',
        iconY: '25%',
      },
    ];
  }
}

module.exports = new Recipes();
