dsCommandEditor.system = {

    // Load Command List
    loadCommandList: function (guildID) {

        // Start Loading
        $.LoadingOverlay("show", { background: "rgba(0,0,0, 0.5)" });

        console.log(dsCommandEditor.root);

        // Finish the Load
        $.LoadingOverlay("hide");

    },

    // Initialize
    initialize: function () {

        // Hide Root
        dsCommandEditor.loginDiv.title.fadeOut(1000);
        dsCommandEditor.loginDiv.container.fadeOut(1500);
        dsCommandEditor.loginDiv.root.fadeOut(500, function () {

            // Exist Root
            if (dsCommandEditor.root) {

                // Choose Option
                eModal.alert({
                    message: $('<span>', {id: 'chooseType'}).text('Choose what type of command list you want to modify. Will you choose Global or a Guild?'),
                    title: `Choose a List"`,
                    buttons: [

                        // Cancel
                        {
                            text: 'Cancel', style: 'info', close: true, click: function () {
                                dsCommandEditor.startMenu();
                            }
                        },

                        // GLobal
                        {
                            text: 'Global', style: 'primary', close: false, click: function () {
                                dsCommandEditor.system.loadCommandList();
                            }
                        },

                        // Guild
                        {
                            text: 'Guild', style: 'secondary', close: false, click: function () {
                                eModal.prompt({
                                    message: 'Type the Guild ID:',
                                    title: `<i class="fab fa-discord"></i> Guild ID"`,
                                }).then(function (guildID) {
                                    dsCommandEditor.system.loadCommandList(guildID);
                                }, function () { dsCommandEditor.startMenu(); });
                            }
                        }

                    ]
                });

            }

            // Nope
            else {
                eModal.alert({ message: 'Could not start the root! The information is incorrect!', title: '<i class="fas fa-exclamation-triangle"></i> Error!' });
                dsCommandEditor.loginDiv.root.fadeIn(500);
            }

        });

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

        // Prepare JSON
        if ($.localStorage.isEmpty('tokenList')) { $.localStorage.set('tokenList', {}); }

        // Insert Data
        if (typeof userID === "string" && userID.length > 0 && typeof token === "string") {
            $.localStorage.set('tokenList', userID, {
                token: token,
                type: type
            });
        }

    }

};