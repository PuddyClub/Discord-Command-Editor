dsCommandEditor.system = {

    start: function (client_id, type, token) {

        // Validator
        if (typeof client_id === "string") {

            // Prepare Start
            let prepareStart = {};

            // From Storage
            if (typeof type !== "string" || typeof token !== "string") {

                // Load from Cache
                const client_data = $.localStorage.get('tokenList', client_id);
                prepareStart[client_data.type] = client_data.token;

            }

            // Manual
            else if (typeof type === "string" && typeof token === "string") {

                // Bot Token
                if (type === "bot_token") {
                    prepareStart[type] = token;
                }

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