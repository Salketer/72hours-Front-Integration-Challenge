var getTrendClass = function getTrendClass(val){
    var trend_class = '';
    switch(val){
        case CIB.TRENDS.UP:
            trend_class = 'bg-success';
            break;
        case CIB.TRENDS.DOWN:
            trend_class = 'bg-danger';
            break;
        case CIB.TRENDS.STAG:
            trend_class = 'bg-warning';
            break;
        case null:
            trend_class = 'bg-muted';
            break;
    }
    return trend_class;
};


Template.metrics_details.helpers({
   classes:function(){
       if(this.metrics.completion<100){
           return {test:'bg-info',
               maintainability:'bg-info',
               security:'bg-info',
               workmanship:'bg-info'};
       }else{
           return {
               test:getTrendClass(this.metrics.test.trend),
               maintainability:getTrendClass(this.metrics.maintainability.trend),
               security:getTrendClass(this.metrics.security.trend),
               workmanship:getTrendClass(this.metrics.workmanship.trend)
           };
       }
   }
});