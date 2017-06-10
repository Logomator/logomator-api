const colors = require('../config/colors.json');

class Color {
  constructor(palettes) {
    this.palettes = palettes;
  }
  getSelections() {
    return this.palettes.filter(color => color.isSelected);
  }

  getMatches() {
    const palettes = this.getSelections();
    const matches = [];
    palettes.forEach((palette) => {
      colors.forEach((color) => {
        if (color[palette.name]) {
          Object.keys(color).forEach((c) => {
            Object.keys(color[c]).forEach(k => {
              matches.push(color[c][k]);
            });
          });
        }
      });
    });
    return matches;
  }
}

module.exports = Color;
