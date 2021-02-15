dsCommandEditor.system.saveCommandList = async function (newCommands, oldCommands, guildID) {

    console.log(oldCommands, newCommands);
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
                    for (const item in dontDelete) {
                        if (oldCommands.find(command => command.name === dontDelete[item].name)) {
                            canDelete = false;
                            break;
                        }
                    }
                }

                // Delte
                if (canDelete) {

                    // Logger Info
                    console.log(`OLD command deleted from the app ${dsCommandEditor.root.client_id}!`, oldCommands[index]);

                    // Global
                    if (typeof guildID !== "string") {
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
                        /* client.deleteCommand(oldCommands[index].id, guildID).then(() => {
                            fn();
                            return;
                        }).catch(err => {
                            fn();
                            return;
                        }); */
                    }

                }

                // Complete
                return;

            });

            // Complete
            fn();
            return;

        };

        // Check New Commands
        await forPromise({ data: newCommands }, function (index3, fn, fn_error, extra) {

            // Execute Clear
            const executeClear = function () {

                // Delete Item
                dontDelete.push(newCommand);

                // Script
                if (existClear && index3 >= newCommandsCount) {
                    deleteCommandsScript(dontDelete, fn, fn_error, extra);
                }

                // Complete
                fn();
                return;

            };

            // Set Editor Type to Create
            let editorType = 1;

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
                        //client.createCommand(newCommand).then(final_result.then).catch(final_result.catch);
                    }

                    // Guild
                    else {
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
                            //client.editCommand(newCommand, commandID).then(final_result.then).catch(final_result.catch);
                        } else {
                            //client.createCommand(newCommand).then(final_result.then).catch(final_result.catch);
                        }
                    }

                    // Guild
                    else {
                        if (typeof commandID === "string") {
                            //client.editCommand(newCommand, commandID, guildID).then(final_result.then).catch(final_result.catch);
                        } else {
                            //client.createCommand(newCommand, guildID).then(final_result.then).catch(final_result.catch);
                        }
                    }

                }

            }

            // Nope
            else { executeClear(); }

            // Complete
            return;

        });

    }

    // dsCommandEditor.system.fetch("getCommands", 'POST', {}, guildID);
    // editor.set()

    /* $.LoadingOverlay("show", { background: "rgba(0,0,0, 0.5)" });
 
    eModal.alert({
        message: 'Your command list has been successfully saved!',
        title: '<i class="fas fa-check"></i> Success!',
        size: 'lg modal-dialog-centered'
    });
 
    $.LoadingOverlay("hide"); */

    /* 
    
    eModal.alert({
        message: dsCommandEditor.errorModalMessage('Your browser does not support Storage API!'),
        title: '<i class="fas fa-exclamation-triangle"></i> Storage API not found!',
        size: 'lg modal-dialog-centered'
    });
    
    */

    // Nope
    else {
        eModal.alert({
            message: dsCommandEditor.errorModalMessage('Invalid Command Object!'),
            title: '<i class="fas fa-exclamation-triangle"></i> Command Upload Error!',
            size: 'lg modal-dialog-centered'
        });
    }

    // Complete
    return;

};