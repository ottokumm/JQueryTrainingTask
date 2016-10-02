'use strict';

var MYAPP = window.MYAPP || {};

MYAPP.helpers = (function() {
    function itemMapper(serializedValue) {
        var mappedItem = {
            id: 0,
            name: '',
            email: 'abc@email.com',
            count: 0,
            price: 0,
            delivery: {
                country: '',
                city: ['']
            }
        };

        _.each(serializedValue, function(v) {
            switch (v.name) {
                case 'itemId':
                    {
                        mappedItem.id = _.parseInt(v.value);
                    }
                    break;
                case 'itemName':
                    {
                        mappedItem.name = v.value;
                    }
                    break;
                case 'itemSupplier':
                    {
                        mappedItem.email = v.value;
                    }
                    break;
                case 'itemCount':
                    {
                        mappedItem.count = _.parseInt(v.value);
                    }
                    break;
                case 'itemPrice':
                    {
                        mappedItem.price = currencyFormatter(v.value, false);
                    }
                    break;
                case 'countryRadio':
                    {
                        mappedItem.delivery.country = v.value;
                    }
                    break;
                case 'cityCheckBox':
                    {
                        mappedItem.delivery.city.push(v.value);
                    }
                    break;
                default:
                    ;
            }
        });

        return mappedItem;
    }

    function currencyFormatter(currency, direction) {
        var result;

        if (currency) {
            if (direction) {
                currency = parseFloat(currency);
                result = '$' + currency.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
            } else {
                result = +currency.replace(/\$|,/g, '');
                result.toFixed(2);
            }
        }
        return result;
    }

    function sortBy(key, order, items) {
        return order !== 'none' ? _.orderBy(items, [key], [order]) : items;
    }

    function filter(fValue, items) {
        return _.filter(items, function(f) {
            return f.name.toLowerCase().includes(fValue.toLowerCase());
        });
    }

    function validateAction($element) {
        var $self = $element,
            $attribute = $self.data('opt'),
            validateResult = '',
            validateItem = {};

        validateItem[$attribute] = $self.val();
        validateResult = MYAPP.itemValidate.validate(validateItem, {
            name: ['isEmpty', 'isMaxLengthOverflow', 'isWhiteSpace'],
            email: ['isNotEmail', 'isEmpty'],
            count: ['isNotPosInt', 'isEmpty'],
            price: ['isNotPosFloat', 'isEmpty']
        });

        if (validateResult.length > 0) {
            $self.removeClass('valid')
                .addClass('invalid')
                .closest('.form-group')
                .find('.information-field')
                .removeClass('valid')
                .addClass('invalid')
                .text(validateResult[validateResult.length - 1].message);
        } else {
            $self.removeClass('invalid')
                .addClass('valid')
                .closest('.form-group')
                .find('.information-field')
                .removeClass('invalid')
                .addClass('valid')
                .text('Checked');
            if ($attribute === 'price') {
                $self.val(currencyFormatter(validateItem[$attribute], true));
            }
        }

        return validateResult;
    }

    function tabulateAction($inputElements) {
        $inputElements.first().focus();

        $inputElements.last().on('keydown', function(e) {
            if (e.which === 9 && !e.shiftKey) {
                e.preventDefault();
                $inputElements.first().focus();
            }
        });

        $inputElements.first().on('keydown', function(e) {
            if (e.which === 9 && e.shiftKey) {
                e.preventDefault();
                $inputElements.last().focus();
            }
        });

        $inputElements.last().focus();
    }

    function reverseHide($inputElements, attr, inputTargetValue) {
        _.each($inputElements, function(el) {
            var attributeValue = attr === 'cities' ? inputTargetValue : attr,
                $el = $(el);

            if ($el.data('type') === attributeValue) {
                $el.removeClass('hidden');
            } else {
                $el.addClass('hidden');
            }
        });
    }

    function focusOnInvalid($inputElements, invalidResultField) {
        $inputElements.filter(
                function() {
                    return $(this).data('opt') === invalidResultField;
                })
            .first()
            .focus();
    }

    return {
        itemMapper: itemMapper,
        currencyFormatter: currencyFormatter,
        validateAction: validateAction,
        sortBy: sortBy,
        filter: filter,
        reverseHide: reverseHide,
        tabulateAction: tabulateAction,
        focusOnInvalid: focusOnInvalid
    };
})();