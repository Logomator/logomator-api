const express = require('express');
const config = require('./config/config.json');
const cors = require('cors');
const NounProject = require('the-noun-project');
const router = express.Router();

const app = express();
const NOUN_PROJECT_API_KEY = config.NOUN_PROJECT_API_KEY;
const NOUN_PROJECT_API_SECRET = config.NOUN_PROJECT_API_SECRET;
const nounProject = new NounProject({
  key: NOUN_PROJECT_API_KEY,
  secret: NOUN_PROJECT_API_SECRET,
});
const Logo = require('./src/logo/logo');
const recipes = require('./src/logo/recipes');

app.use(cors());
app.use(express.static('public'));

app.get('/api/icons/:term', (req, res) => {
  if (!req.params.term) {
    return res.send({ error: 'You need to specify a term' });
  }

  nounProject.getIconsByTerm(req.params.term, { limit: 9 }, (err, data) => {
    if (!err) {
      return res.send(data.icons);
    }
  });

  return res.send({ message: 'API not available' });
});


const getIcons = () => {
  const icons = [];
  nounProject.getIconsByTerm('puppies', { limit: 9 }, (err, data) => {
    if (!err) {
      icons.push(data.icons);
    }
  });
  return icons;
};

app.get('/logo', (req, res) => {
  const logos = [];

  nounProject.getIconsByTerm('puppies', { limit: 9 }, (err, data) => {

    if (!err) {
      icons.push(data.icons);
    }
  });

  console.log(getIcons());

  recipes.getRecipes().forEach((recipe) => {

    logos.push(
      new Logo('Dope Logos Now', 'Puppies Galore', 'Proxima Nova', '#FF6600', '#818691', recipe, icons).generate());
  });
  return res.send(logos[2]);
});

app.listen(8000, () => {
  console.log('Logomator API listening on port 8000!');
});
