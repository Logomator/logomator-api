let express = require('express');
let app = express();
let config = require('./config/config.json');
let NOUN_PROJECT_API_KEY = config.NOUN_PROJECT_API_KEY;
let NOUN_PROJECT_API_SECRET = config.NOUN_PROJECT_API_SECRET;
let cors = require('cors');
let NounProject = require('the-noun-project'),
    nounProject = new NounProject({
        key: NOUN_PROJECT_API_KEY,
        secret: NOUN_PROJECT_API_SECRET
    });
let Logo = require('./src/logo/logo');
let recipes = require('./src/logo/recipes');

app.use(cors());
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
