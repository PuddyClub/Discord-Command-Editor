$(() => {

    // Load Login Base
    // Template made by dimi130473 (https://bootsnipp.com/snippets/bxzmb)
    const loginBase = $('<div>', { id: 'login' }).append(

        // Title
        $('<h3>', { class: 'text-center text-white pt-5' }).text('Discord App Login'),

        // Container
        $('<div>', { class: 'container' }).append(

            // Row
            $('<div>', { id: 'login-row', class: 'row justify-content-center align-items-center' }).append(

                // Column
                $('<div>', { id: 'login-column', class: 'col-md-6' }).append(

                    // Box
                    $('<div>', { id: 'login-box', class: 'col-md-12' }).append(

                        // Form
                        $('<form>', { id: 'login-form', class: 'form' }).append(

                            // Sub Title
                            $('<h3>', { class: 'text-center text-info' }).text('Login'),

                            // Username
                            $('<div>', { class: 'form-group' }).append(

                                // Label
                                $('<label>', { for: 'username', class: 'text-info' }).text('Username:'),

                                // Input
                                $('<input>', { type: 'text', name: 'username', id: 'username', class: 'form-control' })

                            ),

                            // Password
                            $('<div>', { class: 'form-group' }).append(

                                // Label
                                $('<label>', { for: 'password', class: 'text-info' }).text('Password:'),

                                // Input
                                $('<input>', { type: 'password', name: 'password', id: 'password', class: 'form-control' })

                            ),

                            // Remember Me
                            $('<div>', { class: 'form-group' }).append(

                                // Label
                                $('<label>', { for: 'remember-me', class: 'text-info' }).append(

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

                            ),

                            // Register
                            $('<div>', { id: 'register-link', class: 'text-right' }).append(
                                $('<a>', { href: '#', class: 'text-info' }).text('Register here')
                            )

                        )

                    )

                )

            )

        )

    );

    // Start Login Form
    $('body').append(loginBase);
    $.LoadingOverlay("hide");

});