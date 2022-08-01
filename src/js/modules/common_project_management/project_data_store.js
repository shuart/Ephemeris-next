import createdb from "../../vendor/superCluster.js";

var createProjectStore = function(){
    var self={}
    var current = undefined;

    var db = createdb({
        default:["id","test"]
    },{persistence:"projectsStore"})

    var getAll = function () {
        return db.get("projects").toArray()
    }
    var addProjectStore =function({
        name=undefined,
        email=undefined,
        password=undefined,
    }={}){
        console.log(name);
        db.add("projects", { name:name})
    }

    var setCurrent= function(id){
        console.log("set "+ id +" as current project");
        current=id
    }
    var getCurrent= function(id){
        return db.get("projects").where("id").equals(current)
    }


    self.getCurrent = getCurrent;
    self.setCurrent= setCurrent;
    self.addProjectStore = addProjectStore;
    self.getAll= getAll
    return self

}

var projectStore = createProjectStore()

export default projectStore