dsCommandEditor.tokenList = {

    // Open
    open: function () {

        // Get Token List
        const tokenList = $.localStorage.get('tokenList');
        if (objType(tokenList, 'object')) {

            eModal.prompt({
                message: $('<div>', {class: 'table-responsive'}).append(
                    $('<table>', {class: 'table'})
                ),
                title: '<i class="fab fa-discord"></i> Token List'
            })

        }

        // Empty
        else { eModal.alert({ message: 'No tokens were found!', title: '<i class="fas fa-exclamation-triangle"></i> Error!' }); }

    }

};