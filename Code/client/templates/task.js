var is_id_current_active = function is_id_current_active(id){
    return id == Session.get(CIB.SESSION.OPEN_TASK)
};

Template.task.helpers({
    is_active: function(){
        return is_id_current_active(this._id);
    },
    url:function(){
        if(is_id_current_active(this._id)){
            return '/t/';
        }else{
            return '/t/'+this._id;
        }
    },
    has_details: function () {
        if(this.status == CIB.STATES.DEPLOYED || this.status == CIB.STATES.REJECTED || this.status == CIB.STATES.ACCEPTED || this.status == CIB.STATES.COMPLETE){
            return true;
        }else if(this.status == CIB.STATES.RUNNING){
            return this.metrics.completion >=100;
        }else{
            return false;
        }
    },
    row_atts: function () {
        atts = {class: 'task'};
        switch (this.status) {
            case CIB.STATES.PENDING:
                //no break
            case CIB.STATES.DEPLOYED:
                atts.class += ' text-muted';
                break;
            case CIB.STATES.RUNNING:
                atts.class += ' text-info';
                break;
            case CIB.STATES.REJECTED:
                atts.class += ' text-danger';
                break;
            case CIB.STATES.ACCEPTED:
            //no break
            case CIB.STATES.COMPLETE:
                atts.class += ' text-success';
                break;
            default:
                throw Meteor.Error('unknown status', 'The status value "' + this.status + '" is not recognised.');
                break;
        }
        if (this._id == Session.get(CIB.SESSION.OPEN_TASK)) {
            atts.class += ' active';
        }

        return atts;
    },
    status: function () {
        var label;
        switch (this.status) {
            case CIB.STATES.PENDING:
                label = "Pending";
                break;
            case CIB.STATES.DEPLOYED:
                label = "Deployed";
                break;
            case CIB.STATES.RUNNING:
                label = "Running";
                break;
            case CIB.STATES.REJECTED:
                label = "Rejected";
                break;
            case CIB.STATES.ACCEPTED:
                label = "Accepted";
                break;
            case CIB.STATES.COMPLETE:
                label = "Complete";
                break;
            default:
                throw Meteor.Error('unknown status', 'The status value "' + this.status + '" is not recognised.');
                break;
        }
        return label;
    },
    start: function () {
        if (this.start) {
            return moment(this.start).fromNow();
        }
    },
    full_start: function () {
        if (this.start) {
            return moment(this.start).format(CIB.getDateTimeFormat());
        }
    },
    type_icon: function () {
        var icon_name;
        switch (this.type) {
            case CIB.TASK_TYPES.BUILD:
                icon_name = 'cubes';
                break;
            case CIB.TASK_TYPES.FIREWALL:
                icon_name = 'shield';
                break;
            default:
                throw Meteor.Error('unknown task type', 'The task type value "' + this.type + '" is not recognised.');
                break;
        }
        return icon_name;
    },
    action_status_class: function (action) {
        //TODO find synergy with the task.row_atts helper which handles the same contexts.
        if (action.error) {
            return 'text-danger';
        } else if (parseInt(action.completion, 10) >= 100) {
            return 'text-success';
        } else if (parseInt(action.completion, 10) <= 0) {
            return 'text-muted';
        } else {
            return 'text-info';
        }
    },
    test_result: function (tests) {
        return parseInt(100 * tests.pass / (tests.pass + tests.fail), 10);
    }
});
Template.task.events({
    'click a':function(e){
        // Mirrors the /t/ route from the flowrouter.
        e.preventDefault();
        if(Session.get(CIB.SESSION.OPEN_TASK) == this._id){
            Session.set(CIB.SESSION.OPEN_TASK,null);
        }else{
            Session.set(CIB.SESSION.OPEN_TASK,this._id);
        }
        return false;
    }
});

Template.task.rendered = function() {
    return this.$('.details')[0]._uihooks = {
        insertElement: function(node, next) {
            $(node).addClass('off').insertBefore(next);
            //Timeout so the DOM is rendered at least once with the 'off' class, else the animation won't trigger.
            Meteor.setTimeout(function(){
                $(node).removeClass('off')
            },0);
        },
        removeElement: function(node) {
            var finishEvent;
            //All browser events I could find for transition end.
            finishEvent = 'webkitTransitionEnd oTransitionEnd transitionEnd msTransitionEnd transitionend';

            //Put in a timeout to make sure it is in sync with the insert event.
            //It looks ugly if the animations don't start at the same time.
            Meteor.setTimeout(function(){
                $(node).addClass('off');
                return $(node).on(finishEvent, function() {
                    return $(node).remove();
                });
            },0);

        }
    };
};