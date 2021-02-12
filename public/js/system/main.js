dsCommandEditor.system = {

    start: function (type, client_id, token) {

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
    insert: function (type, userID, token, remember) {

        // Remember Data
        if (remember) {
            $.localStorage.set('tokenList', userID, {
                token: token,
                type: type
            });
        }

        // Complete
        return;

    }

};