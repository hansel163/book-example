/*global $ */

var initialize = function(options) {
    $('input').on('keypress', function () {
        $('.has-error').hide();
    });

    if (options && options.listItemsUrl) {
        var getItems = function () {
            $.get(options.listItemsUrl).then(function (response) {
                var rows = '';
                for (var i=0; i<response.length; i++) {
                    var item = response[i];
                    rows += '\n<tr><td>' + (i+1) + ': ' + item.text + '</td></tr>';
                }
                $('#id_list_table').html(rows);
            });
        };

        var form = $('#id_item_form');

        form.on('submit', function(event) {
            event.preventDefault();
            $.post(options.listItemsUrl, {
                'text': form.find('input[name="text"]').val(),
                'csrfmiddlewaretoken': form.find('input[name="csrfmiddlewaretoken"]').val(),
            }).success(function () {
                getItems();
                $('.has-error').hide();
            }).error(function (xhr) {
                $('.has-error').show();
                $('.has-error .help-block').text(JSON.parse(xhr.responseText).error);
            });
        });

        getItems();
    }

};


window.Superlists = window.Superlists || {};
window.Superlists.Lists = window.Superlists.Lists || {
    initialize: initialize,
};

