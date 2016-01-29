angular.module("noteApp")
    .factory("localService", ["$q", "lodash", function($q, lodash) {
        "use strict";
        /* category's data structure

            1. category: {
                id: uuid,
                title: string,
                collection: {
                    count: number,
                    entries: [{
                        id: uuid, // @note except content
                        title: string,
                        created: time,
                        modified: time
                    }]
                },
                created: time,
                modified: time
            }
            ====== In LocalStorge ======
            id => {
                id: uuid,
                title: string,
                collection: {
                    count: number,
                    entries: [noteIDs]
                },
                created: string,
                modified: string
            }

            2. allCategoris: {
                count: number,
                entries: [{
                    id: uuid, // @category except collection
                    title: string,
                    created: time,
                    modified: time
                }]
            }
            ====== In LocalStorge ======
            ID => {count: number, entries: [categoryIDs]}

        */

        /* note's data structure

            1. note: {
                id: uuid,
                title: string,
                content: string,
                created: time,
                modified: time
            }
            ====== In LocalStorge ======
            id => {
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
                        result.status = 404;
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
                } else if(item.id) {
                    item.modified = Date.now();
                    localStorage.setItem(item.id, JSON.stringify(item));
                    result.data = item;
                } else {
                    item.id = UUID.generate();
                    item.created = item.modified = Date.now();
                    localStorage.setItem(item.id, JSON.stringify(item));
                    result.data = item;
                }
                return result;
            },
            __remove: function(key) {
                var result = {
                    status: 200,
                    data: null
                }
                var item = localStorage.getItem(key);
                if(!item) {
                    result.status = 404;
                } else {
                    try {
                        var p = JSON.parse(item);
                        result.data = p;
                    } catch(err) {
                        result.status = 500;
                    } finally {
                        localStorage.removeItem(key);
                    }
                }
                return result;
            },
            __addOneToAllCategories: function(id) {
                var that = this;
                var result = {
                    status: 200,
                    data: null
                }
                var loadedResult = that.__load(ID);
                // todo if else status
                loadedResult.data.entries.push(id);
                loadedResult.data.count += 1;
                that.__save(loadedResult.data, ID);
            },
            __removeOneFromAllCategories: function(id) {
                var that = this;
                var result = {
                    status: 200,
                    data: null
                }
                var loadedResult = that.__load(ID);
                // todo if else status
                lodash.remove(loadedResult.data.entries, id);
                loadedResult.data.count -= 1;
                that.__save(loadedResult.data, ID);
            },
            __addOneToCategoryCollection: function(categoryID, noteID) {
            },
            __removeOneFromCategoryCollection: function(categoryID, noteID) {
            },
            queryAllCategories: function() {
                var that = this;
                var result = {
                    status: 200,
                    data: null
                }
                var deferred = $q.defer();

                var loadedResult = that.__load(ID);
                if(200 === loadedResult.status) {
                    // loadedResult.data: {count: number, entries: [categoryIDs]}
                    var data = {count: 0, entries: []};
                    loadedResult.data.entries.forEach(function(categoryID, index) {
                        var p = that.__load(categoryID);
                        if(200 === p.status) {
                            var x = lodash.pick(p.data, ["id", "title", "created", "modified"]);
                            data.count += 1;
                            data.entries.push(x);
                        } else {
                            that.__removeOneFromAllCategories(categoryID);
                            // todo if else status
                        }
                    });
                    result.data = data;
                    deferred.resolve(result);
                } else if(404 === loadedResult.status) {
                    var p = {
                        count: 0,
                        entries: []
                    }
                    localStorage.setItem(ID, JSON.stringify(p));
                    result.data = p;
                    deferred.reject(result);
                } else {
                    result.status = 400;
                    deferred.reject(result);
                }
                return deferred.promise;
            },
            addCategory: function(category) {
                // category: {title, contains}
                var that = this;
                var result = {
                    status: 200,
                    data: null
                }
                var deferred = $q.defer();
                // validate - title is a none-empty string and contains is an empty Array
                // todo more validation
                if(("string" !== typeof category.title) || !category.title || !(category.contains instanceof Array) || 0 !== category.contains.length) {
                    result.status = 400;
                    deferred.reject(result);
                } else {
                    var savedResult = that.__save(category);
                    if(200 === savedResult.status) {
                        result.data = savedResult.data;
                        deferred.resolve(result);
                    } else {
                        result.status = 500;
                        deferred.reject(result);
                    }
                }
                return deferred.promise;
            },
            deleteCategory: function() {
            },
            queryCategory: function(id) {
                var that = this;
                var result = {
                    status: 200,
                    data: null
                }
                var deferred = $q.defer();
                if("string" !== typeof id || !id) {
                    result.status = 404;
                    deferred.reject(result);
                } else {
                    var loadedResult = that.__load(id);
                    if(200 === loadedResult.status) {
                        // loadedResult.data: {id, title, collection: {count, entries: [noteIDs]}, created, modified}
                        var data = lodash.pick(loadedResult.data, ["id", "title", "created", "modified"]);
                        data.collection = {count: 0, entries: []};
                        loadedResult.data.collection.entries.forEach(function(noteID, index) {
                            var p = that.__load(noteID);
                            if(200 === p.status) {
                                var x = lodash.pick(p.data, ["id", "title", "created", "modified"]);
                                data.collection.count += 1;
                                data.collection.entries.push(x);
                            } else {
                                that.__removeOneFromCategoryCollection(id, noteID);
                            }
                        });
                        result.data = data;
                        deferred.resolve(result);
                    } else {
                        result.status = loadedResult.status;
                        deferred.reject(result);
                    }
                }
                return deferred.promise;
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
