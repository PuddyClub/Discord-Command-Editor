$(() => {

    // Exist Storage
    if (typeof (Storage) !== "undefined") {

        // Template made by dimi130473 (https://bootsnipp.com/snippets/bxzmb)

        // Div Base
        const divBase = {};

        // Title
        divBase.title = $('<h3>', { class: 'title-base text-center text-white pt-5' }).text('Discord Command Editor');

        // Sub Title
        divBase.subTitle = $('<h3>', { class: 'text-center text-white' }).text('Login');

        // Bot Token
        divBase.bottoken = $('<div>', { class: 'form-group' }).append(

            // Label
            $('<label>', { for: 'bottoken', class: 'text-white' }).text('Bot Token:'),

            // Input
            $('<input>', { type: 'text', name: 'bottoken', id: 'bottoken', class: 'form-control' })

        );

        // Buttons
        divBase.buttons = {
            tokenList: $('<input>', { type: 'button', name: 'submit', class: 'btn btn-info btn-md ml-4' }).val('Token List'),
            oauth2: $('<input>', { type: 'button', name: 'submit', class: 'btn btn-secondary btn-md mr-4' }).val('OAuth2 Login')
        };

        // Remember
        divBase.remember = $('<label>', { for: 'remember-me', class: 'text-white' }).append(

            // Text
            $('<span>', { class: 'mr-2' }).text('Save Token'),

            // Input
            $('<span>').append(
                $('<input>', { id: 'remember-me', name: 'remeber-me', type: 'checkbox' })
            )

        );

        // Form
        divBase.loginForm = $('<form>', { id: 'login-form', class: 'form' }).append(

            // Sub Title
            divBase.subTitle,

            // Username
            divBase.bottoken,

            // Options
            $('<div>', { class: 'form-group' }).append(
                $('<center>').append(

                    // Div
                    $('<div>', { class: 'mb-4' }).append(

                        // Remember
                        divBase.remember,

                        // BR
                        $('<br>'),

                        // Buttons
                        /* divBase.buttons.oauth2, */
                        $('<input>', { type: 'submit', name: 'submit', class: 'btn btn-primary btn-md' }).val('Login'),
                        divBase.buttons.tokenList,

                    ),

                    // Privacy Info
                    $('<span>', { class: 'text-white' }).text('All data on this website will be stored in your computer. Your data will only be shared with Discord, Inc.\'s official domain. (https://discord.com)')

                )
            ),

        );

        // Container
        divBase.container = $('<div>', { class: 'container' }).append(

            // Row
            $('<div>', { id: 'login-row', class: 'row justify-content-center align-items-center' }).append(

                // Column
                $('<div>', { id: 'login-column', class: 'col-md-6' }).append(

                    // Box
                    $('<div>', { id: 'login-box', class: 'col-md-12 mb-5' }).append(

                        // Form
                        divBase.loginForm

                    )

                )

            )

        );

        // Root
        divBase.root = $('<div>', { id: 'login' }).append(

            // Title
            divBase.title.css('display', 'none'),

            // Container
            divBase.container.css('display', 'none')

        );

        // Start Login Form
        $('body').append(divBase.root);
        /* $.LoadingOverlay("hide");
        $.LoadingOverlay("show", {background: "rgba(0,0,0, 0.5)"}); */

        // Get Query
        const queryURL = {
            code: Url.queryString('code'),
            type: Url.queryString('type')
        };

        // Data oAuth
        const scope = 'identify%20guilds%20applications.commands.update%20applications.commands';
        const redirectURL = location.origin + '/?type=commandOauth2';

        // Start Menu
        const startMenu = function () {

            // Login Animation
            divBase.title.fadeIn(1000);
            divBase.container.fadeIn(1500);

            // Form Login
            divBase.loginForm.submit(function () {

                // Send Form
                dsCommandEditor.submitBotToken({
                    remember: $('#remember-me').is(':checked'),
                    token: $('#bottoken').val()
                });

                // Nothing
                return false;

            });

            // Token List
            divBase.buttons.tokenList.click(dsCommandEditor.tokenList.open);

            // Token List
            divBase.buttons.oauth2.click(function () {
                eModal.prompt({
                    message: "Enter your bot\'s client id here:",
                    title: 'Bot User ID'
                }).then(function (botID) {
                    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${encodeURIComponent(botID)}&redirect_uri=${encodeURIComponent(redirectURL)}&response_type=code&scope=${scope}`;
                });
            });

        };

        // Default Page
        if (typeof queryURL.code !== "string" || typeof queryURL.type !== "string") {
            startMenu();
        }

        // Login the Code
        else {

            // Command OAuth2
            if (queryURL.type === "commandOauth2") {

                eModal.prompt({
                    message: "Enter your bot\'s client id again:",
                    title: 'Client Secret'
                }).then(function (client_id) {
                    eModal.prompt({
                        message: "Enter your bot\'s client secret:",
                        title: 'Client Secret'
                    }).then(function (client_secret) {

                        // Loading Data
                        fetch(`https://discord.com/api/oauth2/token`, {
                            method: "POST",
                            body: new URLSearchParams({
                                "client_id": client_id,
                                "client_secret": client_secret,
                                "grant_type": 'authorization_code',
                                "code": queryURL.code,
                                "redirect_uri": redirectURL,
                                "scope": decodeURIComponent(scope)
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        })
                            .then(function (response) {
                                response.json().then(data => {
                                    dsCommandEditor.oAuth2Code({ type: queryURL.type, data: data });
                                })
                            });

                    });
                });

            }

            // Nothing
            else {
                eModal.alert({ message: 'Invalid Request! ', title: 'Error!' });
                startMenu();
            }

        }

        // Remove Query
        Url.removeQuery(false);

    }

    // Nope
    else {

        eModal.alert({
            message: $('<center>').append(

                // Error Image
                $('<img>', { src: '/img/error.png', class: 'img-fluid', alt: 'Error Image' }),

                // Error Message
                $('<div>').text('Your browser does not support Storage API!')

            ),
            title: 'Storage API not found!',
            size: 'lg modal-dialog-centered'
        });

    }

});