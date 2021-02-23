dsCommandEditor.system = {

    // Load Command List
    loadCommandList: function (guildID) {

        // Set Page Title
        if (typeof dsCommandEditor.appName === "string") { document.title = 'DCE - ' + dsCommandEditor.appName; }
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

                // Clean Item
                dsCommandEditor.system.cleanCommand = function (newCommand) {

                    for (const item in newCommand) {
                        if (item !== "name" && item !== "description" && item !== "options") {
                            delete newCommand[item];
                        }
                    }

                    // Complete
                    return newCommand;

                };

                // Updater Checker
                dsCommandEditor.system.updateChecker = function (newCommand, oldCommands) {

                    // Check New Command
                    if (objType(newCommand, 'object')) {

                        // Set Editor Type to Create
                        let editorType = 1;

                        // Exist OLD Commands
                        if ((typeof newCommand.id === "string" || typeof newCommand.id === "number") && Array.isArray(oldCommands)) {

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
                let oldCommands = null;
                dsCommandEditor.system.editor = new JSONEditor(document.getElementById("jsoneditor"), {

                    // On Change
                    onEvent: function () {

                        // Get JSON
                        const newCommands = dsCommandEditor.system.editor.get();

                        // Exist OLD
                        let valueChanched = false;
                        if (oldCommands && Array.isArray(newCommands)) {
                            const ids = [];
                            for (const item in newCommands) {
                                if (typeof newCommands[item].id === "string" || typeof newCommands[item].id === "number") {

                                    // ID
                                    const id = String(newCommands[item].id);

                                    // Exist ID
                                    if (ids.indexOf(id) > -1) {
                                        valueChanched = true;
                                        dsCommandEditor.system.cleanCommand(newCommands[item]);
                                    }

                                    // Nope
                                    else { ids.push(id); }

                                }
                            }
                        }

                        // Value Changed
                        if (valueChanched) {
                            dsCommandEditor.system.editor.update(newCommands);
                        }

                        // Update OLD Commands
                        oldCommands = clone(newCommands);

                        // Complete
                        return;

                    }

                });

                // Set Commands
                oldCommands = clone(commands.data);
                dsCommandEditor.system.oldCommands = commands.data;
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
                        dsCommandEditor.system.saveCommandList(dsCommandEditor.system.editor.get(), guildID);
                        $(this).blur();
                    }),

                    $('<button>', { title: 'Reset Command List', class: 'jsoneditor-custom-item' }).append('<i class="fas fa-trash"></i>').click(function () {

                        // Run For Promise
                        forPromise({ data: dsCommandEditor.system.oldCommands }, function (index, fn, fn_error) {

                            dsCommandEditor.system.fetch("deleteCommand", { id: dsCommandEditor.system.oldCommands[index].id }, guildID).then(() => {
                                fn();
                                return;
                            }).catch(err => {
                                console.error(err);
                                fn_error(err);
                                return;
                            });

                        })
                        
                        // Complete
                        .then(() => {
                            


                        })
                        
                        // Error
                        .catch(err => {



                        });

                        // Button
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

                    }),

                    // Export
                    $('<button>', { title: 'New Command', class: 'jsoneditor-custom-item' }).append('<i class="fas fa-plus-circle"></i>').click(function () {

                        // Add New Command
                        const newCommands = dsCommandEditor.system.editor.get();
                        newCommands.push({ name: 'example', description: 'Tiny Example here.' });

                        // Updaste
                        dsCommandEditor.system.editor.update(newCommands);
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
                    message: $('<div>', { id: 'chooseType', class: 'm-4' }).text('Choose what type of command list you want to modify. Will you choose Global or a Guild?'),
                    title: `Choose a List`,
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
                                    title: `<i class="fab fa-discord"></i> Guild ID`,
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
    startRoot: function (type, client_id, token, itemName) {

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

            // App Name
            if (typeof itemName === "string") { dsCommandEditor.appName = itemName; }

        }

        // Nope
        else {
            dsCommandEditor.root = null;
            if (typeof dsCommandEditor.appName === "string") { delete dsCommandEditor.appName; }
        }

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