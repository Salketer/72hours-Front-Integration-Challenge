Template.test_results.helpers({
    tests:function(){
        var tests = this.tests;
        tests.completion = parseInt(100*tests.pass/(tests.pass+tests.fail),10);

        if(_.isNaN(tests.completion)){
            //TODO find anoter marker...
            tests.completion = '??';
        }

        return tests;
    },
    'class':function(){
        return 'bg-'+CIB.getCompletionClass(this.completion,this.error);
    }
});