dsCommandEditor.system.fetch = function (url, method, body, guildID) {
    return new Promise(function (resolve, reject) {

        // Options
        const fetchOptions = {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            headers: {
                'Authorization': `Bot ${dsCommandEditor.root.bot_token} ${dsCommandEditor.root.client_id}`,
                'Content-Type': 'application/json'
            }
        };

        // Exist Guild ID
        if (typeof guildID === "string") { fetchOptions.headers['Guild-Id'] = guildID; }

        // Exist Body
        if (body) { fetchOptions.body = JSON.stringify(body); }

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