class Recipes {
  static getRecipes() {
    return [
      // Recipe 1
      {
        hasTagline: false,
        companyNameAnchor: 'middle',
        companyBaseline: 'middle',
        companyNameX: '50%',
        companyNameY: '50%',
      },
      // Recipe 2
      {
        hasTagline: true,
        taglinePlacement: 'middle',
        // Company name
        companyNameAnchor: 'middle',
        companyBaseline: 'middle',
        companyNameX: '50%',
        companyNameY: '44%',
        // Tagline
        taglineAnchor: 'middle',
        taglineBaseline: 'middle',
        taglineX: '50%',
        taglineY: '56%',
      },
      // Recipe 3
      {
        hasTagline: true,
        taglinePlacement: 'left',
        // Company name
        companyNameAnchor: 'middle',
        companyBaseline: 'middle',
        companyNameX: '50%',
        companyNameY: '44%',
        // Tagline
        taglineAnchor: 'start',
        taglineBaseline: 'middle',
        taglineX: '25%',
        taglineY: '56%',
      },
      // Recipe 4
      {
        hasTagline: true,
        taglinePlacement: 'right',
        // Company name
        companyNameAnchor: 'middle',
        companyBaseline: 'middle',
        companyNameX: '50%',
        companyNameY: '44%',
        // Tagline
        taglineAnchor: 'middle',
        taglineBaseline: 'middle',
        taglineX: '50%',
        taglineY: '56%',
      },
      {
        // Recipe 5
        hasTagline: true,
        taglinePlacement: 'middle',
        // Company name
        companyNameAnchor: 'middle',
        companyBaseline: 'middle',
        companyNameX: '50%',
        companyNameY: '44%',
        // Tagline
        taglineAnchor: 'middle',
        taglineBaseline: 'middle',
        taglineX: '50%',
        taglineY: '56%',
      },
    ];
  }
}

module.exports = Recipes;
