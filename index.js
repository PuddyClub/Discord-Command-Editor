// Prepare Modules
const express = require('express');
const path = require('path');
const fs = require('fs');

// Prepare Express
const app = express();

app.set('view engine', 'nunjucks');

// Homepage
const homepageCallback = (req, res) => {

    // Webpage
    const webpage = fs.readFileSync(path.join(__dirname, './public/index.html'));

    // Complete
    res.send(webpage);
    return;

};

app.all('/', homepageCallback);
app.all('/index.html', homepageCallback);

// Static Files
app.use(express.static(path.join(__dirname, '/public'), {
    maxAge: '2592000000' // uses milliseconds per docs
}));

app.listen(3000, function () {
    console.log('http://localhost:3000');
});

