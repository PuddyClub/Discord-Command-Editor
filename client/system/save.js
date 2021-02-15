dsCommandEditor.system.saveCommandList = function (newCommands, oldCommands, guildID) {

    // Start Loading
    $.LoadingOverlay("show", { background: "rgba(0,0,0, 0.5)" });

    // Is Array
    if (Array.isArray(newCommands)) {

        // Emergency Backup
        const emergencyBackup = function (err) {

            // Error Message
            eModal.alert({
                message: dsCommandEditor.errorModalMessage(err.message),
                title: '<i class="fas fa-exclamation-triangle"></i> Command List Load Error!',
                size: 'lg modal-dialog-centered'
            });

            // Save Backup
            let filename = `auto_discord_slash_commands_${dsCommandEditor.root.client_id}`;
            if (typeof guildID === "string") { filename += `_${guildID}`; }
            saveAs(new Blob([JSON.stringify(dsCommandEditor.system.editor.get(), null, 2)], { type: "text/plain;charset=utf-8" }), filename + '.json');

            dsCommandEditor.system.editor.destroy();
            dsCommandEditor.startMenu();

            $.LoadingOverlay("hide");

            // Complete
            return;

        };

        // Delte Commands Script
        const deleteCommandsScript = function (dontDelete, fn, fn_error, extra) {

            // Run Delete Commands
            const deleteCommands = extra({ data: oldCommands });
            deleteCommands.run(function (index, fn, fn_error) {

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

                    // Send Result
                    dsCommandEditor.system.fetch("deleteCommand", { id: oldCommands[index].id }, guildID).then(() => {
                        fn();
                        return;
                    }).catch(err => {
                        console.error(err);
                        fn_error(err);
                        return;
                    });

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

            // Editor Type
            const editorType = dsCommandEditor.system.updateChecker(newCommands, oldCommands);

            // To do something
            if (editorType > 0) {

                // Final Result
                const final_result = {
                    then: () => {
                        executeClear();
                        return;
                    },
                    catch: err => {
                        console.error(err);
                        fn_error(err);
                        return;
                    }
                };

                // Delete Items
                for (const item in newCommand) {
                    if (item !== "name" && item !== "description" && item !== "options") {
                        delete newCommand[item];
                    }
                }

                // Create
                if (editorType === 1) {

                    // Send Result
                    console.log(`New command added to the app ${dsCommandEditor.root.client_id}!`, newCommand);
                    dsCommandEditor.system.fetch("createCommand", newCommand, guildID).then(final_result.then).catch(final_result.catch);

                }

                // Edit
                else if (editorType === 2) {

                    // Send Result
                    console.log(`New command edited to the app ${dsCommandEditor.root.client_id}!`, newCommand);
                    dsCommandEditor.system.fetch("editCommand", newCommand, guildID).then(final_result.then).catch(final_result.catch);

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
                        dsCommandEditor.system.editor.expandAll();
                        eModal.alert({
                            message: 'Your command list has been successfully saved!',
                            title: '<i class="fas fa-check"></i> Success!',
                            size: 'lg modal-dialog-centered'
                        });

                        $.LoadingOverlay("hide");

                    }

                    // Nope
                    else { emergencyBackup(commands.error); }

                    // Complete
                    return;

                }).catch(err => { emergencyBackup(err); return; });

                // Complete
                return;

            })

            // Error
            .catch(err => { emergencyBackup(err); return; });

    }

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