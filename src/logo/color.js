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
    let name;
    let paletteSelectionName;
    const matches = [];

    colors.forEach((color) => {
      if (this.isTwoPalettesSelected(palettes)) {
        name = this.getCombinedSelection(palettes);
        paletteSelectionName = name[0] + name[1];

        if (!color[paletteSelectionName]) {
          paletteSelectionName = name[1] + name[0];
        }
      } else {
        paletteSelectionName = palettes[0].name;
      }

      console.log('Name 0', name[0])
      console.log('Name 1', name[1]);

      if (color[paletteSelectionName]) {
        Object.keys(color).forEach((c) => {
          Object.keys(color[c]).forEach(k => {
            matches.push(color[c][k]);
          });
        });
      }
    });
    return matches;
  }

  getCombinedSelection(selections) {
    const names = [];
    selections.forEach((selection) => {
      names.push(selection.name);
    });
    return names;
  }

  isTwoPalettesSelected(palettes) {
    return palettes.length === 2;
  }
}

module.exports = Color;
