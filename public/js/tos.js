dsCommandEditor.tos = function () {
    eModal.alert({
        message: [
            `The use of this application is at your own risk.` +
            `It is recommended that you always test the application's functionality in a test bot before actually using this application for production.` +
            `<br/>` +
            `You are agreeing that we are not responsible for any type of accident that happens during the use of this application.` +
            `<br/>` +
            `Always stay informed about Discord APi updates while using this application. API updates can affect the functionally current of this application.` +
            `<br/>` +
            `This application is to be used only for your projects. You are not allowed to use this application to make API Abuse or anything else that breaks Discord's API usage policy.` +
            `<br/>` +
            `Each submission of an update to your command list will make an old command analysis with the new one. This data comparison will be used for the system to define which commands will be deleted, added, edited.` +
            `<br/>` +
            `You also agree that the internet browser you are using is completely safe to store your bot's confidential data in your computer without any risk of compromising your privacy. The code for this application is connected to your internet browser's native Storage API.`
        ],
        size: 'lg',
        title: '<i class="fas fa-file-signature"></i> Terms of Use',
        subtitle: 'You are agreeing the TOS when using this application!',
        buttons: [
            { text: 'Okay', style: 'primary', close: true }
        ]
    });
};