// Prepare Module
const express = require('express');
const app = express();
require('../index')(app, { meta: '' });

app.listen(3000, function () {
    console.log('http://localhost:3000');
});