const Storage = {
    put: function(key, obj) {
        localStorage.setItem(key, JSON.stringify(obj));
    },
    get: function(key) {
        let value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    },    
    del: function(key) {
        localStorage.removeItem(key);
    },
    kill: function() {
        localStorage.clear();
    }
};