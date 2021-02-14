<div align="center">
<p>
    <a href="https://discord.gg/TgHdvJd"><img src="https://img.shields.io/discord/413193536188579841?color=7289da&logo=discord&logoColor=white" alt="Discord server" /></a>
    <a href="https://www.npmjs.com/package/@tinypudding/discord-command-editor"><img src="https://img.shields.io/npm/v/@tinypudding/discord-command-editor.svg?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/@tinypudding/discord-command-editor"><img src="https://img.shields.io/npm/dt/@tinypudding/discord-command-editor.svg?maxAge=3600" alt="NPM downloads" /></a>
    <a href="https://www.patreon.com/JasminDreasond"><img src="https://img.shields.io/badge/donate-patreon-F96854.svg" alt="Patreon" /></a>
</p>
<p>
    <a href="https://nodei.co/npm/@tinypudding/discord-command-editor/"><img src="https://nodei.co/npm/@tinypudding/discord-command-editor.png?downloads=true&stars=true" alt="npm installnfo" /></a>
</p>
</div>

# Discord-Command-Editor
Discord Bot Command List Editor.

## How to install

```js

// Prepare Module
const express = require('express');
const app = express();
require('@tinypudding/discord-command-editor')(app, {

    // JS
    js: {

        // https://jquery.com
        'jquery': '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js" integrity="sha512-DUC8yqWf7ez3JD1jszxCWSVB0DMP78eOyBpMa5aJki1bIRARykviOuImIczkxlj1KhVSyS16w2FSQetkD4UU2w==" crossorigin="anonymous"></script>',

        // https://getbootstrap.com/docs/4.6/getting-started/introduction/
        'bootstrap': '<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.bundle.min.js" integrity="sha512-wV7Yj1alIZDqZFCUQJy85VN+qvEIly93fIQAN7iqDFCPEucLCeNFz4r35FCo9s6WrpdDQPi80xbljXB8Bjtvcg==" crossorigin="anonymous"></script>',

        // https://github.com/gasparesganga/jquery-loading-overlay
        // https://gasparesganga.com/labs/jquery-loading-overlay/
        'jqueryloadingoverlay': '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-loading-overlay/2.1.7/loadingoverlay.min.js" integrity="sha512-hktawXAt9BdIaDoaO9DlLp6LYhbHMi5A36LcXQeHgVKUH6kJMOQsAtIw2kmQ9RERDpnSTlafajo6USh9JUXckw==" crossorigin="anonymous"></script>',

        // https://github.com/jillix/url.js?utm_source=cdnjs&utm_medium=cdnjs_link&utm_campaign=cdnjs_library
        // http://jillix.github.io/url.js/
        'urljs': '<script src="https://cdnjs.cloudflare.com/ajax/libs/urljs/2.5.0/url.min.js" integrity="sha512-quDzRasixBjD7wB9uvc/ApSn9ShS9ERqFrGR214jf0FUjomXQ7wtSxq0w2LZAvHKCC6myJNamVQBKt4tSeNEJQ==" crossorigin="anonymous"></script>',
        
        // https://github.com/saribe/eModal
        // https://saribe.github.io/eModal/
        'emodal': '<script src="https://cdnjs.cloudflare.com/ajax/libs/eModal/1.2.69/eModal.min.js" integrity="sha512-OO21WN3HthMwsteuxEKk1SNo7XYJedW7Nyy0BO98nCYLRU57jP7seInkztBrs7Ub236jqe18Gw2/x4AbNsJ2/w==" crossorigin="anonymous"></script>',
        
        // https://github.com/julien-maurel/jQuery-Storage-API
        'jquerystorageapi': '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-storage-api/1.9.4/jquery.storageapi.min.js" integrity="sha512-rZXftKfJtDmBFPfxFYFjwGM3QadaGJCrOpdaOh3JPkk2wJXSghhUa7bn9CCn7R/UPW29aMuWY0JDnbZEiUYxgQ==" crossorigin="anonymous"></script>',

        // https://github.com/josdejong/jsoneditor
        // https://jsoneditoronline.org
        'jsoneditor': '<script src="https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/5.28.2/jsoneditor.min.js" integrity="sha512-bfsUyGahu9QXboUnOAGfGubz8AMLY10PIavnh2q7lc/M5HhR3NOXYqFVTCMS9TcfZqQihbiibdVTtC3woU7gmQ==" crossorigin="anonymous"></script>',

        // https://github.com/pvorb/clone
        'clone': '<script src="https://cdnjs.cloudflare.com/ajax/libs/clone/1.0.4/clone.min.js" integrity="sha512-DnAb1jKHBEwQiL3WNROTHx15qqHPjb5APGfUFopcXO4gjk4T/vGNwLbffnfwFYfle/cCQ1x/fi5u5qsJmKrPAA==" crossorigin="anonymous"></script>',
    
    },

    // CSS
    css: {

            // Module CSS
            'index': '<link rel="stylesheet" href="/css/defaultDSE.css" />',
            
            'fontawesome': '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==" crossorigin="anonymous"/>',
            'bootstrap': '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css" integrity="sha512-P5MgMn1jBN01asBgU0z60Qk4QxiXo86+wlFahKrsQf37c9cro517WzVSPPV1tDKzhku2iJ2FVgL67wG03SGnNA==" crossorigin="anonymous"/>',
            'jsoneditor': '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/5.28.2/jsoneditor.min.css" integrity="sha512-EBuVURdzGGQq+s6e9pCbguXC9AUnSV+jlW4UWpJ4cgcZmzOLJ9EpirGdooRWyfx0IolJ+Er+D7C9QnfoQVw9+w==" crossorigin="anonymous" />',
    
    }

});

// Path
const path = require('path');

// Static Files
app.use(express.static(path.join(__dirname, '/public'), {
    maxAge: '2592000000' // uses milliseconds per docs
}));

// Start Server
app.listen(80);

```