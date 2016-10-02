'use strict';

var MYAPP = window.MYAPP || {};

MYAPP.storage = (function() {
    var itemList = [{
            'id': 1,
            'name': 'Ultra Item 3',
            'email': 'abc@email.com',
            'count': 5,
            'price': 23234545.12,
            'delivery': {
                'country': 'Russia',
                'city': ['Moscow', 'Saratov', 'Volgograd']
            }
        }, {
            'id': 2,
            'name': 'Common Item 2',
            'email': 'abc@email.com',
            'count': 10,
            'price': 1123213.12,
            'delivery': {
                'country': 'Japan',
                'city': ['']
            }
        }, {
            'id': 3,
            'name': 'Super Item 1',
            'email': 'abc@email.com',
            'count': 5,
            'price': 1123213.12,
            'delivery': {
                'country': '',
                'city': ['']
            }
        }, {
            'id': 4,
            'name': 'Common Item 4',
            'email': 'abc@email.com',
            'count': 5,
            'price': 1123213.12,
            'delivery': {
                'country': '',
                'city': ['']
            }
        }, {
            'id': 5,
            'name': 'Advanced Item 5',
            'email': 'abc@email.com',
            'count': 15,
            'price': 1123213.12,
            'delivery': {
                'country': '',
                'city': ['']
            }
        }, {
            'id': 6,
            'name': 'Common Item 6',
            'email': 'abc@email.com',
            'count': 5,
            'price': 443213.12,
            'delivery': {
                'country': '',
                'city': ['']
            }
        }, {
            'id': 7,
            'name': 'Extra Item 7',
            'email': 'abc@email.com',
            'count': 15,
            'price': 113213.12,
            'delivery': {
                'country': '',
                'city': ['']
            }
        }, {
            'id': 8,
            'name': 'Extra Item 8',
            'email': 'abc@email.com',
            'count': 25,
            'price': 32313.34,
            'delivery': {
                'country': '',
                'city': ['']
            }
        }, {
            'id': 9,
            'name': 'Common Item 9',
            'email': 'abc@email.com',
            'count': 35,
            'price': 314213.22,
            'delivery': {
                'country': '',
                'city': ['']
            }
        }, {
            'id': 10,
            'name': 'Superb Item 10',
            'email': 'abc@email.com',
            'count': 5,
            'price': 164213.12,
            'delivery': {
                'country': '',
                'city': ['']
            }
        }, {
            'id': 11,
            'name': 'Superb Item 11',
            'email': 'abc@email.com',
            'count': 3,
            'price': 164213.12,
            'delivery': {
                'country': '',
                'city': ['']
            }
        }, {
            'id': 12,
            'name': 'Super Item 12',
            'email': 'abc@email.com',
            'count': 5,
            'price': 164213.12,
            'delivery': {
                'country': '',
                'city': ['']
            }
        }, {
            'id': 13,
            'name': 'Super Item 13',
            'email': 'abc@email.com',
            'count': 5,
            'price': 164213.12,
            'delivery': {
                'country': '',
                'city': ['']
            }
        }, {
            'id': 14,
            'name': 'Small Item 14',
            'email': 'abc@email.com',
            'count': 15,
            'price': 164213.12,
            'delivery': {
                'country': '',
                'city': ['']
            }
        }, {
            'id': 15,
            'name': 'Small Item 15',
            'email': 'abc@email.com',
            'count': 41,
            'price': 164213.12,
            'delivery': {
                'country': '',
                'city': ['']
            }
        }, {
            'id': 23,
            'name': 'Wrecked Item 16',
            'email': 'abc@email.com',
            'count': 9,
            'price': 164213.12,
            'delivery': {
                'country': '',
                'city': ['']
            }
        }],
        lastId = _.maxBy(itemList, function(i) {
            return i.id;
        }).id + 1;

    function getItems() {
        return itemList;
    };

    function getItemById(id) {
        return _.find(itemList, function(i) {
            return i.id === _.parseInt(id);
        });
    };

    function removeItemById(id) {
        _.remove(itemList, function(i) {
            return i.id === _.parseInt(id);
        });
    };

    function addItem(item) {
        item.id = incrementId();
        itemList.push(item);
    };

    function updateItemById(id, item) {
        var index = _.findIndex(itemList, function(i) {
            return i.id === _.parseInt(id);
        });

        itemList[index] = item;
    };

    function incrementId() {
        return lastId++;
    };

    return {
        getItems: getItems,
        getItemById: getItemById,
        removeItemById: removeItemById,
        updateItemById: updateItemById,
        addItem: addItem
    };
})();