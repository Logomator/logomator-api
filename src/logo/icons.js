const config = require('../../config/config.json');
const NounProject = require('the-noun-project');

const nounProject = new NounProject({
  key: config.NOUN_PROJECT_API_KEY,
  secret: config.NOUN_PROJECT_API_SECRET,
});

class Icons {
  constructor(searchTerm) {
    this.searchTerm = searchTerm;
  }
  getIcons() {
    return new Promise((fulfill, reject) => {
      nounProject.getIconsByTerm(this.searchTerm, { limit: 9 }, (err, data) => {
        if (!err) {
          fulfill(data.icons);
        }
        reject('API not available');
      });
    });
  }
}

module.exports = Icons;
