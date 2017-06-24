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
    this.companyNameElement = null;
    this.taglineElement = null;
  }

  generate() {
    const draw = new SVG(document.documentElement).size(300, 230).attr('id', 'logo');
    draw.viewbox(0, 0, 297, 210);

    this.drawCompanyName(draw);

    /**
     * Check if recipe has tagline.
     */
    if (this.recipe.hasTagline) {
      this.drawTagline(draw);
    }


    /**
     * Check if recipe has accent
     */
    if (this.recipe.hasAccent) {
      this.drawAccent(draw);
    }

    const svg = draw.svg();

    // Clear SVG properties
    draw.clear();

    return svg;
  }

  drawCompanyName(draw) {
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

    this.companyNameElement = draw.text('').tspan(this.companyName);

    /**
     * Company name font rules.
     */
    this.companyNameElement.font({
      fill: this.companyNameColor,
      family: this.rules.name.fontFamily,
      'letter-spacing': this.rules.name.letterSpacing,
      size: this.rules.name.fontSize,
    });

    /**
     * Company name positioning rules.
     */
    this.companyNameElement.attr('alignment-baseline', this.recipe.companyBaseline);
    this.companyNameElement.attr('text-anchor', this.recipe.companyNameAnchor);
    this.companyNameElement.attr('id', 'companyNameCopy');

    const nameProps = this.companyNameElement.bbox();

    const nameX = 150;
    const nameY = 115 - (nameProps.h / 2);

    this.companyNameElement.attr({
      x: nameX,
      y: nameY,
    });
  }

  drawTagline(draw) {
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
    this.taglineElement = draw.text('').tspan(this.tagline);

    /**
     * Tagline font rules.
     */
    this.taglineElement.font({
      fill: this.taglineColor,
      family: this.rules.tagline.fontFamily,
      weight: this.rules.tagline.fontWeight,
      'letter-spacing': this.rules.tagline.letterSpacing,
      size: this.rules.tagline.fontSize,
    });

    /**
     * Tagline positioning rules.
     */
    this.taglineElement.attr('alignment-baseline', this.recipe.taglineBaseline);
    this.taglineElement.attr('text-anchor', this.recipe.taglineAnchor);
    this.taglineElement.attr('id', 'taglineCopy');
    // const width = namePosition.w + 2;
    // tagline.attr('textLength', width);


    const taglineProps = this.taglineElement.bbox();
    const nameProps = this.companyNameElement.bbox();
    const taglineX = 150;
    const taglineY = 115 - (taglineProps.h / 2 - 13);

    this.taglineElement.attr({
      x: taglineX,
      y: taglineY,
    });
  }
  drawAccent(draw) {
    const line = draw.line(0, 0, 15, 0).stroke({ width: 1 });
    const line2 = draw.line(0, 0, 15, 0).stroke({ width: 1 });
    const taglineProps = this.taglineElement.bbox();
    console.log(taglineProps);
    const lineY = taglineProps.y2 - (taglineProps.h / 2 / 2);
    const lineX = taglineProps.x - (taglineProps.w / 2) - 23;
    line.attr({
      transform: `translate(${lineX}, ${lineY})`,
    });
    const line2Y = taglineProps.y2 - (taglineProps.h / 2 / 2);
    const line2X = taglineProps.x + (taglineProps.w / 2) + 8;
    line2.attr({
      transform: `translate(${line2X}, ${line2Y})`,
    });
  }
}

module.exports = Logo;
