// Forked from https://github.com/MatteZ02/discord-interactions
dsCommandEditor.apiURL = "https://discord.com/api/v8";

// Prepare Module
var objType = function (obj, type) {

    // Is Defined
    if (typeof obj !== "undefined") {

        // Check Obj Type
        if (typeof type === "string") {
            if (Object.prototype.toString.call(obj).toLowerCase() === `[object ${type}]`) {
                return true;
            } else {
                return false;
            }
        }

        // Get Obj Type
        else {

            // Result
            const result = Object.prototype.toString.call(obj).toLowerCase();
            
            // Send Result
            return result.substring(8, result.length - 1);

        }

    }

    // Nope
    else { return null; }

};

// Class
class InteractionsClient {

    // Constructor
    constructor(data) {

        // Create Settings
        const tinyCfg = _.defaultsDeep({}, data, {
            bot_token: '',
            client_id: '',
            user_token: ''
        });

        // Token
        if (typeof tinyCfg.bot_token === "string") {
            this.token = { value: tinyCfg.bot_token, type: 'Bot' };
        }

        // Nope
        else {

            // Client Secret
            if (typeof tinyCfg.user_token === "string") {
                this.token = { value: tinyCfg.user_token, type: 'Bearer' };
            }

            // Nope
            else {
                throw new Error("discord-slash-commands-client | No bot token or user token provided.");
            }

        }

        // ID
        if (typeof tinyCfg.client_id === "string") { this.clientID = tinyCfg.client_id; }

        // Nope
        else {
            throw new Error("discord-slash-commands-client | No clientID provided.");
        }

        // Return
        return this;

    }

    // Get Commands
    async getCommands(options = {}) {

        // Prepare Options
        if (!objType(options, 'object')) {
            throw "options must be of type object. Received: " + typeof options;
        }

        // No Command ID
        if (options.commandID && typeof options.commandID !== "string") {
            throw (
                "commandID received but wasn't of type string. received: " +
                typeof options.commandID
            );
        }

        // No Guild
        if (options.guildID && typeof options.guildID !== "string") {
            throw (
                "guildID received but wasn't of type string. received: " +
                typeof options.guildID
            );
        }

        // URL
        let url = options.guildID
            ? `${dsCommandEditor.apiURL}/applications/${this.clientID}/guilds/${options.guildID}/commands`
            : `${dsCommandEditor.apiURL}/applications/${this.clientID}/commands`;

        // Option
        if (options.commandID) { url += `/${options.commandID}`; };

        // Send Command
        const res = await axios.get(url, {
            headers: { Authorization: `${this.token.type} ${this.token.value}` }
        });

        // Complete
        return res.data;

    }

    // Create Command
    async createCommand(options, guildID) {

        // No Options
        if (!objType(options, 'object')) {
            throw "options must be of type object. Received: " + typeof options;
        }

        // No Description
        if (!options.name || !options.description) {
            throw "options is missing name or description property!";
        }

        // URL
        const url = guildID
            ? `${dsCommandEditor.apiURL}/applications/${this.clientID}/guilds/${guildID}/commands`
            : `${dsCommandEditor.apiURL}/applications/${this.clientID}/commands`;

        // Send Command
        const res = await axios.post(url, options, {
            headers: { Authorization: `${this.token.type} ${this.token.value}` },
        });

        // Complete
        return res.data;

    }

    // Edit Command
    async editCommand(options, commandID, guildID) {

        // No Options
        if (!objType(options, 'object')) {
            throw "options must be of type object. Received: " + typeof options;
        }

        // No Command ID
        if (typeof commandID !== "string") {
            throw "commandID must be of type string. Received: " + typeof commandID;
        }

        // No Name
        if (!options.name || !options.description) {
            throw "options is missing name or description property!";
        }

        // No Guild Name
        if (guildID && typeof guildID !== "string") {
            throw (
                "guildID received but wasn't of type string. received: " +
                typeof guildID
            );
        }

        // URL
        const url = guildID
            ? `${dsCommandEditor.apiURL}/applications/${this.clientID}/guilds/${guildID}/commands/${commandID}`
            : `${dsCommandEditor.apiURL}/applications/${this.clientID}/commands/${commandID}`;

        // Send Command
        const res = await axios.patch(url, options, {
            headers: { Authorization: `${this.token.type} ${this.token.value}` },
        });

        // Complete
        return res.data;

    }

    // Delete Command
    async deleteCommand(commandID, guildID) {

        // No String
        if (typeof commandID !== "string") {
            throw "commandID must be of type string. Received: " + typeof commandID;
        }

        // URL
        const url = guildID
            ? `${dsCommandEditor.apiURL}/applications/${this.clientID}/guilds/${guildID}/commands/${commandID}`
            : `${dsCommandEditor.apiURL}/applications/${this.clientID}/commands/${commandID}`;

        // Delete
        const res = await axios.delete(url, {
            headers: { Authorization: `${this.token.type} ${this.token.value}` },
        });

        // Complete
        return res.data;

    }

};
