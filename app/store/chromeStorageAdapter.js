// Adapter for redux-localstorage to use Chrome's chrome.storage mechanism
export default (storage) => ({
    0: storage,
    put(key, value, callback) {
        try {
            storage.local.set({ [key]: value }, () => callback(null));
        } catch (e) {
            callback(e);
        }
    },

    get(key, callback) {
        storage.local.get(key, (value) => {
            callback(null, value[key]);
        });
    },

    del(key, callback) {
        storage.local.remove(key, () => callback(null));
    }
});