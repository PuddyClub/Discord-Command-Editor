module.exports = function (app) {

    // Read File
    const readFile = function (req, res) {

        // URL Path
        let urlPath = req.url.split('/');
        urlPath.shift();
        urlPath.shift();

        // File Type
        res.setHeader('Content-Type', 'application/javascript');

        // Normal Path
        if (urlPath[0] !== "system") {

            // Obj Type
            if (urlPath[0] === "objType.js") {
                const file = `var objType = ${require('@tinypudding/puddy-lib/get/objType').toString()};`;
                res.send(file);
            }

            // Other
            else {

                // File
                try {

                    // Get File Path
                    const filePath = path.join(jsFolder, './' + urlPath[0]);

                    // Read File
                    if (filePath.endsWith('.js') && fs.lstatSync(filePath).isFile()) {
                        const file = fs.readFileSync(filePath, 'utf-8');
                        res.send(file);
                    }

                    // Nope
                    else { errorPage(res, 404, 'Invalid Path!'); }

                }

                // Error
                catch (err) { errorPage(res, 404, 'File Data Not Found.'); }

            }

        }

        // System
        else if (urlPath[0] === "system") {

            // File
            try {

                // Get File Path
                const filePath = path.join(jsFolder, './system/' + urlPath[1]);

                // Read File
                if (filePath.endsWith('.js') && fs.lstatSync(filePath).isFile()) {
                    const file = fs.readFileSync(filePath, 'utf-8');
                    res.send(file);
                }

                // Nope
                else { errorPage(res, 404, 'Invalid Path!'); }

            }

            // Error
            catch (err) { errorPage(res, 404, 'File System Data Not Found.'); }

        }

        // Nothing
        else { errorPage(res, 404, 'File Not Found.'); }

        // Complete
        return;

    };


    // Prepare Modules
    const path = require('path');
    const fs = require('fs');

    // JS Folder
    const jsFolder = path.join(__dirname, './client');

    // Prepare Nunjucks
    const nunjucks = require('nunjucks');
    nunjucks.configure(path.join(__dirname, './views'), {
        autoescape: true,
        express: app
    });

    // Error Page
    const errorPage = function (res, code, message) {
        res.status(code);
        return res.json({ error: code, message: message });
    };

    app.set('view engine', 'nunjucks');

    // Homepage
    app.get('/js/*', (req, res) => { return readFile(req, res); });

    // Homepage
    app.get('*', (req, res) => {

        // Index
        if (req.url === "/") { res.render('index'); }

        // Nope
        else { res.redirect('/'); }

        // Complete
        return;

    });


    app.post('*', (req, res) => {

        // Nothing
        errorPage(res, 404, 'Not Found.');

        // Complete
        return;

    });

    // Complete
    return;

};