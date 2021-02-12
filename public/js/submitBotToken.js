dsCommandEditor.submitBotToken = function (data) {

    // Exist Token
    if (typeof data.token === "string" && data.token.length > 0) {

        // Start Loading
        $.LoadingOverlay("show", { background: "rgba(0,0,0, 0.5)" });

        // Remember
        if (data.remember) {
            dsCommandEditor.system.insertTokenData('bot_token', data.client_id, data.token);
        }

        // Start System
        dsCommandEditor.system.startRoot('bot_token', data.client_id, data.token);

        // Finish the Load
        $.LoadingOverlay("hide");

    }

    // Nope
    else { eModal.alert({ message: 'You need to insert a Bot Token to submit your request!', title: '<i class="fas fa-exclamation-triangle"></i> Error!' }); }

};