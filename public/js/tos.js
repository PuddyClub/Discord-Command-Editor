dsCommandEditor.tos = function () {
    eModal.alert({ 
        message: 'Test', 
        size: 'lg', 
        title: 'Terms of Use',
        subtitle: 'You are agreeing the TOS when using this application!',
        buttons: [
            {text: 'Okay', style: 'primary',   close: true }
        ]
 });
};