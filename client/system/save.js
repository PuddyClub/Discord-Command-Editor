dsCommandEditor.system.saveCommandList = async function (newCommands, oldCommands, guildID) {

    console.log(oldCommands, newCommands);
    // Is Array
    if (Array.isArray(newCommands)) {

        // Check New Commands
        for (const item in newCommands) {

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

    }

    // Nope
    else {
        eModal.alert({
            message: dsCommandEditor.errorModalMessage('Invalid Command Object!'),
            title: '<i class="fas fa-exclamation-triangle"></i> Command Upload Error!',
            size: 'lg modal-dialog-centered'
        });
    }

};