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
  const selected = inspirations.getInspirations();
  const information = new Information(req.body.companyName, req.body.tagline);
  console.log(information.getInformation());
  return res.send({ message: 'Received successfully', statusCode: 200 });
});


app.get('/logo', (req, res) => {
  const logos = [];
  recipes.getRecipes().forEach((recipe) => {
    logos.push(
      new Logo('Dope Logos Now Ridcoulously long name hahahaha', 'Puppies Galore',
        'Proxima Nova', '#FF6600', '#818691', recipe, []).generate());
  });
  return res.send(logos[0]);
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Logomator API listening on port 8000!');
});
