angular.module("noteApp")
    .factory("localService", ["$q", function($q) {
        "use strict";
        /* category's data structure

            1. category: {
                id: uuid,
                name: string,
                contains: [noteIDs]
            }

            2. categoris: [categoryIDs]

        */

        /* note's data structure

            1. note: {
                id: uuid,
                title: string,
                content: string,
                created: time,
                modified: time
            }

        */
        var ID = "poplark-angular-note-storage";
        var storage = {
            __load: function(key) {
                var result = {
                    status: 200,
                    data: null
                }
                var item = localStorage.getItem(key);
                if(!item) {
                    result.status = 404;
                } else {
                    try {
                        result.data = JSON.parse(item);
                    } catch(err) {
                        localStorage.removeItem(key);
                        result.status = 500;
                    }
                }
                return result;
            },
            __save: function(item, key) {
                var result = {
                    status: 200,
                    data: null
                }
                if(key) {
                    localStorage.setItem(key, JSON.stringify(item));
                    result.data = item;
                } else if(item.uuid) {
                    item.modified = Date.now();
                    localStorage.setItem(item.uuid, JSON.stringify(item));
                    result.data = item;
                } else {
                    var uuid = "xxxx";
                    // ToDo create an uuid to item
                    item.uuid = uuid;
                    item.created = item.modified = Date.now();
                    localStorage.setItem(item.uuid, JSON.stringify(item));
                    result.data = item;
                }
                return result;
            },
            queryAllCategories: function() {
                var result = {
                    status: 200,
                    data: null
                }
                var deferred = $q.defer();

                var loadedResult = this.__load(ID);
                if(404 === loadedResult.status || 500 === loadedResult.status) {
                    localStorage.setItem(ID, '[]');
                    result.data = [];
                    deferred.resolve(result);
                } else {
                    result.data = loadedResult.data;
                    deferred.resolve(result);
                }
                return deferred.promise;
            },
            addCategory: function() {
            },
            deleteCategory: function() {
            },
            queryCategory: function() {
            },
            updateCategory: function() {
            },
            queryAllNotes: function(category) {
                var deferred = $q.defer();
                var result = {
                    status: 200,
                    data: [{
                            'title': '1. Nexus S',
                            'content': 'Fast just got faster with Nexus S.'
                        }, {
                            'title': '2. Motorola XOOM™ with Wi-Fi',
                            'content': 'The Next, Next Generation tablet.'
                        }, {
                            'title': '3. MOTOROLA XOOM™',
                            'content': 'The Next, Next Generation tablet.'
                        }]
                }
                deferred.resolve(result);
                return deferred.promise;
            },
            addNote: function() {
            },
            deleteNote: function(){
            },
            queryNote: function() {
            },
            updateNote: function() {
            }
        }
        return storage;
    }]).factory("remoteService", ["$http", function($http) {
        // todo
    }]);
