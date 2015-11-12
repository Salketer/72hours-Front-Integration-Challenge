//FlowRouter does not support IE8... Too bad
//https://github.com/kadirahq/flow-router/issues/264
//TODO check for IE8 support regularly. Last check: 09/20/2015
/*
 FlowRouter.route('/t/:taskId', {
 action: function (params) {
 Session.set(CIB.SESSION.OPEN_TASK, params.taskId);
 }
 });
 FlowRouter.route('/t/', {
 action: function (params) {
 Session.set(CIB.SESSION.OPEN_TASK, null);
 }
 });
 FlowRouter.route('/', {
 action: function () {
 }
 });
 */
if (Meteor.isServer) {
    FastRender.route('/', function () {
        this.subscribe('tasks');
    });
}