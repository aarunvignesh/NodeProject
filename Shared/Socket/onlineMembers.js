/**
 * Created by EMD on 5/4/2015.
 */
module.exports=function(list){
    var names=[];
    var iterations=Object.keys(list);
    iterations.forEach(function(obj){
        var name={};
        name.username=list[obj].username;
        name.name=list[obj].name;
        name.status=list[obj].status;
        names.push(name);
    });
    return names;
};