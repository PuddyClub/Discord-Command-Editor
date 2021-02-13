dsCommandEditor.tokenList = {

    // Open
    open: function () {

        // Get Token List
        const tokenList = $.localStorage.get('tokenList');
        if (objType(tokenList, 'object')) {

            // Prepare Items
            const tokensList = [];

            // Get Items
            for (const item in tokenList) {
                tokensList.push($('<tr>').append(
                    
                    // ID
                    $('<td>').text(item),

                    // Delete
                    /* Create Delete Button here */
                    
                    // Login
                    $('<td>').append(
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
                                $('<th>').text('Token')
                            )

                        ),

                        // Body
                        $('<tbody>').append(tokensList)

                    )
                ),
                size: 'lg',
                title: '<i class="fab fa-discord"></i> Token List'
            })

        }

        // Empty
        else { eModal.alert({ message: 'No tokens were found!', title: '<i class="fas fa-exclamation-triangle"></i> Error!' }); }

    }

};