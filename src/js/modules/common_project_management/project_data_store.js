import createdb from "../../vendor/superCluster.js";

var createProjectStore = function(){
    var self={}
    // var current = undefined;
    var mountedDBs = {}

    // var db = createdb({
    //     default:["id","test"]
    // },{persistence:"projectsStore", crdt:true})
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

    var mountProjectStore = function(projectId){
        if(typeof projectId != 'string'){
            throw console.error('Project ID is not a string and DB cannot be mounted');
        }
        var projectDB = createdb({
            default:["id","test"],
            entities:["id","test"]
        },{persistence:projectId, crdt:true, syncTo:false})
        // },{persistence:projectId, crdt:true, syncTo:"http://127.0.0.1:3000/crdtGeneral"})
        console.trace(projectId)
        console.log(projectId);
        mountedDBs[projectId] = projectDB
        return projectDB
    }

    var getProjectDB = function(projectId){
        if (mountedDBs[projectId]) {
            return mountedDBs[projectId]
        }else{
            return mountProjectStore(projectId)
        }
    }

    // var setCurrent= function(id){
    //     console.log("set "+ id +" as current project");
    //     current=id
    // }
    // var getCurrent= function(id){
    //     return db.get("projects").where("id").equals(current)
    // }

    // var init = function () {
    //     db.add("default", { name:"test",foo:"baar"})
    // }

    // init()


    // self.getCurrent = getCurrent;
    // self.setCurrent= setCurrent;
    // self.addProjectStore = addProjectStore;
    self.getProjectDB= getProjectDB
    self.mountProjectStore= mountProjectStore
    // self.getAll= getAll
    return self

}

var projectStores = createProjectStore()

export default projectStores