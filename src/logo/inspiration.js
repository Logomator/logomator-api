const inspirations = require('../common/config/inspirations.json');
const fonts = require('./fonts');

class Inspiration {
  constructor(selections) {
    this.selections = selections;
  }

  getSelected() {
    // noinspection JSUnresolvedVariable
    return this.selections.filter(inspiration => inspiration.isSelected);
  }

  getInspirations() {
    const selected = this.getSelected();
    const returnInspirations = [];

    selected.forEach((i) => {
      if (inspirations[i.id]) {
        returnInspirations.push(inspirations[i.id]);
      }
    });
    return returnInspirations;
  }

  generateInspirationsWithFontFamily() {
    const selected = this.getSelected();
    const returnInspirations = [];

    selected.forEach((i) => {
      if (inspirations[i.id]) {
        returnInspirations.push(inspirations[i.id]);
      }
    });

    returnInspirations.forEach((i) => {
      i[0].name.fontFamily = fonts.getFonts()[
        Math.floor(Math.random() * (fonts.getFonts().length))
        ];
      
      if (i[0].name.fontFamily === 'Boogalo') {
        i[0].tagline.fontFamily = 'Boogalo';
      } else {
        i[0].tagline.fontFamily = fonts.getTaglineFonts()[
          Math.floor(Math.random() * (fonts.getTaglineFonts().length))
          ]
      }
    });
    return returnInspirations;
  }

  generateInspirationsWithCasing(returnInspirations) {
    returnInspirations.forEach((i) => {
      i[0].name.casing = fonts.getFontCasing()[
        Math.floor(Math.random() * (fonts.getFontCasing().length))
        ];

      i[0].tagline.casing = fonts.getFontCasing()[
        Math.floor(Math.random() * (fonts.getFontCasing().length))
        ];
    });
    return returnInspirations;
  }

  generateMoreConcepts() {
    const returnInspirations = this.generateInspirationsWithFontFamily();
    return this.generateInspirationsWithCasing(returnInspirations);
  }
}

module.exports = Inspiration;
