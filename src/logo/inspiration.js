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
      inspirations.forEach((inspiration) => {
        if (inspiration.id === i.id) {
          returnInspirations.push(inspiration);
        }
      });
    });
    return returnInspirations;
  }

  generateInspirationsWithFontFamily() {
    const returnInspirations = this.getInspirations();

    returnInspirations.forEach((i) => {
      i.name.fontFamily = fonts.getFonts()[
        Math.floor(Math.random() * (fonts.getFonts().length))
        ];

      // Check if tagline exists TODO refactor this.
      if (i.tagline) {
        if (i.name.fontFamily === 'Boogalo') {
          i.tagline.fontFamily = 'Boogalo';
        } else {
          i.tagline.fontFamily = fonts.getTaglineFonts()[
            Math.floor(Math.random() * (fonts.getTaglineFonts().length))
            ];
        }
      }
    });
    return returnInspirations;
  }

  generateInspirationsWithCasing(returnInspirations) {
    returnInspirations.forEach((i) => {
      i.name.casing = fonts.getFontCasing()[
        Math.floor(Math.random() * (fonts.getFontCasing().length))
        ];

      if (i.tagline) {
        i.tagline.casing = fonts.getFontCasing()[
          Math.floor(Math.random() * (fonts.getFontCasing().length))
          ];
      }
    });
    return returnInspirations;
  }

  generateMoreConcepts() {
    const returnInspirations = this.generateInspirationsWithFontFamily();
    return this.generateInspirationsWithCasing(returnInspirations);
  }
}

module.exports = Inspiration;
