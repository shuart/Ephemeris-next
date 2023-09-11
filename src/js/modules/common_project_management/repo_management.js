import projectStores from "./project_data_store.js";

var createRepoManagement = function (projectId, rootType, aggregateMethods, customRepoMethods) {
    var self={}
    
    var projectStore = projectStores.getProjectDB(projectId)
    

    var createAggregate = function (root) {
        if (!root) {
            return undefined
        }
        var aggregate = {uuid:root.uuid, name:root.name}//copy main attributes
        aggregate.attributes = root //reference to other attributes
        aggregate = aggregateMethods(aggregate, projectStore)
        //common methods
        aggregate.setName = function (newName) {
            projectStore.add(rootType,{uuid:aggregate.uuid,name:newName })
        }
        return aggregate
    }

    if (customRepoMethods) {
        self = Object.assign(self,customRepoMethods(projectStore,createAggregate) ) //inject custom repo methods
    }
    

    var getAll = function () {
        var allAggregates =[]
        var allRoots =  projectStore.get(rootType).toArray()
        for (let i = 0; i < allRoots.length; i++) {
            const root = allRoots[i];
            var agg = createAggregate(root)
            if (agg) {
                allAggregates.push( agg )
            }
            
        }
        return allAggregates
    }
    var getById = function (uuid) {
        return createAggregate(projectStore.get(rootType).where("uuid").equals(uuid))
    }
    var add = function (data) {
        return projectStore.add(rootType, data)
    }
    var remove = function (uuid) {
        return projectStore.remove(rootType, uuid)
    }
    var update = function (data, props) { 
        if (!props) {//allow data to contains the uuid and the props
            return projectStore.add(rootType, data)
        }else{
            props.uuid = data
            if (projectStore.get(rootType).where("uuid").equals(data)) {
                return projectStore.add(rootType, props)
            }else{
                console.warn("item not found in repo")
            }
            
        }
        
    }
    var setName = function (uuid, value) { 
            var props ={uuid:uuid, name:value}
            if (projectStore.get(rootType).where("uuid").equals(uuid)) {
                return projectStore.add(rootType, props)
            }else{
                console.warn("item not found in repo")
            }
    }
    var setDescription = function (uuid, value) { 
        var props ={uuid:uuid, desc:value}
        if (projectStore.get(rootType).where("uuid").equals(uuid)) {
            return projectStore.add(rootType, props)
        }else{
            console.warn("item not found in repo")
        }
}


    self.getAll = getAll;
    self.getById = getById;
    self.add = add;
    self.remove = remove;
    self.update = update;
    self.setName = setName;
    self.setDescription = setDescription;
    return self;
}

// var entity_management = createEntityManagement(project_management)

export default createRepoManagement