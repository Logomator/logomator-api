const window = require('svgdom');
const SVG = require('svg.js')(window);

const document = window.document;

// Logo configuration
const LOGO_WIDTH = 300;
const LOGO_HEIGHT = 230;
const LOGO_BACKGROUND = './images/logo-background-shadow.png';

class Logo {
  constructor(companyName, tagline, fontFamily, companyNameColor, taglineColor, recipe, icons) {
    this.companyName = companyName || 'Dopest';
    this.tagline = tagline || null;
    this.fontFamily = fontFamily || 'Proxima Nova';
    this.companyNameColor = companyNameColor || '#FF6600';
    this.taglineColor = taglineColor || '#FF6600';
    this.recipe = recipe;
    this.icons = icons;
  }

  generate() {
    const draw = SVG(document.documentElement).size(300, 230);
    draw.rect(LOGO_WIDTH, LOGO_HEIGHT).fill('#fff');
    draw.image(LOGO_BACKGROUND, 300, 230);

    if (this.recipe.hasIcon) {
      const image = draw.image(this.icons[0].preview_url_84, 60, 60);
      image.attr('x', this.recipe.iconX);
      image.attr('y', this.recipe.iconY);
    }

    const text = draw.text(this.companyName);
    text.font({
      fill: this.companyNameColor,
      family: this.fontFamily,
      size: '30',
    });

    text.attr('x', this.recipe.companyNameX);
    text.attr('y', this.recipe.companyNameY);
    text.attr('alignment-baseline', this.recipe.companyBaseline);
    text.attr('text-anchor', this.recipe.companyNameAnchor);

    if (this.recipe.hasTagline) {
      const text2 = draw.text(this.tagline);
      text2.font({
        fill: this.taglineColor,
        family: this.fontFamily,
        size: this.recipe.taglineFontSize,
      });
      text2.attr('x', this.recipe.taglineX);
      text2.attr('y', this.recipe.taglineY);
      text2.attr('alignment-baseline', this.recipe.taglineBaseline);
      text2.attr('text-anchor', 'middle');
    }
    return draw.svg();
  }
}

module.exports = Logo;
