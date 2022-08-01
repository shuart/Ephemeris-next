var createCluster = function(initialSchema, options){
    var self = {};
    var currentSchema={}//store full schema
    var currentUUIDS = {} //store current main IDS
    var storageIndexes={}
    var storageUUID={}
    var storage = {}
    let nanoid=(t=21)=>crypto.getRandomValues(new Uint8Array(t)).reduce(((t,e)=>t+=(e&=63)<36?e.toString(36):e<62?(e-26).toString(36).toUpperCase():e>62?"-":"_"),"");

    var setSchema = function(schema){
        const keys = Object.keys(schema);
        keys.forEach((key, index) => {
            console.log(`${key}: ${schema[key]}`);
            var storeName = key;
            var indexValues = schema[key]
            currentSchema[storeName] ={}
            storage[storeName] =[]
            storageUUID[storeName] ={}
            for (let i = 0; i < indexValues.length; i++) {
                const currentIndex = indexValues[i];
                currentSchema[storeName][currentIndex] = true
                if (i==0) {
                    currentSchema[storeName][currentIndex] = "main"
                    currentUUIDS[storeName] = currentIndex
                }
            }
        });
    };

    var add = function (storeName, object) {
        object = addIdIfMissing(storeName, object)
        const objectKeys = Object.keys(object);
        var mainId= undefined
        for (let index = 0; index < objectKeys.length; index++) {
            const currentKey = objectKeys[index];
            var keyValue = currentSchema[storeName][currentKey]
            if (keyValue && keyValue == "main") {
                storageUUID[storeName][ object[currentKey] ] = object
            }
        }
        storage[storeName].push(object)
        persist()
    }

    var addIdIfMissing= function(storeName, object){
        var idKey = currentUUIDS[storeName]
        if(!object[idKey] ){
            object[idKey] = nanoid()
        }
        return object
    }

    var get = function(storeName){
        return{
            where:function(currentKey){
                //Case key is main ID
                if (currentSchema[storeName][currentKey] && currentSchema[storeName][currentKey] == "main") {
                    return {
                        equals:function(value){
                            console.log(storageUUID);
                            return storageUUID[storeName][value]
                        }
                    }
                }

            },
            toArray : function(){
                return storage[storeName]
            }
        }
    }

    var packForLocalStorage = function(){
        return JSON.stringify({currentSchema:currentSchema , currentUUIDS:currentUUIDS, storageIndexes:storageIndexes, storageUUID:storageUUID, storage:storage,})
    }
    var persist = function(){
        if (options.persistence) {
                var currentPersistence = localStorage.setItem('supercluster-'+options.persistence,packForLocalStorage() );
            }
    }

    var addStores = function(initialSchema){
        setSchema(initialSchema)
    }
    
    var init = function(){
        if (initialSchema) {
            setSchema(initialSchema)
        }
        if(options){
            if (options.persistence) {
                var currentPersistence = localStorage.getItem('supercluster-'+options.persistence);
                if (currentPersistence){
                    console.log(currentPersistence);
                    var currentPersistence = JSON.parse(currentPersistence)
                    currentSchema = currentPersistence.currentSchema; currentUUIDS = currentPersistence.currentUUIDS; storageIndexes = currentPersistence.storageIndexes; storageUUID = currentPersistence.storageUUID;storage = currentPersistence.storage;
                }
            }
        }
    }

    init()

    self.addStores=addStores;
    self.add=add;
    self.get=get
    return self
}

export default createCluster


//USAGE

// import createdb from "./vendor/superCluster.js";
// var db = createdb({
//     users:["id","test"]
// })
// console.log(db);
// db.add("users", { name:"testname"})
// db.add("users", {id:'ddds5', name:"testname2"})

// console.log(db.get("users").where("id").equals('ddds5'));
// console.log(db.get("users").toArray());