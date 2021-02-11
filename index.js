// Prepare Modules
const express = require('express');
const path = require('path');
const fs = require('fs');
const jsFolder = path.join(__dirname, './public/js');

// Prepare Express
const app = express();

app.set('view engine', 'nunjucks');

// Read File
const readFile = function (file) {
    return '<script>' + fs.readFileSync(path.join(jsFolder, './' + file), 'utf-8') + '</script>';
};

// Homepage
const homepageCallback = (req, res) => {

    // Webpage
    const webpage = fs.readFileSync(path.join(__dirname, './public/index.html'), 'utf-8');

    // Render Page
    res.send(

        // Web File
        webpage

            // main.js
            .replace(`<script src="/js/main.js"></script>`, readFile('main.js'))

            // client.js
            .replace(`<script src="/js/client.js"></script>`, readFile('client.js'))

    );

    // Complete
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

