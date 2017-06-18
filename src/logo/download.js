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
    const logo = draw.svg();
    return logo;
  }
}

module.exports = Download;
