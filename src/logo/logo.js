"use strict";

const window = require('svgdom');
const SVG = require('svg.js')(window);
const document = window.document;

// Logo configuration
const LOGO_WIDTH = 300;
const LOGO_HEIGHT = 230;
const LOGO_BACKGROUND = './images/logo-background-shadow.png';

class Logo {
    constructor(companyName, tagline, fontFamily, companyNameColor, taglineColor, recipe) {
        this.companyName = companyName || 'Dopest';
        this.tagline = tagline || null;
        this.fontFamily = fontFamily || 'Proxima Nova';
        this.companyNameColor = companyNameColor || '#FF6600';
        this.taglineColor = taglineColor || '#FF6600';
        this.recipe = recipe;

    }

    generate() {
        const draw = SVG(document.documentElement).size(300, 230);
        draw.rect(LOGO_WIDTH, LOGO_HEIGHT).fill('#fff');
        draw.image(LOGO_BACKGROUND, 300, 230);
        draw.text(this.companyName).font({
            fill: this.companyNameColor,
            family: this.fontFamily,
            size: '30',
            anchor: this.recipe.companyNameAnchor,
            leading: this.recipe.companyNameLeading,
            dx: this.recipe.companyNameDx,
            dy: this.recipe.companyNameDy
        });
        return draw.svg();
    }
}

module.exports = Logo;