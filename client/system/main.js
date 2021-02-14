dsCommandEditor.system = {

    // Fetch
    fetch: function (url, method, body) {
        return new Promise(function (resolve, reject) {

            // Options
            const fetchOptions = {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                headers: {
                    'Authorization': `Bot ${dsCommandEditor.root.bot_token}`,
                    'Content-Type': 'application/json'
                }
            };

            // Exist Body
            if (body) {
                body.client_id = dsCommandEditor.root.client_id;
                fetchOptions.body = JSON.stringify(body);
            }

            // Fetch Function
            fetch('/' + url, fetchOptions).then(response => {
                response.json().then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                });
            }).catch(err => {
                reject(err);
            });

        });
    },

    // Save Command List
    saveCommandList: function (newCommands, oldCommands) {

        console.log(oldCommands, newCommands);

    },

    // Load Command List
    loadCommandList: function (guildID) {

        // Cancel COmmand List
        const cancelCommandList = function (err) {
            $.LoadingOverlay("hide");
            eModal.alert({ message: err.message, title: `<i class="fas fa-exclamation-triangle"></i> Error ${err.code}!` });
            dsCommandEditor.startMenu();
        };

        // System Config
        let fetchConfig = {};
        if (typeof guildID === "string") { fetchConfig.guildID = guildID; }

        // Load Command List
        dsCommandEditor.system.fetch("getCommands", 'POST', fetchConfig).then(commands => {

            // Worked
            if (!commands.error) {

                // create JSON DIV
                dsCommandEditor.system.div = $('<div>', { id: 'jsoneditor' });
                $('body').append(dsCommandEditor.system.div);

                // Start JSON
                const options = {};
                const editor = new JSONEditor(document.getElementById("jsoneditor"), options);

                // Set Commands
                editor.set(clone(commands.data));

                // Add Buttons
                $('#jsoneditor .jsoneditor-menu').append(

                    // Save
                    $('<button>', { title: 'Save Command List', class: 'jsoneditor-custom-item' }).append('<i class="fas fa-save"></i>').click(function () {
                        dsCommandEditor.system.saveCommandList(editor.get(), commands.data);
                        $(this).blur();
                    }),

                    // Import
                    $('<button>', { title: 'Import Command List', class: 'jsoneditor-custom-item' }).append('<i class="fas fa-upload"></i>').click(function () {

                        $(this).blur();
                    }),

                    // Export
                    $('<button>', { title: 'Export Command List', class: 'jsoneditor-custom-item' }).append('<i class="fas fa-download"></i>').click(function () {
                        console.log();
                        saveAs(new Blob(JSON.stringify(editor.get(), null, 2), { type: "text/plain;charset=utf-8" }), `discord_slash_commands_${dsCommandEditor.root.client_id}.json`);
                        $(this).blur();
                    })

                );

                // Complete
                $.LoadingOverlay("hide");

            }

            // Nope
            else { cancelCommandList(commands.error); }

        }).catch(err => {
            cancelCommandList(err);
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
                            text: 'Global', style: 'primary', close: true, click: function () {

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

                                // Turn Off
                                completeModalAction();

                                eModal.prompt({
                                    message: 'Type the Guild ID:',
                                    title: `<i class="fab fa-discord"></i> Guild ID"`,
                                }).then(function (guildID) {

                                    // Start Loading
                                    $.LoadingOverlay("show", { background: "rgba(0,0,0, 0.5)" });

                                    // Start Loading
                                    setTimeout(function () {
                                        dsCommandEditor.system.loadCommandList(guildID);
                                    }, 1000);

                                }, function () { dsCommandEditor.startMenu(); });
                            }
                        }

                    ]
                }).element;

                // Close Modal Action
                const closeModalAction = function () {
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
            dsCommandEditor.root = prepareStart;

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