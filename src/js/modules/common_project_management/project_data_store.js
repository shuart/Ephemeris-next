import createdb from "../../vendor/superCluster.js";

var createProjectStore = function(){
    var self={}
    var current = undefined;

    var db = createdb({
        default:["id","test"]
    },{persistence:"projectsStore", crdt:true})
    // },{persistence:"projectsStore"})

    var getAll = function () {
        return db.get("projects").toArray()
    }
    // var addProjectStore =function({
    //     name=undefined,
    // }={}){
    //     console.log(name);
    //     db.add("projects", { name:name})
    // }

    var add = function(){
        
    }

    var setCurrent= function(id){
        console.log("set "+ id +" as current project");
        current=id
    }
    var getCurrent= function(id){
        return db.get("projects").where("id").equals(current)
    }

    var init = function () {
        db.add("default", { name:"test",foo:"baar"})
    }

    init()


    self.getCurrent = getCurrent;
    self.setCurrent= setCurrent;
    // self.addProjectStore = addProjectStore;
    self.getAll= getAll
    return self

}

var projectStores = createProjectStore()

export default projectStores