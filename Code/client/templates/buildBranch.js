Template.build_branch.helpers({
    end: function () {
        if (this.branch.end) {
            //Only return something if we have something to return.
            return moment(this.branch.end).format(CIB.getDateTimeFormat());
        }
    },
    class: function () {
        //TODO refactor opportunity
        if (this.branch.error) {
            return 'bg-danger';
        } else {
            if (this.build.completion <= 0) {
                return 'bg-muted';
            } else if (this.build.completion >= 100 || this.branch.end) {
                return 'bg-success';
            } else {
                return 'bg-info';
            }
        }
    }
});