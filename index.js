const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Logo = require('./src/logo/logo');
const Inspirations = require('./src/logo/inspiration');
const Information = require('./src/logo/information');
const recipes = require('./src/logo/recipes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/logos/chars', (req, res) => { // TODO: Change URL to something more semantic
  const inspirations = new Inspirations(req.body.inspirations);
  const rules = inspirations.getInspirations();
  const information = new Information(req.body.companyName, req.body.tagline).getInformation();
  const logos = [];

  recipes.getRecipes().forEach((recipe) => {
    logos.push(
      new Logo(information.name, information.tagline,
        rules[0][0], '#FF6600', '#818691', recipe, []).generate());
  });

  res.set({
    'Content-Type': 'image/svg+xml',
    Vary: 'Accept-Encoding',
  });

  return res.send({
    statusCode: 200,
    concepts: logos,
  });
});


app.get('/logo', (req, res) => {
  const logos = [];
  const rules = [
    {
      '0': {
        'name': {
          'fontFamily': 'Proxima Nova',
          'fontWeight': '500',
          'fontType': 'serif',
          'casing': 'uppercase',
        },
        'tagline': {
          'fontFamily': 'Proxima Nova',
          'fontWeight': '300',
          'fontType': 'serif',
          'casing': 'uppercase',
        },
      },
    },
  ];
  recipes.getRecipes().forEach((recipe) => {
    logos.push(
      new Logo('Logomator', 'AI Powered Logos',
        rules[0][0], '#FF6600', '#818691', recipe, []).generate());
  });
  return res.send(logos[2]);
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Logomator API listening on port 8000!');
});
