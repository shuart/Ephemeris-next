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
        return aggregate
    }

    self = Object.assign(self,customRepoMethods(projectStore,createAggregate) ) //inject custom repo methods

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
    var update = function (data) {
        return projectStore.add(rootType, data)
    }


    self.getAll = getAll;
    self.getById = getById;
    self.add = add;
    self.update = update;
    return self;
}

// var entity_management = createEntityManagement(project_management)

export default createRepoManagement