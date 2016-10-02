'use strict';

var MYAPP = window.MYAPP || {};

MYAPP.deliveryStorage = (function() {
    var deliveryList = {
        'Russia': ['Moscow', 'Saratov', 'Volgograd'],
        'USA': ['New York', 'Seattle', 'Chicago'],
        'Japan': ['Tokyo', 'Kyoto', 'Yokohama']
    };

    function getDeliveries() {
        return deliveryList;
    };

    function getCountries() {
        return _.keys(deliveryList);
    };

    function getCities(key) {
        return deliveryList[key];
    };

    return {
        getDeliveries: getDeliveries,
        getCountries: getCountries,
        getCities: getCities
    };
})();