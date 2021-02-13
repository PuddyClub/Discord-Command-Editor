dsCommandEditor.tokenList = {

    // Open
    open: function () {

        // Nothing
        const nothigTokentoShow = function () {
            eModal.alert({ message: 'No tokens were found!', title: '<i class="fas fa-exclamation-triangle"></i> Error!' });
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

                        // Actions
                        $('<td>').append(

                            // Delete
                            $('<button>', { class: 'btn btn-danger mr-3' }).text('Delete').click(function () {
                                eModal.confirm('Are you sure you want to remove this token from your list?', `Delete Item ID "${item}"`)
                                    .then(function () {

                                        // Remove Item
                                        $.localStorage.remove('tokenList', item);
                                        dsCommandEditor.tokenList.open();

                                    });
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
                        $('<table>', { class: 'table' }).append(

                            // Head
                            $('<thead>').append(

                                $('<tr>').append(
                                    $('<th>').text('ID'),
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