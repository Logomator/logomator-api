"use strict";

// returns a window with a document and an svg root node
const window   = require('svgdom')
const SVG      = require('svg.js')(window);
const document = window.document;
class Logo {

    get logo() {
        return this.generate();
    }

    generate() {
        const draw = SVG(document.documentElement);
        draw.rect(100,100).fill('yellow').move(50,50);
        let exportedSVG = draw.svg();
        return exportedSVG;
    }
}

module.exports = new Logo();