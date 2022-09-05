import createdb from "../../vendor/superCluster.js";
import projectStores from "./project_data_store.js";

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
        current=id
    }
    var getCurrent= function(id){
        return db.get("projects").where("id").equals(current)
    }

    var getProjectStore= function(id, type){
        return createProjectStoreGenericFront(id, type)
    }

    var createProjectStoreGenericFront = function (projectId, type) {
        var front = {}
        var projectStore = projectStores.getProjectDB(projectId)

        front.getAll = function () {
            return projectStore.get(type).toArray()
        }
        front.getById = function (uuid) {
            return projectStore.get(type).where("uuid").equals(uuid)
        }
        front.add = function (data) {
            return projectStore.add(type, data)
        }
        front.update = function (data) {
            return projectStore.add(type, data)
        }

        return front;
    }


    self.getProjectStore = getProjectStore;
    self.getCurrent = getCurrent;
    self.setCurrent= setCurrent;
    self.add = add;
    self.getAll= getAll
    return self

}

var projectManagement = createProjectManagement()

export default projectManagement