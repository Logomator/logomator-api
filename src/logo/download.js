const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

const INKSCAPE = 'inkscape';
const LOGO_WIDTH = 300;
const LOGO_HEIGHT = 230;

class Download {
  constructor(logo) {
    this.logo = logo;
  }

  async createLogoFile() {
    const filepath = path.join(`${__dirname}/../../logo.svg`);
    return new Promise((resolve, reject) => {
      fs.writeFile(filepath, this.logo, [], (err) => {
        if (err) {
          return reject(err);
        }
        return resolve(filepath);
      });
    });
  }

  async minifyLogo() {
    let logoFile;
    try {
      logoFile = await this.createLogoFile();
    } catch (error) {
      return error;
    }

    const command = `svgo ${logoFile} --enable=removeDimensions ${__dirname}/../../logo.min.svg`;

    return new Promise((resolve, reject) => {
      exec(command, (err, stdout, stderr) => {
        if (err) {
          return reject(err);
        }
        return resolve(`${__dirname}/../../logo.min.svg`);
      });
    });
  }

  async convertLogoToPath() {
    let logoFile;
    try {
      logoFile = await this.minifyLogo();
    } catch (error) {
      return error;
    }

    return new Promise((resolve, reject) => {
      const command = `${INKSCAPE} ${logoFile} -l ${__dirname}/../../created.svg --export-text-to-path`;
      exec(command, (err, stdout, stderr) => {
        if (err) {
          return reject(err);
        }
        return resolve(`${__dirname}/../../created.svg`);
      });
    });
  }

  async generateHighRes(extension, background) {
    let SVG;
    let command;

    try {
      SVG = await this.convertLogoToPath();
    } catch (error) {
      return error;
    }
    const width = LOGO_WIDTH * 4;
    const height = LOGO_HEIGHT * 4;

    if (background) {
      command = `${INKSCAPE} ${SVG} --export-width=${width} --export-height=${height} --export-background=#fff --export-${extension}=${__dirname}/../../high-res-with-bg.${extension}`;
    } else {
      command = `${INKSCAPE} ${SVG} --export-width=${width} --export-height=${height} --export-${extension}=${__dirname}/../../high-res.${extension}`;
    }

    return new Promise((resolve, reject) => {
      exec(command, (err, stdout, stderr) => {
        if (err) {
          return reject(err);
        }

        if (stderr) {
          return reject(stderr);
        }

        if (background) {
          return resolve(`high-res-with-bg.${extension}`);
        }
        return resolve(`high-res.${extension}`);
      });
    });
  }

  async generateSVG() {
    let logoFile;
    try {
      logoFile = await this.minifyLogo();
    } catch (error) {
      return error;
    }

    return new Promise((resolve, reject) => {
      const command = `${INKSCAPE} ${logoFile} -l ${__dirname}/../../logo.svg --export-text-to-path`;
      exec(command, (err, stdout, stderr) => {
        if (err) {
          return reject(err);
        }
        return resolve('logo.svg');
      });
    });
  }

  clear() {
    fs.unlink(`${__dirname}/../../logo.svg`);
    fs.unlink(`${__dirname}/../../logo.min.svg`);
    fs.unlink(`${__dirname}/../../created.svg`);
    fs.unlink(`${__dirname}/../../high-res.png`);
    fs.unlink(`${__dirname}/../../high-res-with-bg.png`);
    fs.unlink(`${__dirname}/../../high-res.pdf`);
    fs.unlink(`${__dirname}/../../high-res.eps`);
    fs.unlink(`${__dirname}/../../logos.zip`);
  }
}

module.exports = Download;
