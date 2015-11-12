Template.task_result.helpers({
    state: function () {
        var state = {};
        switch (this.status) {
            case CIB.STATES.COMPLETE:
                state.info = 'Complete';
                state.template = 'deploy';
                state.class = 'text-success';
                break;
            case CIB.STATES.DEPLOYED:
                state.label = 'Deployed to';
                state.info = CIB.getDeploymentName(this.deployed);
                state.class = 'text-muted';
                break;
            case CIB.STATES.ACCEPTED:
                state.label = 'Change Accepted';
                state.info = 'Auto-Merged';
                state.template = 'see_merge';
                state.class = 'text-warning';
                break;
            case CIB.STATES.PENDING:
                state.label = 'Task Pending';
                state.class = 'text-muted';
                break;
            case CIB.STATES.REJECTED:
                state.label = 'Change Rejected';
                state.template = 'see_issues';
                if (this.metrics.error) {
                    state.info = 'Metrics Reduction';
                }
                else if (this.build.error) {
                    state.info = 'Not Buildable';
                } else if (this.test.error) {
                    state.info = 'Unit Tests Failed';
                } else if (this.functional.error) {
                    state.info = 'Functional Tests Failed';
                } else {
                    state.info = 'Unknown error';
                }
                state.class = 'text-danger';
                break;

            case CIB.STATES.RUNNING:
                state.label = 'Running...';
                if (this.metrics.completion < 100) {
                    state.info = 'Calculating Metrics';
                }
                else if (this.build.completion < 100) {
                    state.info = 'Building Application';
                } else if (this.unit.completion < 100) {
                    state.info = 'Running Unit Tests';
                } else {
                    state.info = 'Running Functional Tests';
                }
                //TODO check with the back-end to make sure we can't be in running state and have everything completed
                state.class = 'text-info';
                break;

        }
        return state;
    }

});

Template.see_merge.events({
    'click #mergeButton': function () {
        Session.set(CIB.SESSION.OPEN_TASK, this.build_task);
    }
});
Template.deploy.helpers({
    'deployments': function () {
        return CIB.DEPLOYMENTS;
    }
});
Template.deploy.events({
    'submit #deployForm': function (e) {
        e.preventDefault();
        var deploy_to = $(e.target).find('[name="deploy_to"]').val();
        BootstrapModalPrompt.prompt({
                title: 'Confirm deployment',
                content: 'You are about to deploy "' + this.label + '" to "' + CIB.getDeploymentName(deploy_to) + '". Are you sure?'
            }, function (deploy_to, doc_id) {
                return function (result) {
                    if (result) {
                        tasks.update(doc_id, {$set: {status: CIB.STATES.DEPLOYED, deployed: deploy_to}});
                    }
                    else {
                        // User did not confirm, do nothing.
                    }
                }
            }(deploy_to, this._id)
        );
        return false;
    }
});