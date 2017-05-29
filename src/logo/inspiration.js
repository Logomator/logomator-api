const inspirations = require('../common/inspirations.json');

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
}

module.exports = Inspiration;
