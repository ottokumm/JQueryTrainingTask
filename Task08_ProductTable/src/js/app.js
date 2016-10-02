'use strict';

var MYAPP = window.MYAPP || {};

(function() {
    var $tableRender = $('#tableRenderId'),
        $itemList = $('#itemList'),
        $header = $('#header'),
        $modal = $('#modalId');

    MYAPP.renderer.renderItemTable(MYAPP.storage.getItems());

    $tableRender.on('click', '.deleteBtn', MYAPP.handlers.deleteItem);
    $tableRender.on('click', '.editBtn', MYAPP.handlers.editItem);

    $itemList.on('click', '.button-sort', MYAPP.handlers.sortAction);

    $header.on('click', '.filterBtn', MYAPP.handlers.filterByName);
    $header.on('click', '.addBtn', MYAPP.handlers.addItem);

    $modal.on('click', '.confirmUpdateBtn', MYAPP.handlers.confirmItemUpdate);
    $modal.on('click', '.confirmBtn', MYAPP.handlers.confirmItemDelete);
    $modal.on('click', '.declineBtn', MYAPP.handlers.declineAction);

    $modal.on('blur', '.validate', MYAPP.handlers.validateAction);

    $modal.on('focus', '.currency', MYAPP.handlers.currencyFormatAction);

    $modal.on('change', '#deliveryId', MYAPP.handlers.deliveryAction);

    $modal.on('change', '.checkAll', MYAPP.handlers.checkAllAction);

    $modal.on('paste', '#itemCountIdField', MYAPP.handlers.preventPaste);
})();