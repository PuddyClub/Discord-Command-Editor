dsCommandEditor.system = {

    // Load Command List
    loadCommandList: function (guildID) {

        // Set Page Title
        document.title += ' - ' + dsCommandEditor.root.client_id;
        if (typeof guildID === "string") { document.title += ' - ' + guildID; }

        // Cancel COmmand List
        const cancelCommandList = function (err) {
            $.LoadingOverlay("hide");
            eModal.alert({
                message: dsCommandEditor.errorModalMessage(err.message),
                title: `<i class="fas fa-exclamation-triangle"></i> Error ${err.code}!`,
                size: 'lg modal-dialog-centered'
            });
            dsCommandEditor.startMenu();
        };

        // Load Command List
        dsCommandEditor.system.fetch("getCommands", null, guildID).then(commands => {

            // Worked
            if (!commands.error) {

                // Updater Checker
                dsCommandEditor.system.updateChecker = function (newCommands, cdex, oldCommands) {

                    // Exist New Commands
                    if (Array.isArray(newCommands)) {

                        // Set Editor Type to Create
                        let editorType = 1;

                        // Exist OLD Commands
                        if (Array.isArray(oldCommands) && (typeof cdex === "string" || typeof cdex === "number")) {

                            // New Command
                            const newCommand = newCommands[cdex];

                            // OLD Command
                            let oldCommand;
                            try {
                                oldCommand = oldCommands.find(command => command.id === newCommand.id);
                            } catch (err) {
                                oldCommand = null;
                            }

                            // Exist OLD Command
                            if (oldCommand) {

                                // Set Editor Type to Edit
                                if (objectHash.sha1(newCommand) !== objectHash.sha1(oldCommand)) {
                                    editorType = 2;
                                }

                                // Set Editor Type to Nothing
                                else { editorType = 0; }

                            }

                        }

                        // Result
                        return editorType;

                    }

                    // Nope
                    else { return 0; }

                };

                // create JSON DIV
                dsCommandEditor.system.div = $('<div>', { id: 'jsoneditor' });
                $('body').append(dsCommandEditor.system.div);

                // Start JSON
                dsCommandEditor.system.editor = new JSONEditor(document.getElementById("jsoneditor"), {

                    // On Change
                    onChangeJSON: function (json) {

                        // Type
                        dsCommandEditor.system.updateChecker
                        console.log(json);
                    }

                });

                // Set Commands
                dsCommandEditor.system.editor.set(clone(commands.data));
                dsCommandEditor.system.editor.expandAll();

                // Add Buttons
                $('#jsoneditor .jsoneditor-menu').prepend(

                    // Title
                    $('<button>', { class: 'jsoneditor-custom-item jsoneditor-title-item-list' }).text('Discord Command Editor').click(function () {
                        open('https://github.com/TinyPudding/Discord-Command-Editor', '_blank');
                        $(this).blur();
                    })

                ).append(

                    // Save
                    $('<button>', { title: 'Save Command List', class: 'jsoneditor-custom-item' }).append('<i class="fas fa-save"></i>').click(function () {
                        dsCommandEditor.system.saveCommandList(dsCommandEditor.system.editor.get(), commands.data, guildID);
                        $(this).blur();
                    }),

                    // Import
                    $('<input>', { class: 'd-none', id: 'import-command-file', type: 'file', accept: 'application/JSON' }).change(function () {

                        // File Input
                        const fileInput = $(this);

                        // Nothing Files
                        if (!this.files) {
                            eModal.alert({
                                message: dsCommandEditor.errorModalMessage("This browser doesn't seem to support the `files` property of file inputs."),
                                title: '<i class="fas fa-exclamation-triangle"></i> File was not loaded correctly!',
                                size: 'lg modal-dialog-centered'
                            });
                            fileInput.val('');
                        }

                        // No FIle
                        else if (!this.files[0]) {
                            eModal.alert({
                                message: dsCommandEditor.errorModalMessage("Please select a file before clicking 'Load'!"),
                                title: '<i class="fas fa-exclamation-triangle"></i> File was not loaded correctly!',
                                size: 'lg modal-dialog-centered'
                            });
                            fileInput.val('');
                        }

                        // Okay
                        else {

                            // Prepare File Reader
                            const fr = new FileReader();

                            // On Load
                            fr.onload = function () {

                                // Error!
                                try {

                                    // Prepare New Commands
                                    const newCommands = JSON.parse(fr.result);

                                    // Result
                                    if (Array.isArray(newCommands)) { dsCommandEditor.system.editor.set(newCommands); }

                                    // Nope
                                    else {
                                        eModal.alert({
                                            message: dsCommandEditor.errorModalMessage('Command list files should always start as an Array!'),
                                            title: '<i class="fas fa-exclamation-triangle"></i> File was not loaded correctly!',
                                            size: 'lg modal-dialog-centered'
                                        });
                                    }

                                }

                                // Error
                                catch (err) {
                                    eModal.alert({
                                        message: dsCommandEditor.errorModalMessage(err.message),
                                        title: '<i class="fas fa-exclamation-triangle"></i> File was not loaded correctly!',
                                        size: 'lg modal-dialog-centered'
                                    });
                                }

                                // Reset Input
                                fileInput.val('');

                            };

                            fr.onerror = function (err) {

                                // Error Message
                                eModal.alert({
                                    message: dsCommandEditor.errorModalMessage(err.message),
                                    title: '<i class="fas fa-exclamation-triangle"></i> File was not loaded correctly!',
                                    size: 'lg modal-dialog-centered'
                                });

                                // Reset Input
                                fileInput.val('');

                            };

                            // Read File
                            fr.readAsText(this.files[0]);

                        }

                    }),
                    $('<button>', { title: 'Import Command List', class: 'jsoneditor-custom-item' }).append('<i class="fas fa-upload"></i>').click(function () {
                        $('#import-command-file').trigger('click'); $(this).blur();
                    }),

                    // Export
                    $('<button>', { title: 'Export Command List', class: 'jsoneditor-custom-item' }).append('<i class="fas fa-download"></i>').click(function () {

                        // File Name
                        let filename = `discord_slash_commands_${dsCommandEditor.root.client_id}`;
                        if (typeof guildID === "string") { filename += `_${guildID}`; }

                        // Save File
                        saveAs(new Blob([JSON.stringify(dsCommandEditor.system.editor.get(), null, 2)], { type: "text/plain;charset=utf-8" }), filename + '.json');
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

                eModal.alert({
                    message: dsCommandEditor.errorModalMessage('Could not start the root! The information is incorrect!'),
                    title: '<i class="fas fa-exclamation-triangle"></i> Error!',
                    size: 'lg modal-dialog-centered'
                });

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