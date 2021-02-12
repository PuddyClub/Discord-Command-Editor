dsCommandEditor.submitBotToken = function (data) {

    // Not Exist Token
    if(typeof data.token !== "string" || data.token.length < 1){
        eModal.alert({ message: 'You need to insert a Bot Token to submit your request!', title: '<i class="fas fa-exclamation-triangle"></i> Error!' });
    }

    // Not Exist Client ID
    else if(typeof data.client_id !== "string" || data.client_id.length < 1){
        eModal.alert({ message: 'You need to insert a Client ID to submit your request!', title: '<i class="fas fa-exclamation-triangle"></i> Error!' });
    }

    // Perfect!
    else {

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

};