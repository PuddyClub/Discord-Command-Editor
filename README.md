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
Discord Slash Commands Editor.

<hr/>

## How to use
By entering the website for the first time, you will agree to the terms of use of the application.
Your next step is to get your bot client ID and your bot token to login.
After you log in, you will have to choose where you want to open your command editor: Global commands or Guild commands (Guild is a Discord Server).

To get a guild ID, you need to activate developer mode in your Discord Configuration and right click on the guild icon.
After you choose where you want to use your command editor, you will see a JSON editor.

The JSON shown is the list of commands installed in your bot. Here you will have your complete freedom to edit your command list. Do not forget that the list of commands is always made through an Array, and you will also have buttons to export or import a list of commands.

Your entire list of commands needs to be done using what is being said in official Discord Documentation: https://discord.com/developers/docs/interactions/slash-commands#example-walkthrough

<hr/>

## How to install
```js

// Prepare Express
const express = require('express');
const app = express();

// Prepare Module
const commandEditor = require('@tinypudding/discord-command-editor');

// Start Module
commandEditor(express, app, options, callback);

```

### express (Express Module)
The express Module from require(). If you don't use the callback, this option will be used to use the module's default image folder.

### app (Express App)
The express app made by express().

### options (Object)
Configuration of the website customization.

### callback (Function)
Here you can send more methods to your Express application. Example? It is recommended that you define the static file folder here. 

<hr/>

## Dependent static files
```
/img/error.png
```

<hr/>

## Example
```js

// Prepare Module
const express = require('express');
const app = express();
require('@tinypudding/discord-command-editor')(express, app, {

    // File Cache (You need to install the "moment-timezone" module for this configuration to work.)
    fileMaxAge: 2592000000,

    // Allow the application to check the installed version to warn a new version update on the website's homepage.
    checkVersion: true,

    // Allow the version to be shown on the website's homepage.
    showVersion: true,

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

        // https://github.com/puleos/object-hash/
        'objecthash': '<script src="https://cdn.jsdelivr.net/npm/object-hash@2.1.1/dist/object_hash.min.js" integrity="sha384-Z4R1Xdk1ps4lJkucY9aotf0f7DJWWKyen7Be/G+lodTei33jHgz7I0t76LrtRKai" crossorigin="anonymous"></script>',

        // https://github.com/eligrey/FileSaver.js
        'filesaver': '<script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js" integrity="sha512-Qlv6VSKh1gDKGoJbnyA5RMXYcvnpIqhO++MhIM2fStMcGT9i2T//tSwYFlcyoRRDcDZ+TYHpH8azBBCyhpSeqw==" crossorigin="anonymous"></script>',

        // https://jquery.com
        'jquery': '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js" integrity="sha512-DUC8yqWf7ez3JD1jszxCWSVB0DMP78eOyBpMa5aJki1bIRARykviOuImIczkxlj1KhVSyS16w2FSQetkD4UU2w==" crossorigin="anonymous"></script>',

        // https://getbootstrap.com/docs/4.6/getting-started/introduction/
        'bootstrap': '<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.bundle.min.js" integrity="sha512-wV7Yj1alIZDqZFCUQJy85VN+qvEIly93fIQAN7iqDFCPEucLCeNFz4r35FCo9s6WrpdDQPi80xbljXB8Bjtvcg==" crossorigin="anonymous"></script>',

        // https://github.com/gasparesganga/jquery-loading-overlay
        // https://gasparesganga.com/labs/jquery-loading-overlay/
        'jqueryloadingoverlay': '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-loading-overlay/2.1.7/loadingoverlay.min.js" integrity="sha512-hktawXAt9BdIaDoaO9DlLp6LYhbHMi5A36LcXQeHgVKUH6kJMOQsAtIw2kmQ9RERDpnSTlafajo6USh9JUXckw==" crossorigin="anonymous"></script>',

        // https://github.com/jillix/url.js
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
            
        // https://fontawesome.com/
        'fontawesome': '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==" crossorigin="anonymous"/>',

        // https://getbootstrap.com/docs/4.6/getting-started/introduction/
        'bootstrap': '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css" integrity="sha512-P5MgMn1jBN01asBgU0z60Qk4QxiXo86+wlFahKrsQf37c9cro517WzVSPPV1tDKzhku2iJ2FVgL67wG03SGnNA==" crossorigin="anonymous"/>',

        // https://github.com/josdejong/jsoneditor
        // https://jsoneditoronline.org 
        'jsoneditor': '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/5.28.2/jsoneditor.min.css" integrity="sha512-EBuVURdzGGQq+s6e9pCbguXC9AUnSV+jlW4UWpJ4cgcZmzOLJ9EpirGdooRWyfx0IolJ+Er+D7C9QnfoQVw9+w==" crossorigin="anonymous" />',
    
    }

}, function () {

    // Path
    const path = require('path');

    // Static Files
    app.use(express.static(path.join(__dirname, '/public'), {
        maxAge: '2592000000' // uses milliseconds per docs
    }));

});

// Start Server
app.listen(80);

```