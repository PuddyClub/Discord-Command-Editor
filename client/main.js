// Detect Modules loaded
if (

    // Jquery
    $ &&

    // Jquery Storage
    $.alwaysUseJsonInStorage &&

    // Lodash
    _ &&

    // Moment
    moment &&

    // Moment JS
    moment.tz &&

    // EModal
    eModal &&

    // Loading Overlay
    $.LoadingOverlay &&

    // Axios
    axios &&

    // URLJS
    Url &&

    // Bootstrap Modal
    $.fn.modal

) {

    // Set Jquery Plugin
    $.alwaysUseJsonInStorage(true);

    $(() => {

        // Exist Storage
        if ($.localStorage) {

            // Login Template made by dimi130473 (https://bootsnipp.com/snippets/bxzmb)

            // Prepare Error Modal
            dsCommandEditor.errorModalMessage = function (message) {
                return $('<center>').append(

                    // Error Image
                    $('<img>', { src: '/img/error.png', class: 'img-fluid', alt: 'Error Image' }),

                    // Error Message
                    $('<div>').append(message)

                );
             
            };

            // Div Base
            dsCommandEditor.loginDiv = {};

            // Title
            dsCommandEditor.loginDiv.title = $('<h3>', { class: 'title-base text-center text-white pt-5' }).text('Discord Command Editor');

            // Sub Title
            dsCommandEditor.loginDiv.subTitle = $('<h3>', { class: 'text-center text-white' }).text('Login');

            // Bot Token
            dsCommandEditor.loginDiv.client_id = $('<div>', { class: 'form-group' }).append(

                // Label
                $('<label>', { for: 'client_id', class: 'text-white' }).text('Client ID:'),

                // Input
                $('<input>', { type: 'text', name: 'client_id', id: 'client_id', class: 'form-control' })

            );

            // Bot Token
            dsCommandEditor.loginDiv.bottoken = $('<div>', { class: 'form-group' }).append(

                // Label
                $('<label>', { for: 'bottoken', class: 'text-white' }).text('Bot Token:'),

                // Input
                $('<input>', { type: 'password', name: 'bottoken', id: 'bottoken', class: 'form-control' })

            );

            // Buttons
            dsCommandEditor.loginDiv.buttons = {
                tos: $('<input>', { type: 'button', name: 'tos', class: 'btn btn-warning btn-md mr-4' }).val('TOS'),
                tokenList: $('<input>', { type: 'button', name: 'tokenlist', class: 'btn btn-info btn-md ml-4' }).val('Token List'),
                oauth2: $('<input>', { type: 'button', name: 'oauthlogin', class: 'btn btn-secondary btn-md mr-4' }).val('OAuth2 Login')
            };

            // Remember
            dsCommandEditor.loginDiv.remember = $('<label>', { for: 'remember-me', class: 'text-white' }).append(

                // Text
                $('<span>', { class: 'mr-2' }).text('Save Token'),

                // Input
                $('<span>').append(
                    $('<input>', { id: 'remember-me', name: 'remeber-me', type: 'checkbox' })
                )

            );

            // Form
            dsCommandEditor.loginDiv.loginForm = $('<form>', { id: 'login-form', class: 'form' }).append(

                // Sub Title
                dsCommandEditor.loginDiv.subTitle,

                // Client ID
                dsCommandEditor.loginDiv.client_id,

                // Username
                dsCommandEditor.loginDiv.bottoken,

                // Options
                $('<div>', { class: 'form-group' }).append(
                    $('<center>').append(

                        // Div
                        $('<div>', { class: 'mb-4' }).append(

                            // Remember
                            dsCommandEditor.loginDiv.remember,

                            // BR
                            $('<br>'),

                            // Buttons
                            dsCommandEditor.loginDiv.buttons.tos,
                            /* dsCommandEditor.loginDiv.buttons.oauth2, */
                            $('<input>', { type: 'submit', name: 'submit', class: 'btn btn-primary btn-md' }).val('Login'),
                            dsCommandEditor.loginDiv.buttons.tokenList,

                        ),

                        // Privacy Info
                        $('<span>', { class: 'text-white' }).text('All data on this website will be stored in your computer by the Storage API of your navigator. Your data will only be shared with Discord, Inc.\'s official domain. (https://discord.com)')

                    )
                ),

            );

            // Container
            dsCommandEditor.loginDiv.container = $('<div>', { class: 'container' }).append(

                // Row
                $('<div>', { id: 'login-row', class: 'row justify-content-center align-items-center' }).append(

                    // Column
                    $('<div>', { id: 'login-column', class: 'col-md-6' }).append(

                        // Box
                        $('<div>', { id: 'login-box', class: 'col-md-12 mb-5' }).append(

                            // Form
                            dsCommandEditor.loginDiv.loginForm

                        )

                    )

                )

            );

            // Root
            dsCommandEditor.loginDiv.root = $('<div>', { id: 'login' }).append(

                // Title
                dsCommandEditor.loginDiv.title.css('display', 'none'),

                // Container
                dsCommandEditor.loginDiv.container.css('display', 'none')

            );

            // Start Login Form
            $('body').append(dsCommandEditor.loginDiv.root);

            // Get Query
            const queryURL = {
                code: Url.queryString('code'),
                type: Url.queryString('type')
            };

            // Data oAuth
            const scope = 'identify%20guilds%20applications.commands.update%20applications.commands';
            const redirectURL = location.origin + '/?type=commandOauth2';

            // Start Menu
            dsCommandEditor.startMenu = function () {

                // Get TOS Status
                const tosVersionAgreed = Number($.localStorage.get('tosVersionAgreed'));
                if (isNaN(tosVersionAgreed) || !isFinite(tosVersionAgreed) || tosVersionAgreed < 1) {

                    // Set TOS Agreed
                    $.localStorage.set('tosVersionAgreed', 1);
                    dsCommandEditor.tos();

                }

                // Login Animation
                dsCommandEditor.loginDiv.root.fadeIn(1);
                dsCommandEditor.loginDiv.title.fadeIn(1000);
                dsCommandEditor.loginDiv.container.fadeIn(1500);

                // Form Login
                dsCommandEditor.loginDiv.loginForm.submit(function () {

                    // Send Form
                    dsCommandEditor.submitBotToken({
                        remember: $('#remember-me').is(':checked'),
                        token: $('#bottoken').val(),
                        client_id: $('#client_id').val()
                    });

                    // Nothing
                    return false;

                });

                // Token List
                dsCommandEditor.loginDiv.buttons.tokenList.click(dsCommandEditor.tokenList.open);

                // TOS
                dsCommandEditor.loginDiv.buttons.tos.click(dsCommandEditor.tos);

                // Token List
                dsCommandEditor.loginDiv.buttons.oauth2.click(function () {
                    eModal.prompt({
                        message: "Enter your bot\'s client id here:",
                        title: '<i class="fab fa-discord"></i> Bot User ID'
                    }).then(function (botID) {
                        $.LoadingOverlay("show", { background: "rgba(0,0,0, 0.5)" });
                        window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${encodeURIComponent(botID)}&redirect_uri=${encodeURIComponent(redirectURL)}&response_type=code&scope=${scope}`;
                    });
                });


            };

            // Default Page
            if (typeof queryURL.code !== "string" || typeof queryURL.type !== "string") {
                dsCommandEditor.startMenu();
            }

            // Login the Code
            else {

                // Command OAuth2
                if (queryURL.type === "commandOauth2") {

                    // Cancel Operation
                    const cancelOperation = function () {
                        eModal.alert({ message: 'You canceled the operation!', title: '<i class="fas fa-exclamation-triangle"></i> Error!' });
                        dsCommandEditor.startMenu();
                    };

                    // Error Code
                    const errorCode = err => {
                        eModal.alert({ message: err.message, title: `<i class="fas fa-exclamation-triangle"></i> Error ${err.code}!` });
                        dsCommandEditor.startMenu();
                    };

                    // Get Client ID Again
                    eModal.prompt({
                        message: "Enter your bot\'s client id again:",
                        title: '<i class="fab fa-discord"></i> Client Secret'
                    }).then(function (client_id) {

                        // Get Client Secret
                        eModal.prompt({
                            message: "Enter your bot\'s client secret:",
                            title: '<i class="fab fa-discord"></i> Client Secret'
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
                                        dsCommandEditor.oAuth2Code({ type: queryURL.type, data: data, client_secret: client_id, client_id: client_id });
                                    }).catch(errorCode)
                                }).catch(errorCode);

                        }).catch(cancelOperation);

                    }).catch(cancelOperation);

                }

                // Nothing
                else {
                    eModal.alert({ message: 'Invalid Request!', title: '<i class="fas fa-exclamation-triangle"></i> Error!' });
                    dsCommandEditor.startMenu();
                }

            }

            // Remove Query
            Url.removeQuery(false);

        }

        // Nope
        else {
            eModal.alert({
                message: dsCommandEditor.errorModalMessage('Your browser does not support Storage API!'),
                title: '<i class="fas fa-exclamation-triangle"></i> Storage API not found!',
                size: 'lg modal-dialog-centered'
            });
        }

    });

}

// Nope
else { alert(`It was not possible to load all application modules! Try again later. The page is blank, to try again, reload the page.`); }