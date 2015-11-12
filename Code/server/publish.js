Meteor.publish('tasks',function(){
    return tasks.find({});
});