'use strict';

var MYAPP = window.MYAPP || {};

MYAPP.renderer = (function() {
    var itemRowHtml = $('#itemRowTemplateId').html(),
        itemTableHtml = $('#itemTableTemplateId').html(),
        modalEditHtml = $('#modalEditId').html(),
        modalDeleteHtml = $('#modalDeleteId').html(),
        countriesSelectHtml = $('#deliveryCountriesId').html(),
        citiesSelectHtml = $('#deliveryCitiesId').html(),

        itemTemplate = _.template(itemRowHtml),
        itemTableTemplate = _.template(itemTableHtml),
        modalEditTemplate = _.template(modalEditHtml),
        modalDeleteTemplate = _.template(modalDeleteHtml),
        countriesSelectTemplate = _.template(countriesSelectHtml),
        citiesSelectTemplate = _.template(citiesSelectHtml);

    function renderItemTable(itemList) {
        var tableHtml = itemTableTemplate({
            itemList: itemList,
            itemTemplate: itemTemplate
        });

        $('#tableRenderId').html(tableHtml);
    }

    function renderModalEdit(item) {
        var modalEditHtml = modalEditTemplate({
            item: item,
            modalEditTemplate: modalEditTemplate
        });

        $('#modalId').html(modalEditHtml);
    }

    function renderCountries(countriesList, itemDeliveries) {
        var countriesSelectHtml = countriesSelectTemplate({
            countriesList: countriesList,
            itemDeliveries: itemDeliveries,
            countriesSelectTemplate: countriesSelectTemplate
        });

        $('#deliveryCountries').html(countriesSelectHtml);
    }

    function renderCities(countriesList) {
        var citiesSelectHtml = citiesSelectTemplate({
            countriesList: countriesList,
            citiesSelectTemplate: citiesSelectTemplate
        });

        $('#deliveryCities').html(citiesSelectHtml);
    }

    function renderModalDelete(itemId) {
        var modalDeleteHtml = modalDeleteTemplate({
            itemId: itemId,
            modalDeleteTemplate: modalDeleteTemplate
        });

        $('#modalId').html(modalDeleteHtml);
    }

    return {
        renderItemTable: renderItemTable,
        renderModalEdit: renderModalEdit,
        renderModalDelete: renderModalDelete,
        renderCountries: renderCountries,
        renderCities: renderCities
    };
})();