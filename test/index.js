// Prepare Module
const express = require('express');
const app = express();
require('../index')(app);

// Path
const path = require('path');

// Static Files
app.use(express.static(path.join(__dirname, '/public'), {
    maxAge: '2592000000' // uses milliseconds per docs
}));

app.listen(3000, function () {
    console.log('http://localhost:3000');
});