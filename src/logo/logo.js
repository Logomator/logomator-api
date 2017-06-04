const window = require('svgdom');
const SVG = require('svg.js')(window);

const document = window.document;

// Logo configuration
const LOGO_WIDTH = 300;
const LOGO_HEIGHT = 230;
const LOGO_BACKGROUND = './images/logo-background-shadow.png';

class Logo {
  constructor(companyName, tagline, rules, companyNameColor, taglineColor, recipe, fontFamily, icons) {

    this.companyName = companyName || 'Dopest';
    this.tagline = tagline || '';
    this.companyNameColor = companyNameColor;
    this.taglineColor = taglineColor;
    this.recipe = recipe;
    this.fontFamily = fontFamily;
    this.icons = icons;
    this.rules = rules;
  }

  generate() {
    const draw = SVG(document.documentElement).size(300, 230);
    draw.rect(LOGO_WIDTH, LOGO_HEIGHT).fill('#fff');
    draw.image(LOGO_BACKGROUND);

    /**
     * Check company name casing
     */
    switch (this.rules.name.casing) {
      case 'lowercase':
        this.companyName = this.companyName.toLowerCase();
        break;
      case 'uppercase':
        this.companyName = this.companyName.toUpperCase();
        break;
      case 'pascalCase':
        this.companyName = this.companyName.replace(/\w+/g, w => w[0].toUpperCase() +
        w.slice(1).toLowerCase());
        break;
      default:
        break;
    }

    const name = draw.text('.').tspan(this.companyName);

    /**
     * Company name font rules.
     */
    name.font({
      fill: this.companyNameColor,
      family: this.fontFamily,
      'letter-spacing': this.rules.name.letterSpacing,
      size: this.rules.name.fontSize,
    });

    /**
     * Company name positioning rules.
     */
    name.attr('x', this.recipe.companyNameX);
    name.attr('y', this.recipe.companyNameY);
    name.attr('alignment-baseline', this.recipe.companyBaseline);
    name.attr('text-anchor', this.recipe.companyNameAnchor);

    /**
     * Check if recipe has tagline.
     */
    if (this.recipe.hasTagline) {
      /**
       * Tagline casing rules.
       */
      switch (this.rules.tagline.casing) {
        case 'lowercase':
          this.tagline = this.tagline.toLowerCase();
          break;
        case 'uppercase':
          this.tagline = this.tagline.toUpperCase();
          break;
        case 'pascalCase':
          this.tagline = this.tagline.replace(/\w+/g, w => w[0].toUpperCase() +
          w.slice(1).toLowerCase());
          break;
        default:
          break;
      }
      const tagline = draw.text('.').tspan(this.tagline);

      /**
       * Tagline font rules.
       */
      tagline.font({
        fill: this.taglineColor,
        family: this.rules.tagline.fontFamily,
        weight: this.rules.tagline.fontWeight,
        'letter-spacing': this.rules.tagline.letterSpacing,
        size: this.rules.tagline.fontSize,
      });

      /**
       * Tagline positioning rules.
       */
      tagline.attr('x', this.recipe.taglineX);
      tagline.attr('y', this.recipe.taglineY);
      tagline.attr('alignment-baseline', this.recipe.taglineBaseline);
      tagline.attr('text-anchor', 'middle');
    }

    /**
     * Check if recipe has accent
     */
    if (this.recipe.hasAccent) {
      const lineWidth = ((21 * this.companyName.length) / 1.8) + 100;
      const line = draw.line(lineWidth, 100, 100, 100);

      const lineX = lineWidth - 102;

      line.x(lineX);
      line.y('50%');
      line.stroke({ color: '#818691', width: 1, linecap: 'round' });
    }

    return draw.svg();
  }
}

module.exports = Logo;