const window = require('svgdom');
const SVG = require('svg.js')(window);

const document = window.document;

window.setFontDir(`${__dirname}/../../fonts`)
  .setFontFamilyMappings({
    'Montserrat': 'Montserrat-Regular.otf',
    'Boogalo': 'Boogaloo-Regular.otf',
    'Montserrat Semibold': 'Montserrat-SemiBold.otf',
    'Montserrat Bold': 'Montserrat-Bold.otf',
    'Abril Fat Face': 'AbrilFatface-Regular.otf',
    'Alex Brush': 'AlexBrush-Regular.ttf',
    'Bebas Neue': 'BebasNeue.otf',
    'Caviar Dreams': 'CaviarDreams.ttf',
    'Caviar Dreams Bold': 'Caviar_Dreams_Bold.ttf',
    'Chunk Five': 'Chunkfive.otf',
    'Cinzel': 'Cinzel-Regular.otf',
    'Cinzel Bold': 'Cinzel-Bold.otf',
    'Dancing Script': 'DancingScript-Regular.otf',
    'Great Vibes': 'GreatVibes-Regular.otf',
    'Happy Monkey': 'HappyMonkey-Regular.ttf',
    'Lato': 'Lato-Regular.ttf',
    'Lato Semi Bold': 'Lato-Semibold.ttf',
    'Lato Bold': 'Lato-Bold.ttf',
    'Lato Medium': 'Lato-Medium.ttf',
    'Oswald': 'Oswald-Regular.ttf',
    'Pacifico': 'Pacifico.ttf',

  }).preloadFonts();

class Logo {
  constructor(companyName, tagline, rules, companyNameColor, taglineColor, recipe, icons) {
    this.companyName = companyName || 'Dopest';
    this.tagline = tagline || '';
    this.companyNameColor = companyNameColor;
    this.taglineColor = taglineColor;
    this.recipe = recipe;
    this.icons = icons;
    this.rules = rules;
  }

  generate() {
    let tagline = null;
    let taglineProps = null;
    const draw = new SVG(document.documentElement).size(300, 230).attr('id', 'logo');
    draw.rect(300, 230).fill('#fff');
    const set = draw.set();

    draw.viewbox(0, 0, 297, 210);

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
      family: this.rules.name.fontFamily,
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
    name.attr('id', 'companyNameCopy');

    set.add(name);

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
        case 'pascalcase':
          this.tagline = this.tagline.replace(/\w+/g, w => w[0].toUpperCase() +
          w.slice(1).toLowerCase());
          break;
        default:
          break;
      }
      tagline = draw.text('.').tspan(this.tagline);

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
      tagline.attr('text-anchor', this.recipe.taglineAnchor);
      tagline.attr('id', 'taglineCopy');
      //const width = namePosition.w + 2;
      //tagline.attr('textLength', width);

      set.add(tagline);
      taglineProps = tagline.bbox();
    }


    /**
     * Check if recipe has accent
     */
    if (this.recipe.hasAccent) {
      const line = draw.line(0, 0, 15, 0).stroke({ width: 1 });
      console.log(taglineProps);
      const lineY = taglineProps.y2 - (taglineProps.h / 2);
      const lineX = taglineProps.x - 23;
      line.attr({
        transform: `translate(${lineX}, ${lineY})`,
      });
    }

    const svg = draw.svg();

    // Clear SVG properties
    draw.clear();

    return svg;
  }

  // drawAccent(draw, tagline) {
  //   const line = draw.line(0, 0, 15, 0).stroke({ width: 1 });
  //   const taglineProps = tagline.bbox();
  //   const lineY = taglineProps.y2 - (taglineProps.h / 2);
  //   const lineX = taglineProps.x - 23;
  //   line.attr({
  //     transform: `translate(${lineX}, ${lineY})`,
  //   });
  // }
}

module.exports = Logo;
