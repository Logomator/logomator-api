class Recipes {
  getRecipes() {
    return [
      // Recipe 1
      {
        hasTagline: false,
        companyNameAnchor: 'middle',
        companyNameLeading: 4,
        companyNameDy: '50%',
        companyNameDx: '50%'
      },

      {
        hasTagline: true,
        companyNameAnchor: 'middle',
        companyNameLeading: 4,
        companyNameDy: '50%',
        companyNameDx: '50%',
        taglineDy: '60%',
        taglineDx: '60%'
      }
    ]
  }
}

module.exports = new Recipes();