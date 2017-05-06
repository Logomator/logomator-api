"use strict";

let SVG = require('svg.js');

class Logo {

    get logo() {
        return this.generate();
    }

    generate() {
        let draw = SVG('drawing').size(300, 300);
        let rect = draw.rect(100, 100).attr({ fill: '#f06' });
        return rect.svg('drawing');
    }
}

module.exports = new Logo();