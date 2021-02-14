module.exports = function (app, options) {

    // Prepare Config
    const _ = require('lodash');
    let tinyCfg = _.defaultsDeep({}, options, {

        // JS
        js: {
            'jquery': '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js" integrity="sha512-DUC8yqWf7ez3JD1jszxCWSVB0DMP78eOyBpMa5aJki1bIRARykviOuImIczkxlj1KhVSyS16w2FSQetkD4UU2w==" crossorigin="anonymous"></script>',
            'bootstrap': '<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.bundle.min.js" integrity="sha512-wV7Yj1alIZDqZFCUQJy85VN+qvEIly93fIQAN7iqDFCPEucLCeNFz4r35FCo9s6WrpdDQPi80xbljXB8Bjtvcg==" crossorigin="anonymous"></script>',
            'jqueryloadingoverlay': '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-loading-overlay/2.1.7/loadingoverlay.min.js" integrity="sha512-hktawXAt9BdIaDoaO9DlLp6LYhbHMi5A36LcXQeHgVKUH6kJMOQsAtIw2kmQ9RERDpnSTlafajo6USh9JUXckw==" crossorigin="anonymous"></script>',
            'urljs': '<script src="https://cdnjs.cloudflare.com/ajax/libs/urljs/2.5.0/url.min.js" integrity="sha512-quDzRasixBjD7wB9uvc/ApSn9ShS9ERqFrGR214jf0FUjomXQ7wtSxq0w2LZAvHKCC6myJNamVQBKt4tSeNEJQ==" crossorigin="anonymous"></script>',
            'emodal': '<script src="https://cdnjs.cloudflare.com/ajax/libs/eModal/1.2.69/eModal.min.js" integrity="sha512-OO21WN3HthMwsteuxEKk1SNo7XYJedW7Nyy0BO98nCYLRU57jP7seInkztBrs7Ub236jqe18Gw2/x4AbNsJ2/w==" crossorigin="anonymous"></script>',
            'jquerystorageapi': '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-storage-api/1.9.4/jquery.storageapi.min.js" integrity="sha512-rZXftKfJtDmBFPfxFYFjwGM3QadaGJCrOpdaOh3JPkk2wJXSghhUa7bn9CCn7R/UPW29aMuWY0JDnbZEiUYxgQ==" crossorigin="anonymous"></script>',
        },

        // CSS
        css: {
            'fontawesome': '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==" crossorigin="anonymous"/>',
            'bootstrap': '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css" integrity="sha512-P5MgMn1jBN01asBgU0z60Qk4QxiXo86+wlFahKrsQf37c9cro517WzVSPPV1tDKzhku2iJ2FVgL67wG03SGnNA==" crossorigin="anonymous"/>'
        }

    });

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
    const discordSlashCommandsClient = require('@tinypudding/discord-slash-commands/client');

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
        if (req.url === "/") { res.render('index', tinyCfg); }

        // Nope
        else { res.redirect('/'); }

        // Complete
        return;

    });

    // Post
    app.post('*', (req, res) => {

        // Get Command List
        if (req.url === "/getCommands") {

            const newApp = new discordSlashCommandsClient({
                bot_token: '',
                client_id: '',
                user_token: ''
            });

        }

        // Nothing
        else { errorPage(res, 404, 'Not Found.'); }

        // Complete
        return;

    });

    // Complete
    return;

};