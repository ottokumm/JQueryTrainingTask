'use strict';

var MYAPP = window.MYAPP || {};

MYAPP.itemValidate = (function() {
    var validator = {
        validateFunctions: {
            isEmpty: {
                execute: function(data) {
                    return !data || data.length === 0;
                },
                message: 'Required field'
            },

            isMaxLengthOverflow: {
                execute: function(data) {
                    return data.length > 15;
                },
                message: 'Maximum allowed length is 15'
            },

            isWhiteSpace: {
                execute: function(data) {
                    return (/^\s+$/g).test(data);
                },
                message: 'String consists from whitespaces'
            },

            isNotEmail: {
                execute: function(data) {
                    return !(/^.+@.+\..+$/g).test(data);
                },
                message: 'Incorrect email field'
            },

            isNotPosInt: {
                execute: function(data) {
                    return !/^(0|[1-9]\d*)$/.test(data);
                },
                message: 'Value should be a positive number'
            },

            isNotPosFloat: {
                execute: function(data) {
                    return !(parseFloat(data) && data > 0);
                },
                message: 'Value should be a positive number'
            }
        },

        validateOptions: {},

        validate: function(item) {
            var itemKeys = _.keys(item),
                result = [];

            _.each(itemKeys, function(ik) {
                var opt = '';

                opt = validator.validateOptions.options[ik];
                if (opt) {
                    _.each(opt, function(vf) {
                        if (validator.validateFunctions[vf].execute(item[ik])) {
                            result.push({
                                'name': ik,
                                'message': validator.validateFunctions[vf].message
                            });
                        }
                    });
                }
            });

            return result;
        }
    };

    function validate(data, options) {
        validator.validateOptions.options = options;
        return validator.validate(data);
    }

    return {
        validate: validate,
        getValidateInt: validator.validateFunctions.isNotPosInt
    };
})();