const window = require('svgdom');
const SVG = require('svg.js')(window);

const document = window.document;

class Logo {
  constructor(companyName, tagline, rules, companyNameColor, taglineColor, icons) {
    this.companyName = companyName || 'Dopest';
    this.tagline = tagline || '';
    this.companyNameColor = companyNameColor;
    this.taglineColor = taglineColor;
    this.icons = icons;
    this.rules = rules;
    this.companyNameElement = null;
    this.taglineElement = null;
    this.groupElement = null;
    this.companyNameY = null;
  }

  generate() {
    const draw = new SVG(document.documentElement).size(300, 230).attr('id', 'logo');
    draw.viewbox(0, 0, 297, 210);

    /**
     * Preload fonts.
     */
    this.preloadFonts();

    this.groupElement = draw.group();

    if (!this.rules.tagline) {
      return this.drawCompanyName(draw, this.groupElement);
    }

    this.drawCompanyName(draw, this.groupElement);

    /**
     * Check if recipe has tagline.
     */
    if (this.rules.tagline) {
      this.drawTagline(draw, this.groupElement);
    }

    /**
     * Check if recipe has accent.
     */
    if (this.rules.accent) {
      this.drawAccent(draw);
    }

    const svg = draw.svg();

    draw.clear();

    return svg;
  }

  drawCompanyName(draw) {
    /**
     * Check company name casing
     */
    this.companyName = this.setTextCasing(this.companyName, this.rules.name.casing);

    this.companyNameElement = draw.text((add) => {
      add.tspan(this.companyName);
    });

    this.groupElement.add(this.companyNameElement);

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

    /**
     * Check if tagline placement is left, if so, remove text anchor middle.
     */

    if (!this.rules.tagline) {
      this.companyNameElement.attr({
        x: '50%',
        y: '50%',
        'text-anchor': 'middle',
        'alignment-baseline': 'middle',
      });
      return draw.svg();
    }

    const nameProps = this.companyNameElement.bbox();

    const nameX = 150 - nameProps.w / 2;
    const nameY = 115 - (nameProps.h / 2);
    this.companyNameY = nameY;

    this.companyNameElement.attr({
      x: nameX,
      y: nameY,
    });
  }

  drawTagline(draw) {
    /**
     * Tagline casing rules.
     */
    this.tagline = this.setTextCasing(this.tagline, this.rules.tagline.casing);

    if (this.rules.tagline.taglineWidth) {
      this.taglineElement = draw.text((add) => {
        add.tspan(this.tagline).attr({
          textLength: this.companyNameElement.bbox().w,
        })
      });
    } else {
      this.taglineElement = draw.text((add) => {
        add.tspan(this.tagline);
      });
    }

    this.groupElement.add(this.taglineElement);

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
    this.taglineElement.attr('id', 'taglineCopy');

    switch (this.rules.tagline.taglinePlacement) {
      /**
       * Tagline positioning rules.
       */
      case 'middle': {
        let taglineX;

        if (this.rules.tagline.taglineWidth === 'companyNameWidth') {
          taglineX = '50%';
          this.taglineElement.attr({
            textLength: this.companyNameElement.bbox().w,
            'text-anchor': 'middle',
            'alignment-baseline': 'middle',
          });
        } else {
          taglineX = 150 - (this.taglineElement.bbox().w / 2);
        }
        const taglineY = this.companyNameY + (this.taglineElement.bbox().h);

        this.taglineElement.attr({
          x: taglineX,
          y: taglineY,
        });
        break;
      }

      case 'left': {
        const taglineX = this.companyNameElement.bbox().x;
        const taglineY = this.companyNameY + (this.taglineElement.bbox().h);

        this.taglineElement.attr({
          x: taglineX,
          y: taglineY,
        });
        break;
      }

      case 'right': {
        const taglineX = this.companyNameElement.bbox().w -
          this.taglineElement.bbox().w +
          this.companyNameElement.bbox().x;

        const taglineY = this.companyNameY + (this.taglineElement.bbox().h);

        this.taglineElement.attr({
          x: taglineX - 3,
          y: taglineY,
        });
        break;
      }

      case 'belowAccent': {
        const taglineProps = this.taglineElement.bbox();
        const taglineX = 150 - (taglineProps.w / 2);
        const taglineY = this.companyNameY + (taglineProps.h + 10);

        this.taglineElement.attr({
          x: taglineX,
          y: taglineY,
        });
        break;
      }

      default: {
        const taglineX = 150;
        const taglineY = this.companyNameY;

        this.taglineElement.attr({
          x: taglineX,
          y: taglineY,
        });
        break;
      }
    }

    /**
     * Center groupElement
    //  */
    // const group = this.groupElement.bbox();
    // const groupY = group.y - group.h / 2;
    //
    // console.log('Group BBOX', this.groupElement.bbox());
    //
    // this.groupElement.attr({
    //   transform: `translate(0, ${groupY})`,
    // });
  }

  drawAccent(draw) {
    const taglineProps = this.taglineElement.bbox();
    let circle;
    let circle2;
    let line;
    let line2;

    switch (this.rules.accent.accentPlacement) {
      case 'linesBothSidesOfTagline': {
        if (this.rules.accent.accentWidth > 15) {
          const spacing = 20;
          const taglineWidthWithSpacing = taglineProps.w + spacing;
          const companyNameWidthDifference = this.companyNameElement.bbox().w - taglineWidthWithSpacing;
          const lineWidth = companyNameWidthDifference / 2;

          line = draw.line(0, 0, lineWidth, 0).stroke({
            width: 1,
          });
          line2 = draw.line(0, 0, lineWidth, 0).stroke({
            width: 1,
          });
          const lineY = taglineProps.y + (taglineProps.h / 2);
          const lineX = taglineProps.x - lineWidth - 8;
          line.attr({
            transform: `translate(${lineX}, ${lineY})`,
          });
          const line2Y = taglineProps.y + (taglineProps.h / 2);
          const line2X = taglineProps.x +
            (taglineProps.w - lineWidth) + lineWidth + 8;
          line2.attr({
            transform: `translate(${line2X}, ${line2Y})`,
          });
        } else {
          line = draw.line(0, 0, this.rules.accent.accentWidth, 0).stroke({
            width: 1,
          });
          line2 = draw.line(0, 0, this.rules.accent.accentWidth, 0).stroke({
            width: 1,
          });
          const lineY = taglineProps.y + (taglineProps.h / 2);
          const lineX = taglineProps.x - this.rules.accent.accentWidth - 8;
          line.attr({
            transform: `translate(${lineX}, ${lineY})`,
          });
          const line2Y = taglineProps.y + (taglineProps.h / 2);
          const line2X = taglineProps.x +
            (taglineProps.w - this.rules.accent.accentWidth) + this.rules.accent.accentWidth + 8;
          line2.attr({
            transform: `translate(${line2X}, ${line2Y})`,
          });
        }
        break;
      }
      case 'lineBetweenNameAndTagline': {
        line = draw.line(0, 0, this.companyNameElement.bbox().w, 0).stroke({
          width: 1,
        });
        const lineY = taglineProps.y - (taglineProps.h / 2) + 6;
        const lineX = 150 - (this.companyNameElement.bbox().w / 2);
        line.attr({
          transform: `translate(${lineX}, ${lineY})`,
        });
        break;
      }
      case 'left': {
        const spacing = 10;
        const taglineWidthWithSpacing = this.taglineElement.bbox().w + spacing;
        const companyNameWidthDifference = this.companyNameElement.bbox().w - taglineWidthWithSpacing;


        line = draw.line(0, 0, companyNameWidthDifference, 0).stroke({
          width: 5,
          color: this.companyNameColor,
        });
        const lineY = taglineProps.y + (taglineProps.h / 2);
        const lineX = taglineProps.x - companyNameWidthDifference - spacing + 3;
        line.attr({
          transform: `translate(${lineX}, ${lineY})`,
        });
        break;
      }
      case 'circlesBothSidesOfTagline': {
        circle = draw.circle(3);
        circle2 = draw.circle(3);
        const circleY = taglineProps.y + (taglineProps.h / 2);
        const circleX = taglineProps.x - 11;
        circle.attr({
          transform: `translate(${circleX}, ${circleY})`,
        });
        const circle2Y = taglineProps.y + (taglineProps.h / 2);
        const circle2X = taglineProps.x + (taglineProps.w - 3) + 11;
        circle2.attr({
          transform: `translate(${circle2X}, ${circle2Y})`,
        });
        break;
      }
      default: {
        const lineY = taglineProps.y + (taglineProps.h / 2);
        const lineX = taglineProps.x - 23;
        line.attr({
          transform: `translate(${lineX}, ${lineY})`,
        });
        const line2Y = taglineProps.y + (taglineProps.h / 2);
        const line2X = taglineProps.x + (taglineProps.w - 15) + 23;
        line2.attr({
          transform: `translate(${line2X}, ${line2Y})`,
        });
        break;
      }
    }
  }

  setTextCasing(text, casing) {
    switch (casing) {
      case 'lowercase':
        text.toLowerCase();
        break;
      case 'uppercase':
        text.toUpperCase();
        break;
      case 'pascalcase':
        text.replace(/\w+/g, w => w[0].toUpperCase() +
        w.slice(1).toLowerCase());
        break;
      default:
        break;
    }
    return text;
  }
  preloadFonts() {
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
  }
}

module.exports = Logo;
