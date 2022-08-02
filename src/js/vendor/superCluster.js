var createCluster = function(initialSchema, options){
    var self = {};
    var useCrdt = false;
    var currentSchema={}//store full schema
    var currentUUIDS = {} //store current main IDS
    var storageIndexes={}
    var storageUUID={}
    var storageCrdt =[]
    var storage = {}
    let nanoid=(t=21)=>crypto.getRandomValues(new Uint8Array(t)).reduce(((t,e)=>t+=(e&=63)<36?e.toString(36):e<62?(e-26).toString(36).toUpperCase():e>62?"-":"_"),"");

    //in-memory JSON
    var setSchema = function(schema){
        const keys = Object.keys(schema);
        keys.forEach((key, index) => {
            console.log(`${key}: ${schema[key]}`);
            var storeName = key;
            var indexValues = schema[key]
            currentSchema[storeName] = {}
            storage[storeName] = []
            storageUUID[storeName] = {}
            // storageCrdt[storeName] = []
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
        if (useCrdt) {
            updateCrdt(storeName, object);
        }else{
            addJson(storeName, object);
        }
        persist()
    }

    var addJson = function(storeName, object){
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
        var pack = {};
        pack = {currentSchema:currentSchema , currentUUIDS:currentUUIDS, storageIndexes:storageIndexes, storageUUID:storageUUID, storage:storage,storageCrdt:storageCrdt};
        return JSON.stringify(pack)
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
            if (options.crdt) { useCrdt = true; }
            if (options.persistence) {
                var currentPersistence = localStorage.getItem('supercluster-'+options.persistence);
                if (currentPersistence){
                    console.log(currentPersistence);
                    var currentPersistence = JSON.parse(currentPersistence)
                    currentSchema = currentPersistence.currentSchema; currentUUIDS = currentPersistence.currentUUIDS; storageIndexes = currentPersistence.storageIndexes; storageUUID = currentPersistence.storageUUID;storage = currentPersistence.storage;storageCrdt=currentPersistence.storageCrdt
                }
            }
        }
    }

    //CRDT

    // function insert(table, row) {
    //     let id = nanoid();
    //     let fields = Object.keys(row);
    //     sendMessages(
    //         fields.map(k => {
    //             return {
    //                 dataset: table,
    //                 row: row.id || id,
    //                 column: k,
    //                 value: row[k],
    //                 timestamp: Date.now()
    //             };
    //         })
    //     );
    //     return id;
    // }
    function updateCrdt(storeName, params) {
        var potentialId = nanoid()
        var idKey = currentUUIDS[storeName]
        let fields = Object.keys(params).filter(k => k !== idKey);
        sendMessages(
          fields.map(k => {
            return {
              dataset: storeName,
              row: params[idKey] || potentialId,
              column: k,
              value: params[k],
              timestamp: Date.now()
            };
          })
        );
      }
    function deleteCrdt(storeName, id) {
        sendMessages([
            {
            dataset: storeName,
            row: id,
            column: 'tombstone',
            value: 1,
            timestamp: Date.now()
            }
        ]);
    }
    function sendMessages(messages) {
        applyMessages(messages);
        // sync(messages);
    }
    function applyMessages(messages) {
        let existingMessages = compareMessages(messages);
        // let clock = getClock();
        messages.forEach(msg => {
          let existingMsg = existingMessages.get(msg);
      
          if (!existingMsg || existingMsg.timestamp < msg.timestamp) {
            apply(msg);
          }
      
          if (!existingMsg || existingMsg.timestamp !== msg.timestamp) {
            // clock.merkle = merkle.insert(
            //   clock.merkle,
            //   Timestamp.parse(msg.timestamp)
            // );
            storageCrdt.push(msg);
          }
        });
      
        // _onSync && _onSync();
    }
    function apply(msg) {
        var storeName = msg.dataset;
        var idKey = currentUUIDS[storeName]
        let table = storage[msg.dataset];
        if (!table) {
          throw new Error('Unknown dataset: ' + msg.dataset);
        }

        if (!storageUUID[storeName][msg.row]) { //check if object is already in store
            var newObject = { [msg.column]: msg.value }
            newObject[idKey]=msg.row
            addJson(msg.dataset, newObject);
        }else{
            storageUUID[storeName][msg.row][msg.column]= msg.value;
        }
        console.log("messages")
        console.log(storageCrdt)
        console.log(storage)
        // let row = table.find(row => row.id === msg.row);
        // if (!row) {
        //   table.push({ id: msg.row, [msg.column]: msg.value });
        // } else {
        //   row[msg.column] = msg.value;
        // }
      }
    function compareMessages(messages) {
        let existingMessages = new Map();
      
        let sortedMessages = [...storageCrdt].sort((m1, m2) => {
          if (m1.timestamp < m2.timestamp) {
            return 1;
          } else if (m1.timestamp > m2.timestamp) {
            return -1;
          }
          return 0;
        });
      
        messages.forEach(msg1 => {
          let existingMsg = sortedMessages.find(
            msg2 =>
              msg1.dataset === msg2.dataset &&
              msg1.row === msg2.row &&
              msg1.column === msg2.column
          );
      
          existingMessages.set(msg1, existingMsg);
        });
      
        return existingMessages;
    }


    //OUTPUT & INIT

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