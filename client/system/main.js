dsCommandEditor.system = {

    // Load Command List
    loadCommandList: function (guildID) {

        // System Config
        const tinyCfg = {};
        if (typeof guildID === "string") { tinyCfg.guildID = guildID; }

        // Load Command List
        dsCommandEditor.root.getCommands(tinyCfg).then(data => {

            console.log(data);

            // Finish the Load
            $.LoadingOverlay("hide");

        })

            // Error
            .catch(err => {

                console.error(err);
                eModal.alert({
                    message: dsCommandEditor.errorModalMessage(err.message),
                    title: '<i class="fas fa-exclamation-triangle"></i> Error!',
                    size: 'lg modal-dialog-centered'
                });

                $.LoadingOverlay("hide");
                dsCommandEditor.startMenu();

            });

    },

    // Initialize
    initialize: function () {

        // Hide Root
        dsCommandEditor.loginDiv.title.fadeOut(1000);
        dsCommandEditor.loginDiv.container.fadeOut(1500);
        dsCommandEditor.loginDiv.root.fadeOut(500, function () {

            // Exist Root
            if (dsCommandEditor.root) {

                // Complete Medal
                const completeModalAction = function () {
                    optionSelected = true;
                    $(document).off('hide.bs.modal', theModal, closeModalAction);
                };

                // Choose Option
                let optionSelected = false;
                const theModal = eModal.alert({
                    message: $('<span>', { id: 'chooseType' }).text('Choose what type of command list you want to modify. Will you choose Global or a Guild?'),
                    title: `Choose a List"`,
                    buttons: [

                        // Cancel
                        { text: 'Cancel', style: 'info', close: true, click: function () { completeModalAction(); dsCommandEditor.startMenu(); } },

                        // GLobal
                        {
                            text: 'Global', style: 'primary', close: false, click: function () {

                                // Start Loading
                                $.LoadingOverlay("show", { background: "rgba(0,0,0, 0.5)" });

                                // Complete
                                completeModalAction();
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

                                    // Start Loading
                                    $.LoadingOverlay("show", { background: "rgba(0,0,0, 0.5)" });

                                    // Start Loading
                                    setTimeout(function () {
                                        completeModalAction();
                                        dsCommandEditor.system.loadCommandList(guildID);
                                    }, 1000);

                                }, function () { completeModalAction(); dsCommandEditor.startMenu(); });
                            }
                        }

                    ]
                }).element;

                // Close Modal Action
                const closeModalAction = function (data) {
                    if (!optionSelected) { dsCommandEditor.startMenu(); }
                    completeModalAction();
                };

                $(document).on('hide.bs.modal', theModal, closeModalAction);

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