const window = require('svgdom');
const SVG = require('svg.js')(window);

const document = window.document;

// Logo configuration
const LOGO_WIDTH = 300;
const LOGO_HEIGHT = 230;
const LOGO_BACKGROUND = './images/logo-background-shadow.png';

class Logo {
  constructor(companyName, tagline, rules, companyNameColor, taglineColor, recipe, icons) {
    this.companyName = companyName || 'Dopest';
    this.tagline = tagline || '';
    this.fontFamily = 'Proxima Nova';
    this.companyNameColor = companyNameColor || '#FF6600';
    this.taglineColor = taglineColor || '#FF6600';
    this.recipe = recipe;
    this.icons = icons;
    this.rules = rules;
  }

  generate() {
    const draw = SVG(document.documentElement).size(300, 230);
    draw.rect(LOGO_WIDTH, LOGO_HEIGHT).fill('#fff');
    draw.image(LOGO_BACKGROUND);

    const name = draw.text('.').tspan(this.companyName);
    name.font({
      fill: this.companyNameColor,
      family: this.rules.name.fontFamily,
      weight: this.rules.name.fontWeight,
      size: this.rules.name.fontSize,
    });

    name.attr('x', this.recipe.companyNameX);
    name.attr('y', this.recipe.companyNameY);
    name.attr('alignment-baseline', this.recipe.companyBaseline);
    name.attr('text-anchor', this.recipe.companyNameAnchor);

    /**
     * Check if recipe has tagline.
     */
    if (this.recipe.hasTagline) {
      const tagline = draw.text('.').tspan(this.tagline);
      tagline.font({
        fill: this.taglineColor,
        family: this.rules.tagline.fontFamily,
        weight: this.rules.tagline.fontWeight,
        size: this.rules.tagline.fontSize,
      });

      tagline.attr('x', this.recipe.taglineX);
      tagline.attr('y', this.recipe.taglineY);
      tagline.attr('alignment-baseline', this.recipe.taglineBaseline);
      tagline.attr('text-anchor', 'middle');
    }

    /**
     * Check if recipe has accent
     */
    if (this.recipe.hasAccent) {
      const line = draw.line(250, 100, 100, 100);
      line.x('50%');
      line.y('50%');
      line.stroke({color: '#818691', width: 1, linecap: 'round'});
    }

    return draw.svg();
  }
}

module.exports = Logo;