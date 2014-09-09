if (Meteor.isClient) {

    Template.generate.events({
        'click .js-btn-client': function (event, template) {
            Notifications.addNotification(template.find('.js-title').value, template.find('.js-msg').value, {type:parseInt(template.find('.js-level').value, 10), timeout: parseInt(template.find('.js-timeout').value, 10), userCloseable: template.find('.js-closeable').checked  });
        }
    });

    Template.generate.types = function () {
        var returnValue = [];

        _.each(Notifications.TYPES, function (i, k) {
           returnValue.push({name:k, value: i});
        });
        return returnValue;
    };
}

