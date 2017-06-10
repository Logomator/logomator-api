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
      if (color[paletteSelectionName]) {
        Object.keys(color).forEach((c) => {
          Object.keys(color[c]).forEach(k => {
            matches.push(color[c][k]);
          });
        });
      }

      // Check if two palettes were selected to grab the respective selections as well
      // TODO refactor
      if (this.isTwoPalettesSelected(palettes)) {

        if (color[name[0]]) {
          Object.keys(color).forEach((c) => {
            Object.keys(color[c]).forEach(k => {
              matches.push(color[c][k]);
            });
          });
        }

        if (color[name[1]]) {
          Object.keys(color).forEach((c) => {
            Object.keys(color[c]).forEach(k => {
              matches.push(color[c][k]);
            });
          });
        }
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

  applyRules() {
    const palettes = this.getMatches();
    const selections = [];
    const taglineDefaultGrey = '#818691';
    const taglineDefaultBlack = '#1A191C';

    palettes.forEach((p) => {
      // Variation 1
      selections.push([
        p[0], p[1],
      ]);

      // Variation 2
      selections.push([
        p[1], p[0],
      ]);

      // Variation 3
      selections.push([
        p[0], taglineDefaultGrey,
      ]);

      // Check if two palettes selected - rules deviate at variation 4
      if (this.isTwoPalettesSelected(palettes)) {
        selections.push([
          p[1], taglineDefaultGrey,
        ]);

        selections.push([
          p[0], taglineDefaultBlack,
        ]);

        selections.push([
          p[1], taglineDefaultBlack,
        ]);
      } else {
        // Variation 4
        selections.push([
          p[1], taglineDefaultBlack,
        ]);
      }
    });
    return selections;
  }

  isTwoPalettesSelected(palettes) {
    return palettes.length === 2;
  }
}

module.exports = Color;
