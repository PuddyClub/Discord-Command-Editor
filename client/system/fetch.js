dsCommandEditor.system.fetch = function (url, method, body) {
    return new Promise(function (resolve, reject) {

        // Options
        const fetchOptions = {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            headers: {
                'Authorization': `Bot ${dsCommandEditor.root.bot_token}`,
                'Content-Type': 'application/json'
            }
        };

        // Exist Body
        if (body) {
            body.client_id = dsCommandEditor.root.client_id;
            fetchOptions.body = JSON.stringify(body);
        }

        // Fetch Function
        fetch('/' + url, fetchOptions).then(response => {
            response.json().then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
        }).catch(err => {
            reject(err);
        });

    });
};