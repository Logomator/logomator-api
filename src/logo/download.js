const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

const INKSCAPE = '/Applications/Inkscape.app/Contents/Resources/script';
const LOGO_WIDTH = 300;
const LOGO_HEIGHT = 230;

class Download {
  constructor(logo) {
    this.logo = logo;
  }

  async createLogoFile() {
    const filepath = path.join(`${__dirname}/logo.svg`);
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

    const command = `svgo ${logoFile} ${__dirname}/logo.min.svg`;

    return new Promise((resolve, reject) => {
      exec(command, (err, stdout, stderr) => {
        if (err) {
          return reject(err);
        }
        return resolve(`${__dirname}/logo.min.svg`);
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
      const command = `${INKSCAPE} ${logoFile} -l /Projects/Personal/logomator-api/src/logo/created.svg --export-text-to-path`;
      exec(command, (err, stdout, stderr) => {
        if (err) {
          return reject(err);
        }
        console.log('STDOUT', stdout);
        return resolve(`${__dirname}/created.svg`);
      });
    });
  }

  async generateHighResPNG() {
    let SVG;
    try {
      SVG = await this.convertLogoToPath();
    } catch (error) {
      return error;
    }
    const width = LOGO_WIDTH * 4;
    const height = LOGO_HEIGHT * 4;

    const command = `${INKSCAPE} ${SVG} --export-width=${width} --export-height=${height} --export-png=/Projects/Personal/logomator-api/high-res.png`;

    return new Promise((resolve, reject) => {
      exec(command, (err, stdout, stderr) => {
        if (err) {
          return reject(err);
        }

        if (stderr) {
          return reject(stderr);
        }
        return resolve('high-res.png');
      });
    });
  }
}

module.exports = Download;
