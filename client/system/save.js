dsCommandEditor.system.saveCommandList = function (newCommands, oldCommands, guildID) {

    // Start Loading
    $.LoadingOverlay("show", { background: "rgba(0,0,0, 0.5)" });

    // Is Array
    if (Array.isArray(newCommands)) {

        // Delte Commands Script
        const deleteCommandsScript = function (dontDelete, fn, fn_error, extra) {

            // Run Delete Commands
            const deleteCommands = extra({ data: oldCommands });
            deleteCommands.run(function (index, fn) {

                // Check If can delete
                let canDelete = true;
                if (Array.isArray(dontDelete) && dontDelete.length > 0) {
                    if (dontDelete.find(command => command.id === oldCommands[index].id)) {
                        canDelete = false;
                    }
                }

                // Delete
                if (canDelete) {

                    // Logger Info
                    console.log(`OLD command deleted from the app ${dsCommandEditor.root.client_id}!`, oldCommands[index]);

                    // Global
                    if (typeof guildID !== "string") {
                        fn();
                        /* client.deleteCommand(oldCommands[index].id).then(() => {
                            fn();
                            return;
                        }).catch(err => {
                            fn();
                            return;
                        }); */
                    }

                    // Guild
                    else {
                        fn();
                        /* client.deleteCommand(oldCommands[index].id, guildID).then(() => {
                            fn();
                            return;
                        }).catch(err => {
                            fn();
                            return;
                        }); */
                    }

                }

                // Nope
                else { fn(); }

                // Complete
                return;

            });

            // Complete
            fn();
            return;

        };

        // Check New Commands
        const dontDelete = [];
        const newCommandsCount = newCommands.length - 1;
        forPromise({ data: newCommands }, function (cdex, fn, fn_error, extra) {

            // Execute Clear
            const executeClear = function () {

                // Delete Item
                dontDelete.push(newCommand);

                // Script
                if (cdex >= newCommandsCount) {
                    deleteCommandsScript(dontDelete, fn, fn_error, extra);
                }

                // Complete
                fn();
                return;

            };

            // Set Editor Type to Create
            let editorType = 1;

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

            // To do something
            if (editorType > 0) {

                // Final Result
                const final_result = {
                    then: result => {
                        executeClear();
                        return;
                    },
                    catch: err => {
                        console.error(err);
                        executeClear();
                        return;
                    }
                };

                // Create
                if (editorType === 1) {

                    // console Info
                    console.log(`New command added to the app ${dsCommandEditor.root.client_id}!`, newCommand);

                    // Global
                    if (typeof guildID !== "string" && typeof guildID !== "number") {
                        executeClear();
                        //client.createCommand(newCommand).then(final_result.then).catch(final_result.catch);
                    }

                    // Guild
                    else {
                        executeClear();
                        //client.createCommand(newCommand, guildID).then(final_result.then).catch(final_result.catch);
                    }

                }

                // Edit
                else if (editorType === 2) {

                    // console Info
                    console.log(`New command edited to the app ${dsCommandEditor.root.client_id}!`, newCommand);

                    // Global
                    if (typeof guildID !== "string" && typeof guildID !== "number") {
                        if (typeof commandID === "string") {
                            executeClear();
                            //client.editCommand(newCommand, commandID).then(final_result.then).catch(final_result.catch);
                        } else {
                            executeClear();
                            //client.createCommand(newCommand).then(final_result.then).catch(final_result.catch);
                        }
                    }

                    // Guild
                    else {
                        if (typeof commandID === "string") {
                            executeClear();
                            //client.editCommand(newCommand, commandID, guildID).then(final_result.then).catch(final_result.catch);
                        } else {
                            executeClear();
                            //client.createCommand(newCommand, guildID).then(final_result.then).catch(final_result.catch);
                        }
                    }

                }

            }

            // Nope
            else { executeClear(); }

            // Complete
            return;

        })

            // Complete
            .then(() => {

                // Get New Command List
                dsCommandEditor.system.fetch("getCommands", null, guildID).then(commands => {

                    // Success
                    if (!commands.error) {
                        dsCommandEditor.system.editor.set(commands.data);
                        eModal.alert({
                            message: 'Your command list has been successfully saved!',
                            title: '<i class="fas fa-check"></i> Success!',
                            size: 'lg modal-dialog-centered'
                        });
                    }

                    // Nope
                    else {
                        eModal.alert({
                            message: dsCommandEditor.errorModalMessage(commands.error.message),
                            title: '<i class="fas fa-exclamation-triangle"></i> Command List Load Error!',
                            size: 'lg modal-dialog-centered'
                        });
                        dsCommandEditor.system.editor.destroy();
                        dsCommandEditor.startMenu();
                    }

                    // Complete Message
                    $.LoadingOverlay("hide");

                    // Complete
                    return;

                }).catch(err => {

                    // Error Message
                    $.LoadingOverlay("hide");
                    eModal.alert({
                        message: dsCommandEditor.errorModalMessage(err.message),
                        title: '<i class="fas fa-exclamation-triangle"></i> Command List Load Error!',
                        size: 'lg modal-dialog-centered'
                    });

                    // Complete
                    return;

                });

                // Complete
                return;

            })

            // Error
            .catch(err => {

                // Error Message
                $.LoadingOverlay("hide");
                eModal.alert({
                    message: dsCommandEditor.errorModalMessage(err.message),
                    title: '<i class="fas fa-exclamation-triangle"></i> Command Upload Error!',
                    size: 'lg modal-dialog-centered'
                });

                // Complete
                return;

            });

    }

    // dsCommandEditor.system.fetch("getCommands", {}, guildID);

    // Nope
    else {
        eModal.alert({
            message: dsCommandEditor.errorModalMessage('Invalid Command Object!'),
            title: '<i class="fas fa-exclamation-triangle"></i> Command Upload Error!',
            size: 'lg modal-dialog-centered'
        });
        $.LoadingOverlay("hide");
    }

    // Complete
    return;

};