import createdb from "../../vendor/superCluster.js";

var createProjectManagement = function(){
    var self={}
    var current = undefined;

    var db = createdb({
        projects:["id","test"]
    },{persistence:"projects"})

    var getAll = function () {
        return db.get("projects").toArray()
    }
    var add =function({
        name=undefined,
        email=undefined,
        password=undefined,
    }={}){
        console.log(name);
        db.add("projects", { name:name})
    }

    var setCurrent= function(id){
        console.log("set "+ id +" as current project");
        currentUser=id
    }
    var getCurrent= function(id){
        return db.get("projects").where("id").equals(current)
    }


    self.getCurrent = getCurrent;
    self.setCurrent= setCurrent;
    self.add = add;
    self.getAll= getAll
    return self

}

var projectManagement = createProjectManagement()

export default projectManagement