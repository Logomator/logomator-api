const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const Logo = require('./src/logo/logo');
const Inspirations = require('./src/logo/inspiration');
const Information = require('./src/logo/information');
const recipes = require('./src/logo/recipes');
const fonts = require('./src/logo/fonts');
const Colors = require('./src/logo/color');
const Download = require('./src/logo/download');
const zip = new require('node-zip')();

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
  const characteristics = [];
  const logos = [];

  let count = 0; // TODO refactor this.
  fonts.getFonts().forEach(() => {
    count += 1;

    if (rules[count] === undefined) { // TODO refactor this.
      count = 0;
    }
    palettes.forEach((palette) => {
      recipes.getRecipes().forEach((recipe) => {
        characteristics.push([information.name, information.tagline,
          rules[count], palette[0], palette[1], recipe, []]);
      });
    });
  });

  for (let i = 0; i < characteristics.length; i++) {
    let logo = new Logo(characteristics[i][0], characteristics[i][1],
      characteristics[i][2], characteristics[i][3],
      characteristics[i][4], characteristics[i][5], []);
    logos.push(logo);
  }


  res.set({
    'Content-Type': 'image/svg+xml',
    Vary: 'Accept-Encoding',
  });

  // Randomize logos TODO refactor this
  for (let i = logos.length; i; i--) {
    const j = Math.floor(Math.random() * i);
    [logos[i - 1], logos[j]] = [logos[j], logos[i - 1]];
  }

  const returnedLogos = [];

  for (let i = 0; i < 6; i++) {
    returnedLogos.push(logos[i].generate());
  }

  return res.send({
    statusCode: 200,
    concepts: returnedLogos,
  });
});

app.post('/api/logos/concepts', (req, res) => {
  const inspirations = new Inspirations(req.body.inspirations);
  const rules = inspirations.generateMoreConcepts();
  const information = new Information(req.body.companyName, req.body.tagline).getInformation();
  const colors = req.body.palettes.filter(p => p.isSelected);
  const charcterisitcs = [];
  const logos = [];

  // Limit number of concepts returned to 6.
  let count = 0; // TODO refactor this.
  fonts.getFonts().forEach(() => {
    count += 1;
    if (rules[count] === undefined) { // TODO refactor this.
      count = 0;
    }
    recipes.getRecipes().forEach((recipe) => {
      charcterisitcs.push([information.name, information.tagline,
        rules[count], colors[0].hexcodes[1], colors[1].hexcode[1], recipe, []]);
    });
  });

  charcterisitcs.forEach((char) => {
    logos.push(
      new Logo(char[0], char[1],
        char[2], char[3], char[4], char[5], []).generate());
  });
  console.log('CHARS', charcterisitcs);

  res.set({
    'Content-Type': 'image/svg+xml',
    Vary: 'Accept-Encoding',
  });

  const returnedLogos = [];

  for (let i = 0; i < 6; i++) {
    returnedLogos.push(logos[i]);
  }

  return res.send({
    statusCode: 200,
    concepts: returnedLogos,
  });
});

app.post('/api/survey', (req, res) => { // TODO: Change URL to something more semantic
  const data = {
    email: req.body.email,
    experience: req.body.experience,
    mostLiked: req.body.mostLiked,
    improvements: req.body.improvements,
  };

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // secure:true for port 465, secure:false for port 587
    auth: {
      user: 'dopelogos123@gmail.com', // TODO replace with support@logomator.com email address
      pass: 'Awesomelogos123!',
    },
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: 'hunterg325@gmail.com', // sender address
    to: 'hunter@logomator.com, gus@logomator.com', // list of receivers
    subject: `Survey response from ${data.email}`, // Subject line
    html: `<h1 style="color:black;">Experience</h1> <br />
            <p style="color: black;">${data.experience}</p> <br /> 
            <h1 style="color:black;">Most liked</h1> <br />
            <p style="color: black;">${data.mostLiked}</p> <br />
            <h1 style="color:black;">Improvements</h1> <br />
            <p style="color: black;">${data.improvements}</p>`,// plain text body
  };

// send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });

  return res.send({
    statusCode: 200,
  });
});

app.post('/api/logo/download', (req, res) => {
  const download = new Download(req.body.logo);
  const fileContent = download.getHighRes();
  const filepath = path.join(__dirname + '/logo.svg');

  fs.writeFile(filepath, fileContent, [], (err) => {
    if (err) throw err;

    zip.file('logo.svg', fs.readFileSync(filepath));
    const data = zip.generate({ base64: false, compression: 'DEFLATE' });
    fs.writeFileSync('logos.zip', data, 'binary');
    fs.chmodSync('logos.zip', '777');
    res.download('logos.zip');
  });
});

app.get('/api/logo/:filename', (req, res) => {
  return res.download('logos.zip');
});


app.listen(process.env.PORT || 8000, () => {
  console.log('Logomator API listening on port 8000!');
});
