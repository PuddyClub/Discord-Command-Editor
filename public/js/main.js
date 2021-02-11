$(() => {

    // Template made by dimi130473 (https://bootsnipp.com/snippets/bxzmb)

    // Div Base
    const divBase = {};

    // Title
    divBase.title = $('<h3>', { class: 'title-base text-center text-white pt-5' }).text('Discord Command Editor');

    // Sub Title
    divBase.subTitle = $('<h3>', { class: 'text-center text-white' }).text('Login');

    // Username
    divBase.username = $('<div>', { class: 'form-group' }).append(

        // Label
        $('<label>', { for: 'username', class: 'text-white' }).text('Username:'),

        // Input
        $('<input>', { type: 'text', name: 'username', id: 'username', class: 'form-control' })

    );

    // Password
    divBase.password = $('<div>', { class: 'form-group' }).append(

        // Label
        $('<label>', { for: 'password', class: 'text-white' }).text('Password:'),

        // Input
        $('<input>', { type: 'password', name: 'password', id: 'password', class: 'form-control' })

    );

    // Remember
    divBase.remember = $('<div>', { class: 'form-group' }).append(

        // Label
        $('<label>', { for: 'remember-me', class: 'text-white' }).append(

            // Text
            $('<span>', { class: 'mr-2' }).text('Remember me'),

            // Input
            $('<span>').append(
                $('<input>', { id: 'remember-me', name: 'remeber-me', type: 'checkbox' })
            )

        ),

        // BR
        $('<br>'),

        // Submit
        $('<input>', { type: 'submit', name: 'submit', class: 'btn btn-info btn-md' }).val('Submit')

    );

    // Register
    divBase.register = $('<div>', { id: 'register-link', class: 'text-right' }).append(
        $('<a>', { href: '#', class: 'text-white' }).text('Register here')
    );

    // Form
    divBase.loginForm = $('<form>', { id: 'login-form', class: 'form' }).append(

        // Sub Title
        divBase.subTitle,

        // Username
        divBase.username,

        // Password
        divBase.password,

        // Remember Me
        divBase.remember,

        // Register
        divBase.register

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