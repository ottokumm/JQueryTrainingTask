'use strict';

var MYAPP = window.MYAPP || {};

MYAPP.handlers = (function() {
    var toggleModal = 'toggle-modal',
        currentItems = MYAPP.storage.getItems(),
        filterValue = '',
        sortOrder = {
            name: 'none',
            price: 'none',
            current: 'name'
        };

    function deleteItem(e) {
        var $attribute = $(this).attr('data-id');

        MYAPP.renderer.renderModalDelete($attribute);

        $('#modalId').addClass(toggleModal);

        MYAPP.helpers.tabulateAction($('#deleteForm').find('.tab-action'), true);
    }

    function editItem(e) {
        var $attribute = $(this).attr('data-id'),
            item = MYAPP.storage.getItemById($attribute),
            $checkboxItems;

        e.preventDefault();

        MYAPP.renderer.renderModalEdit(item);
        MYAPP.renderer.renderCountries(MYAPP.deliveryStorage.getCountries(), item.delivery);
        MYAPP.renderer.renderCities(MYAPP.deliveryStorage.getCountries());

        $checkboxItems = $('#deliveryCities').find('.delivery-group')
            .filter(function() {
                return $(this).data('type') === item.delivery.country;
            });

        _.each(item.delivery.city, function(c) {
            $checkboxItems.find('.checkbox input').filter(
                    function() {
                        return $(this).val() === c;
                    }
                )
                .prop('checked', true);
        });

        $('#modalId').addClass(toggleModal)
            .find('.confirmUpdateBtn')
            .text('Update');

        MYAPP.helpers.tabulateAction($('#updateForm').find('.tab-action'), true);
    }

    function addItem(e) {
        var item = {
            id: 0
        };

        MYAPP.renderer.renderModalEdit(item);
        MYAPP.renderer.renderCountries(MYAPP.deliveryStorage.getCountries(), item.deliveries);
        MYAPP.renderer.renderCities(MYAPP.deliveryStorage.getCountries());

        $('#modalId').addClass(toggleModal)
            .find('.confirmUpdateBtn')
            .text('Add');

        MYAPP.helpers.tabulateAction($('#updateForm').find('.tab-action'), true);
    }

    function confirmItemDelete(e) {
        var attribute = $(this).attr('data-id'),
            $modal = $('#modalId');

        e.preventDefault();

        MYAPP.storage.removeItemById(attribute);

        currentItems = MYAPP.helpers.filter(filterValue, MYAPP.storage.getItems());

        currentItems = MYAPP.helpers.sortBy(sortOrder.current, sortOrder[sortOrder.current], currentItems);

        MYAPP.renderer.renderItemTable(currentItems);

        $modal.empty();
        $modal.removeClass(toggleModal);
    }

    function confirmItemUpdate(e) {
        var attribute = $(this).attr('data-id'),
            $modal = $('#modalId'),
            $values,
            $validateItems = $('#updateForm').find('.form-control.validate'),
            $checkboxItems,
            $elementsToFocusOn,
            validationResult = [],
            fieldResult = [],
            priceValue = 0,
            item = {};

        e.preventDefault();

        $checkboxItems = $('#deliveryCities').find('.delivery-group')
            .filter(function() {
                return $(this).data('type') !== $('#deliveryCountries').find('input:checked')
                    .val();
            });

        $checkboxItems.find('.checkbox input:checked')
            .prop('checked', false);

        $values = $('#updateForm').serializeArray();

        item = MYAPP.helpers.itemMapper($values);

        _.each($validateItems, function(vi) {
            var $vi = $(vi);

            if ($vi.data('opt') === 'price') {
                priceValue = $vi.val();
                if (priceValue) {
                    priceValue = MYAPP.helpers.currencyFormatter(priceValue, false);
                    if (priceValue) {
                        $vi.val(priceValue = priceValue ? priceValue : '');
                    }
                }
            }

            fieldResult = MYAPP.helpers.validateAction(
                $vi
            );

            if (fieldResult.length > 0) {
                validationResult.push(fieldResult);
            }
        });

        if (!validationResult.length > 0) {
            if (_.parseInt(attribute) === 0) {
                MYAPP.storage.addItem(item);
            } else {
                MYAPP.storage.updateItemById(attribute, item);
            }

            currentItems = MYAPP.helpers.filter(filterValue, MYAPP.storage.getItems());

            currentItems = MYAPP.helpers.sortBy(sortOrder.current, sortOrder[sortOrder.current], currentItems);

            MYAPP.renderer.renderItemTable(currentItems);

            $modal.empty();
            $modal.removeClass(toggleModal);
        } else {
            $elementsToFocusOn = $('#updateForm').find('.tab-action.validate');
            MYAPP.helpers.focusOnInvalid($elementsToFocusOn, validationResult[0][0].name);
        }
    }

    function declineAction(e) {
        var $modal = $('#modalId');

        $modal.empty();
        $modal.removeClass(toggleModal);
    }

    function sortAction(e) {
        var attribute = $(this).attr('data-type'),
            $inner = $(this).find('.glyphicon'),
            ascendingStyle = 'glyphicon-triangle-top',
            descendingStyle = 'glyphicon-triangle-bottom',
            noneStyle = 'glyphicon-triangle-left',
            toChange = '';

        toChange = attribute === 'name' ? '#buttonPriceSortId' : '#buttonNameSortId';

        $(toChange).find('.glyphicon')
            .removeClass(ascendingStyle)
            .removeClass(descendingStyle)
            .removeClass(noneStyle)
            .addClass(noneStyle);

        switch (sortOrder[attribute]) {
            case 'none':
                {
                    sortOrder[attribute] = 'asc';
                    $inner.removeClass(noneStyle)
                    .addClass(ascendingStyle);
                }
                break;
            case 'asc':
                {
                    sortOrder[attribute] = 'desc';
                    $inner.addClass(descendingStyle)
                    .removeClass(ascendingStyle);
                }
                break;
            case 'desc':
                {
                    sortOrder[attribute] = 'asc';
                    $inner.addClass(ascendingStyle)
                    .removeClass(descendingStyle);
                }
                break;
            default:
                {
                    sortOrder[attribute] = 'none';
                }
        }

        sortOrder.current = attribute;

        currentItems = MYAPP.helpers.sortBy(sortOrder.current, sortOrder[sortOrder.current], currentItems);

        MYAPP.renderer.renderItemTable(currentItems);
    }

    function filterByName(e) {
        filterValue = $('#filterId').val();

        currentItems = MYAPP.helpers.filter(filterValue, MYAPP.storage.getItems());

        currentItems = MYAPP.helpers.sortBy(sortOrder.current, sortOrder[sortOrder.current], currentItems);

        e.preventDefault();

        MYAPP.renderer.renderItemTable(currentItems);
    }

    function validateAction(e) {
        MYAPP.helpers.validateAction($(this));
    }

    function deliveryAction(e) {
        var attribute = $(this).find('option:selected')
            .attr('value'),
            $deliveryGroups = $(this).closest('.form-group')
            .find('.delivery-group'),
            deliveryTargetValue = $('#deliveryCountries').find('input:checked')
            .val();

        MYAPP.helpers.reverseHide($deliveryGroups, attribute, deliveryTargetValue);
    }

    function currencyFormatAction(e) {
        var priceValue = $(this).val();

        if (priceValue) {
            priceValue = MYAPP.helpers.currencyFormatter(priceValue, false);
            if (priceValue) {
                $(this).val(priceValue = priceValue ? priceValue : '');
            }
        }
    }

    function checkAllAction(e) {
        var $checkItems = $(this).closest('.modal-select-group')
            .find('.checkbox input');

        if ($(this).prop('checked') === true) {
            $checkItems.prop('checked', true);
        };
    }

    function preventPaste(e) {
        var data = e.originalEvent.clipboardData.getData('text');

        if (MYAPP.itemValidate.getValidateInt.execute(data)) {
            e.preventDefault();
        }
    };

    return {
        deleteItem: deleteItem,
        editItem: editItem,
        addItem: addItem,
        declineAction: declineAction,
        confirmItemDelete: confirmItemDelete,
        confirmItemUpdate: confirmItemUpdate,
        filterByName: filterByName,
        sortAction: sortAction,
        validateAction: validateAction,
        currencyFormatAction: currencyFormatAction,
        deliveryAction: deliveryAction,
        checkAllAction: checkAllAction,
        preventPaste: preventPaste
    };
})();