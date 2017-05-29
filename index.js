const express = require('express');
const config = require('./config/config.json');
const cors = require('cors');
const bodyParser = require('body-parser');
const NounProject = require('the-noun-project');

const app = express();
const NOUN_PROJECT_API_KEY = config.NOUN_PROJECT_API_KEY;
const NOUN_PROJECT_API_SECRET = config.NOUN_PROJECT_API_SECRET;
const nounProject = new NounProject({
  key: NOUN_PROJECT_API_KEY,
  secret: NOUN_PROJECT_API_SECRET
});
const Logo = require('./src/logo/logo');
const Inspirations = require('./src/logo/inspiration');
const recipes = require('./src/logo/recipes');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/api/icons/:term', (req, res) => {
  if (!req.params.term) {
    return res.send({ error: 'You need to specify a term' });
  }
  nounProject.getIconsByTerm(req.params.term, { limit: 9}, (err, data) => {
    if (!err) {
      return res.send(data.icons);
    }
    return res.send({ message: 'API not available' });
  });
});

app.post('/api/logos/chars', (req, res) => { // TODO: Change URL to something more semantic
  const inspirations = new Inspirations(req.body.inspirations);
  const selected = inspirations.getInspirations();

  console.log("SELECTED", selected);
  return res.send({message: 'Received successfully', statusCode: 200});
});

const getIcons = () => {
  return new Promise((fulfill, reject) => {
    nounProject.getIconsByTerm('dog', { limit: 9 }, (err, data) => {
      if (!err) {
        fulfill(data.icons);
      }
      reject('API not available');
    });
  });
};

app.get('/logo', (req, res) => {
  const logos = [];
  getIcons().then((icons) => {
    recipes.getRecipes().forEach((recipe) => {
      logos.push(
        new Logo('Dope Logos Now Ridcoulously long name hahahaha', 'Puppies Galore', 'Proxima Nova', '#FF6600', '#818691', recipe, icons).generate());
    });
    return res.send(logos[1]);
  }).catch((error) => {
    console.log(error);
    res.send(error.toString());
  });
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Logomator API listening on port 8000!');
});
