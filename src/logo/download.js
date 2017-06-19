const window = require('svgdom');
const SVG = require('svg.js')(window);
const document = window.document;

class Download {
  constructor(logo) {
    this.logo = logo;
  }
  getFullColorWhiteBackground() {
    return this.logo;
  }

  getHighRes() {
    const draw = SVG(document.documentElement);
    draw.svg(this.logo).size(1600, 800);
    return draw.svg();
  }

  getHighResWithBlackBG() {
    const draw = SVG(document.documentElement);
    draw.svg(this.logo).size(1600, 800);
    return draw.svg();
  }
}

module.exports = Download;
