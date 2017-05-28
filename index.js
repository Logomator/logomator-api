const express = require('express');
const router = express.Router();
const app = express();
const config = require('./config/config.json');
const NOUN_PROJECT_API_KEY = config.NOUN_PROJECT_API_KEY;
const NOUN_PROJECT_API_SECRET = config.NOUN_PROJECT_API_SECRET;
const cors = require('cors');
const bodyParser = require('body-parser');
const Logo = require('./src/logo/logo');
const recipes = require('./src/logo/recipes');
const NounProject = require('the-noun-project'),
  nounProject = new NounProject({
    key: NOUN_PROJECT_API_KEY,
    secret: NOUN_PROJECT_API_SECRET
  });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/icons/:term', (req, res) => {

  if (!req.params.term) {
    return res.send({error: "You need to specify a term"});
  }

  nounProject.getIconsByTerm(req.params.term, {limit: 9}, function (err, data) {

    if (!err) {
      return res.send(data.icons);
    }
    return res.send({message: "API not available"});

  });
});

app.post('/api/logos/chars', (req, res) => {
  console.log(req.body);
  return res.send({message: 'Received successfully', statusCode: 200});
});

app.get('/logo', (req, res) => {
  let logos = [];
  recipes.getRecipes().forEach((recipe) => {
    logos.push(
      new Logo('Company Name', 'Tagline', 'Proxima Nova', '#FF6600', 'red', recipe).generate()
    );
  });
  return res.send(logos[0]);
});

app.listen(8000, () => {
  console.log('Logomator API listening on port 8000!')
});
