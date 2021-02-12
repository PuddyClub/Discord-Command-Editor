dsCommandEditor.system = {

    // Initialize
    initialize: function () {

        // Exist Root
        if (dsCommandEditor.root) {

            /* Start the Root here */
            console.log(dsCommandEditor.root);

        }

        // Nope
        else {
            eModal.alert({ message: 'Could not start the root! The information is incorrect!', title: '<i class="fas fa-exclamation-triangle"></i> Error!' });
        }

    },

    // Start Root
    startRoot: function (type, client_id, token) {

        // Validator
        if (typeof client_id === "string") {

            // Prepare Start
            let prepareStart = {};

            // Bot Token
            if (typeof type === "string" && type === "bot_token" && typeof token === "string") {
                prepareStart[type] = token;
            }

            // Client ID
            prepareStart.client_id = client_id;

            // Prepare Root
            dsCommandEditor.root = new InteractionsClient(prepareStart);

        }

        // Nope
        else { dsCommandEditor.root = null; }

    },

    // Load Data
    insertTokenData: function (type, userID, token) {

        // Remember Data
        if (typeof userID === "string" && userID.length > 0 && typeof token === "string") {
            $.localStorage.set('tokenList', userID, {
                token: token,
                type: type
            });
        }

    }

};