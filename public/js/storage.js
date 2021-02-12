// Class
class tinyStorage {

    // Constructor
    constructor(varName) {

        // Validate
        if (typeof varName === "string" && (varName === "localStorage" || varName === "sessionStorage")) {

            // Exist Storage
            if (typeof (window[varName]) !== "undefined") {

                this.Storage = window[varName];
                return this;

            }

            // Nope
            else { return null; }

        }

        // Nope
        else { throw new Error('Invalid Storage Item! You need to choose "localStorage" or "sessionStorage"!'); }

    }

    // Set
    set(key, value) {

        // Validate Key Name
        if (typeof key === "string" || typeof key === "number") {

            // Return Value
            return this.Storage.setItem(key, value);

        }

        // Nope
        else { return null; }

    }

    // Get
    get(key) {

        // Validate Key Name
        if (typeof key === "string" || typeof key === "number") {

            // Return Value
            return this.Storage.getItem(key);

        }

        // Nope
        else { return null; }

    }

    // Get All
    getData(data = []) {

        // Result
        const result = {};

        // Is Array
        if (Array.isArray(data)) {
            for (const item in data) {
                if(typeof data[item] === "string") {

                    // Data
                    const value = this.get(data[item]);

                    // Get Value
                    if(typeof value !== "undefined" && value !== null) {
                        result[data[item]] = value;
                    }

                }
            }
        }

        // Send Result
        return result;

    }

    // Get All
    getAll() {

        // Values
        const result = {};

        // Selected Item
        let selectedItem = {
            value: null,
            count: 0
        };

        // Action
        do {

            // Get Key
            selectedItem.value = this.Storage.key(selectedItem.count);
            if (typeof selectedItem.value === "string") {
                result[selectedItem.value] = this.get(selectedItem.value);
            }

            // Next
            selectedItem.count++;

        } while (typeof selectedItem.value === "string");

        // Complete
        return result;

    }

    // Remove
    remove(key) {

        // Validate Key Name
        if (typeof key === "string" || typeof key === "number") {

            return this.Storage.removeItem(key);

        }

        // Nope
        else { return null; }

    }

    // Key
    key(value) { this.Storage.key(value); }

    // Clear Storage
    clear() { this.Storage.clear(); }

};

// Create Item
var appStorage = new tinyStorage('localStorage');