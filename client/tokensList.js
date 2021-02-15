dsCommandEditor.tokenList = {

    // Open
    open: function () {

        // Nothing
        const nothigTokentoShow = function () {
            eModal.alert({
                message: dsCommandEditor.errorModalMessage('No tokens were found!'),
                title: '<i class="fab fa-discord"></i> Nothing here!',
                size: 'lg modal-dialog-centered'
            });
        };

        // Get Token List
        const tokenList = $.localStorage.get('tokenList');
        if (objType(tokenList, 'object')) {

            // Prepare Items
            const tokensList = [];
            const tokenKeys = Object.keys(tokenList).length;

            // Get Items
            if (tokenKeys) {
                for (const item in tokenList) {
                    tokensList.push($('<tr>').append(

                        // ID
                        $('<td>').text(item),

                        // Name
                        $('<td>').text(tokenList[item].name),

                        // Actions
                        $('<td>').append(

                            // Delete
                            $('<button>', { class: 'btn btn-danger mr-3' }).text('Delete').click(function () {
                                eModal.alert({
                                    message: 'Are you sure you want to remove this token from your list?',
                                    title: `Delete Item ID "${item}"`,
                                    buttons: [
                                        {
                                            text: 'Yes', style: 'info', close: false, click: function () {

                                                // Remove Item
                                                $.localStorage.remove('tokenList', item);
                                                dsCommandEditor.tokenList.open();

                                            }
                                        },
                                        {
                                            text: 'No', style: 'danger', close: false, click: function () {
                                                dsCommandEditor.tokenList.open();
                                            }
                                        },
                                    ]
                                });
                            }),

                            // Rename
                            $('<button>', { class: 'btn btn-info mr-3' }).text('Rename').click(function () {

                                let nameSpace = item;
                                if (typeof tokenList[item].name === "string") { nameSpace = `${tokenList[item].name} (${item})`; }

                                // Prompt
                                eModal.prompt({
                                    message: `Enter the name of the application:`,
                                    title: `<i class="fas fa-font"></i> Rename "${nameSpace}"`
                                }).then(function (newName) {
                                    $.LoadingOverlay("show", { background: "rgba(0,0,0, 0.5)" });
                                    $.localStorage.set('tokenList', item, 'name', newName);
                                    setTimeout(function () { $.LoadingOverlay("hide"); dsCommandEditor.tokenList.open(); }, 500);
                                }, () => { setTimeout(function () { dsCommandEditor.tokenList.open(); }, 500); });

                            }),

                            // Login
                            $('<button>', { class: 'btn btn-secondary', 'data-dismiss': 'modal' }).text('Login').click(function () {

                                // Start Root
                                dsCommandEditor.system.startRoot('bot_token', item, tokenList[item].token);

                                // Initialize
                                dsCommandEditor.system.initialize();

                            })

                        )

                    ));
                }

                eModal.alert({
                    message: $('<div>', { class: 'table-responsive' }).append(
                        $('<table>', { class: 'table table-striped' }).append(

                            // Head
                            $('<thead>').append(

                                $('<tr>').append(
                                    $('<th>').text('ID'),
                                    $('<th>').text('Name'),
                                    $('<th>').text('Actions')
                                )

                            ),

                            // Body
                            $('<tbody>').append(tokensList)

                        )
                    ),
                    size: 'lg',
                    title: '<i class="fab fa-discord"></i> Token List'
                });

            }

            // Nope
            else { nothigTokentoShow(); }

        }

        // Empty
        else { nothigTokentoShow(); }

    }

};