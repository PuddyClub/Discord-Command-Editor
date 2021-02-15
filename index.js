module.exports = function (app, options) {

    // Prepare Config
    const _ = require('lodash');
    const fileCache = require('@tinypudding/puddy-lib/http/fileCache');
    let tinyCfg = _.defaultsDeep({}, options, {

        // Meta
        meta: '<link href="/img/icon.png" rel="icon" type="image/x-icon"/>' +
            '<meta name="robots" content="noindex" />' +
            '<meta name="googlebot" content="noindex"/>' +
            '<meta name="googlebot-news" content="noindex"/>' +
            '<meta name="theme-color" content="#506fb4">' +
            '<meta name="msapplication-navbutton-color" content="#506fb4">' +
            '<meta name="apple-mobile-web-app-status-bar-style" content="#506fb4">',

        // JS
        js: {
            'objecthash': '<script src="https://cdn.jsdelivr.net/npm/object-hash@2.1.1/dist/object_hash.min.js" integrity="sha384-Z4R1Xdk1ps4lJkucY9aotf0f7DJWWKyen7Be/G+lodTei33jHgz7I0t76LrtRKai" crossorigin="anonymous"></script>',
            'filesaver': '<script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js" integrity="sha512-Qlv6VSKh1gDKGoJbnyA5RMXYcvnpIqhO++MhIM2fStMcGT9i2T//tSwYFlcyoRRDcDZ+TYHpH8azBBCyhpSeqw==" crossorigin="anonymous"></script>',
            'jquery': '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js" integrity="sha512-DUC8yqWf7ez3JD1jszxCWSVB0DMP78eOyBpMa5aJki1bIRARykviOuImIczkxlj1KhVSyS16w2FSQetkD4UU2w==" crossorigin="anonymous"></script>',
            'bootstrap': '<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.bundle.min.js" integrity="sha512-wV7Yj1alIZDqZFCUQJy85VN+qvEIly93fIQAN7iqDFCPEucLCeNFz4r35FCo9s6WrpdDQPi80xbljXB8Bjtvcg==" crossorigin="anonymous"></script>',
            'jqueryloadingoverlay': '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-loading-overlay/2.1.7/loadingoverlay.min.js" integrity="sha512-hktawXAt9BdIaDoaO9DlLp6LYhbHMi5A36LcXQeHgVKUH6kJMOQsAtIw2kmQ9RERDpnSTlafajo6USh9JUXckw==" crossorigin="anonymous"></script>',
            'urljs': '<script src="https://cdnjs.cloudflare.com/ajax/libs/urljs/2.5.0/url.min.js" integrity="sha512-quDzRasixBjD7wB9uvc/ApSn9ShS9ERqFrGR214jf0FUjomXQ7wtSxq0w2LZAvHKCC6myJNamVQBKt4tSeNEJQ==" crossorigin="anonymous"></script>',
            'emodal': '<script src="https://cdnjs.cloudflare.com/ajax/libs/eModal/1.2.69/eModal.min.js" integrity="sha512-OO21WN3HthMwsteuxEKk1SNo7XYJedW7Nyy0BO98nCYLRU57jP7seInkztBrs7Ub236jqe18Gw2/x4AbNsJ2/w==" crossorigin="anonymous"></script>',
            'jquerystorageapi': '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-storage-api/1.9.4/jquery.storageapi.min.js" integrity="sha512-rZXftKfJtDmBFPfxFYFjwGM3QadaGJCrOpdaOh3JPkk2wJXSghhUa7bn9CCn7R/UPW29aMuWY0JDnbZEiUYxgQ==" crossorigin="anonymous"></script>',
            'jsoneditor': '<script src="https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/5.28.2/jsoneditor.min.js" integrity="sha512-bfsUyGahu9QXboUnOAGfGubz8AMLY10PIavnh2q7lc/M5HhR3NOXYqFVTCMS9TcfZqQihbiibdVTtC3woU7gmQ==" crossorigin="anonymous"></script>',
            'clone': '<script src="https://cdnjs.cloudflare.com/ajax/libs/clone/1.0.4/clone.min.js" integrity="sha512-DnAb1jKHBEwQiL3WNROTHx15qqHPjb5APGfUFopcXO4gjk4T/vGNwLbffnfwFYfle/cCQ1x/fi5u5qsJmKrPAA==" crossorigin="anonymous"></script>',
        },

        // CSS
        css: {
            'index': '<link rel="stylesheet" href="/css/defaultDSE.css" />',
            'fontawesome': '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==" crossorigin="anonymous"/>',
            'bootstrap': '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css" integrity="sha512-P5MgMn1jBN01asBgU0z60Qk4QxiXo86+wlFahKrsQf37c9cro517WzVSPPV1tDKzhku2iJ2FVgL67wG03SGnNA==" crossorigin="anonymous"/>',
            'jsoneditor': '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/5.28.2/jsoneditor.min.css" integrity="sha512-EBuVURdzGGQq+s6e9pCbguXC9AUnSV+jlW4UWpJ4cgcZmzOLJ9EpirGdooRWyfx0IolJ+Er+D7C9QnfoQVw9+w==" crossorigin="anonymous" />',
        }

    });

    // Get File Config
    const getFileConfig = function (file, contentType = 'application/javascript') {
        return {
            file: file,
            contentType: contentType,
            date: { year: 2021, month: 2, day: 14, hour: 23, minute: 50 },
            timezone: 'America/Sao_Paulo',
            fileMaxAge: tinyCfg.fileMaxAge
        };
    };

    // Read File
    const readFile = function (req, res, next) {

        // URL Path
        let urlPath = req.url.split('/');
        urlPath.shift();
        urlPath.shift();

        // File Type
        let fileType = null;

        // Read File Type
        const readFileType = function (filePath) {

            // Javascript
            if (filePath.endsWith('.js')) {
                fileType = 'application/javascript';
            }

            // CSS
            else if (filePath.endsWith('.css')) {
                fileType = 'text/css';
            }

            // Complete
            return;

        };

        // Normal Path
        if (urlPath[0] !== "system") {

            // Obj Type
            if (urlPath[0] === "objType.js") {
                const file = `var objType = ${require('@tinypudding/puddy-lib/get/objType').toString()};`;
                fileCache(res, next, getFileConfig(file));
            }

            // Other
            else {

                // File
                try {

                    // Get File Path
                    const filePath = path.join(clientFolder, './' + urlPath[0]);
                    readFileType(filePath);

                    // Read File
                    if (fileType && fs.lstatSync(filePath).isFile()) {
                        const file = fs.readFileSync(filePath, 'utf-8');
                        fileCache(res, next, getFileConfig(file, fileType));
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
                const filePath = path.join(clientFolder, './system/' + urlPath[1]);
                readFileType(filePath)

                // Read File
                if (fileType && fs.lstatSync(filePath).isFile()) {
                    const file = fs.readFileSync(filePath, 'utf-8');
                    fileCache(res, next, getFileConfig(file, fileType));
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
    const bodyParser = require('body-parser');
    const discordSlashCommandsClient = require('@tinypudding/discord-slash-commands/client');

    // Body Parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));

    // JS Folder
    const clientFolder = path.join(__dirname, './client');

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

    // For Promise
    app.get('/js/forPromise.js', (req, res, next) => {

        // For Promise
        let forPromise = require('for-promise').toString()
            .replace(`require('./files/objType')`, require('for-promise/files/objType').toString())
            .replace(
                `require('./files/superValidator')`, require('for-promise/files/superValidator').toString()
                    .replace(`const objType = require('./objType');`, '')
            )
            .replace(
                `require('./files/validateTotal')`, require('for-promise/files/validateTotal').toString()
                    .replace(
                        `require('./countObj')`, require('for-promise/files/countObj').toString()
                            .replace(`const objType = require('./objType');`, '')
                    )
                    .replace(`const objType = require('./objType');`, '')
            );

        // Send Data
        fileCache(res, next, getFileConfig(`var forPromise = ${forPromise};`));

        // Complete
        return;

    });

    // JS and CSS
    app.get('/js/*', (req, res, next) => { return readFile(req, res, next); });
    app.get('/css/*', (req, res, next) => { return readFile(req, res, next); });

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

        // Exist Authorization
        if (typeof req.headers.authorization === "string") {

            // Prepare Authorization
            const authorization = req.headers.authorization.split(' ');

            // Guild ID
            const guildID = req.headers['guild-id'];

            // Type
            const type = authorization[0];

            // Token Data
            const token = authorization[1];

            // Client ID
            const client_id = authorization[2];

            // Check
            if (typeof type === "string" && typeof token === "string" && typeof client_id === "string") {

                const discordApp = new discordSlashCommandsClient({
                    bot_token: token,
                    client_id: client_id
                });

                // Get Command List
                if (req.url === "/getCommands") {

                    // Global
                    if (typeof guildID !== "string") {
                        discordApp.getCommands().then(commands => {
                            res.json({ error: null, data: commands });
                        }).catch(err => {
                            res.json({ error: err, data: null });
                        });
                    }

                    // Guild
                    else {
                        discordApp.getCommands({ guildID: guildID }).then(commands => {
                            res.json({ error: null, data: commands });
                        }).catch(err => {
                            res.json({ error: err, data: null });
                        });
                    }

                }

                // Create Command
                else if (req.url === "/createCommand") {

                    // Global
                    if (typeof guildID !== "string") {
                        discordApp.createCommand(req.body).then(commands => {
                            res.json({ error: null, data: commands });
                        }).catch(err => {
                            res.json({ error: err, data: null });
                        });
                    }

                    // Guild
                    else {
                        discordApp.createCommand(req.body, guildID).then(commands => {
                            res.json({ error: null, data: commands });
                        }).catch(err => {
                            res.json({ error: err, data: null });
                        });
                    }

                }

                // Edit Command
                else if (req.url === "/editCommand") {

                    // Get Command ID
                    const commandID = req.body.id;

                    // Exist
                    if (typeof commandID === "string") {

                        // Global
                        if (typeof guildID !== "string") {
                            discordApp.editCommand(req.body, commandID).then(commands => {
                                res.json({ error: null, data: commands });
                            }).catch(err => {
                                res.json({ error: err, data: null });
                            });
                        }

                        // Guild
                        else {
                            discordApp.editCommand(req.body, commandID, guildID).then(commands => {
                                res.json({ error: null, data: commands });
                            }).catch(err => {
                                res.json({ error: err, data: null });
                            });
                        }

                    }

                    // Nope
                    else { errorPage(res, 404, 'Command ID not found.'); }

                }

                // Delete Command
                else if (req.url === "/deleteCommand") {

                    // Check
                    if (typeof req.body.id === "string") {

                        // Global
                        if (typeof guildID !== "string") {
                            discordApp.deleteCommand(req.body.id).then(commands => {
                                res.json({ error: null, data: commands });
                            }).catch(err => {
                                res.json({ error: err, data: null });
                            });
                        }

                        // Guild
                        else {
                            discordApp.deleteCommand(req.body.id, guildID).then(commands => {
                                res.json({ error: null, data: commands });
                            }).catch(err => {
                                res.json({ error: err, data: null });
                            });
                        }

                    }

                    // Nope
                    else { errorPage(res, 404, 'Command ID not found.'); }

                }

                // Nothing
                else { errorPage(res, 404, 'Not Found.'); }

            }

            // Nope
            else { errorPage(res, 401, 'Unauthorized! Your request needs to be a valid authorization!'); }

        }

        // Nothing
        else { errorPage(res, 401, 'Unauthorized! Your request needs a authorization!'); }

        // Complete
        return;

    });

    // Complete
    return;

};