Session.setDefault(CIB.SESSION.SORT, {start: -1});

Session.setDefault(CIB.SESSION.OPEN_TASK, null);

Template.app_body.rendered = function () {
    var UP = 38;
    var DOWN = 40;
    $(window).on('keyup', function (e) {
        var key;
        if (window.event) {
            // IE
            key = e.keyCode;
        }else if (e.which) {
            key = e.which;
        }
        if (key == UP) {
            $('tr.active').prev().prev().find('a').click();
        } else if(key==DOWN) {
            $('tr.active').next().next().find('a').click();
        }

    });
};

Template.app_body.helpers({
    tasks: function () {
        if (Session.get(CIB.SESSION.SORT).start) {
            //If we are sorting by start, we'll face a problem with nulls being treated close to 0
            //therefore showing at the wrong end of the ordered list.

            //TODO: ask around if this can be done another way...
            //Fetching nulls and ordered non-nulls and then merging.
            var nulls = tasks.find({start: null});
            var others_ordered = tasks.find({start: {$not: null}}, {sort: Session.get(CIB.SESSION.SORT)});
            if (Session.get(CIB.SESSION.SORT).start == -1) {
                return nulls.fetch().concat(others_ordered.fetch());
            } else {
                return others_ordered.fetch().concat(nulls.fetch());
            }
        }
        return tasks.find({}, {sort: Session.get(CIB.SESSION.SORT)});
    },
    caret: function () {
        var fields = ['start', 'label', 'owner', 'status'];
        var sort = Session.get(CIB.SESSION.SORT);
        var carets = {};
        for (i = 0; i < fields.length; i++) {
            sort_name = fields[i];
            if (!_.isUndefined(sort[sort_name])) {
                carets[sort_name] = sort[sort_name] > 0 ? 'caret_up' : 'caret_down';
            } else {
                carets[sort_name] = null;
            }
        }
        return carets;
    }
});
Template.app_body.events({
    'click th[data-orderby]': function (e) {
        var sort = $(e.target).data('orderby');
        var newsort = {};
        if (Session.get(CIB.SESSION.SORT)[sort]) {
            newsort[sort] = Session.get(CIB.SESSION.SORT)[sort] * -1
        } else {
            if (sort != 'start') {
                newsort[sort] = 1;
            } else {
                //start sorting start in descending order.
                newsort[sort] = -1;
            }
        }
        Session.set(CIB.SESSION.SORT, newsort);
    }
});