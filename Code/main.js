if (Meteor.isClient) {
    Template.icon.helpers({
        code: function () {
            // Can be used with multiple named params, or one unnamed.

            //If the named does not exist, THIS equals to the unnamed one.
            if (_.isUndefined(this.iconname)) {
                iconname = this;
            } else {
                iconname = this.iconname;
            }
            //when passed an empty param, THIS becomes an empty object so we cannot test null.
            if (_.isEmpty(iconname)) {
                return '';
            } else {
                if (_.isUndefined(CIB.ICON_CHARACTERS[iconname])) {
                    throw new Meteor.Error('unknown icon', 'The icon name "' + iconname + '" is not defined.');
                }
                return CIB.ICON_CHARACTERS[iconname];
            }
        }
    });
    Template.bar_graph.helpers({
        homemade: function () {
            return this.homemade;
        },
        width: function () {
            if (_.isUndefined(completion)) {
                var completion = this.completion;
            }
            return parseInt(completion, 10) + '%';
        },
        class: function () {
            if (this.error) {
                return 'progress-bar-danger';
            } else if (parseInt(this.completion, 10) < 100) {
                //No need to check for 0 or lower, the bar won't be visible anyways.
                return 'progress-bar-info active progress-bar-striped';
            } else {
                return 'progress-bar-success';
            }
        }
    });
    Template.body.events({
        'click #reset': function () {
            Meteor.call('reset');
        }
    });
}
if (Meteor.isServer) {
    Meteor.methods({
        'reset': function () {
            CIB.startupScript();
        }
    });
}