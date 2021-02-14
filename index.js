module.exports = function (app) {

    // Read File
    const readFile = function (req, res) {

        // URL Path
        let urlPath = req.url.split('/');
        urlPath.shift();
        urlPath.shift();

        // Normal Path
        if (urlPath[0] !== "system") {

            // File
            try {
                const file = fs.readFileSync(path.join(jsFolder, './' + urlPath[0]), 'utf-8');
            } catch (err) {
                errorPage(res, 404, 'File Data Not Found.');
            }

        }

        // System
        else if (urlPath[0] === "system") {

            // File
            try {
                const file = fs.readFileSync(path.join(jsFolder, './system/' + urlPath[1]), 'utf-8');
            } catch (err) {
                errorPage(res, 404, 'File System Data Not Found.');
            }

        }

        // Nothing
        else { errorPage(res, 404, 'File Not Found.'); }

        // Complete
        return;

    };


    // Prepare Modules
    const path = require('path');

    // JS Folder
    const jsFolder = path.join(__dirname, './public/js');

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