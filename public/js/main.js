$(() => {

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
                $('<div>', {class: 'mb-4'}).append(

                    // Remember
                    divBase.remember,

                    // BR
                    $('<br>'),

                    // Buttons
                    divBase.buttons.oauth2,
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

    // Default Page
    if (typeof queryURL.code !== "string" || typeof queryURL.type !== "string") {

        // Login Animation
        divBase.title.fadeIn(1000);
        divBase.container.fadeIn(1500);

        // Form Login
        divBase.loginForm.submit(function () {

            // Nothing
            return false;

        });

    }

    // Login the Code
    else {



    }

    // Remove Query
    Url.removeQuery(false);

});