const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Logo = require('./src/logo/logo');
const Inspirations = require('./src/logo/inspiration');
const Information = require('./src/logo/information');
const recipes = require('./src/logo/recipes');
const fonts = require('./src/logo/fonts');
const Colors = require('./src/logo/color');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({
  limit: '100mb',
  extended: true,
  parameterLimit: 50000,
}));
app.use(express.static('public'));

app.post('/api/logos/chars', (req, res) => { // TODO: Change URL to something more semantic
  const inspirations = new Inspirations(req.body.inspirations);
  const rules = inspirations.getInspirations();
  const information = new Information(req.body.companyName, req.body.tagline).getInformation();
  const colors = new Colors(req.body.palettes);
  const palettes = colors.applyRules();
  const logos = [];

  let count = 0; // TODO refactor this.
  fonts.getFonts().forEach(() => {
    count += 1;
    if (rules[count] === undefined) { // TODO refactor this.
      count = 0;
    }

    palettes.forEach((palette, index) => {
      if (index < 6) {
        recipes.getRecipes().forEach((recipe) => {
          logos.push(
            new Logo(information.name, information.tagline,
              rules[count], palette[0], palette[1], recipe, []).generate());
        });
      }
    });
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

app.post('/api/logos/concepts', (req, res) => {
  const inspirations = new Inspirations(req.body.inspirations);
  const rules = inspirations.generateMoreConcepts();
  const information = new Information(req.body.companyName, req.body.tagline).getInformation();
  const colors = req.body.palettes.filter(p => p.isSelected);
  const logos = [];

  // Limit number of concepts returned to 6.
  let count = 0; // TODO refactor this.
  fonts.getFonts().forEach(() => {
    count += 1;
    if (rules[count] === undefined) { // TODO refactor this.
      count = 0;
    }
    recipes.getRecipes().forEach((recipe) => {
      logos.push(
        new Logo(information.name, information.tagline,
          rules[count], colors[0].hexcodes[1], colors[1].hexcodes[1], recipe, []).generate());
    });
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
