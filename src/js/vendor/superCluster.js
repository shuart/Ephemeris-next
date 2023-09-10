import { createIDBStore } from "./superClusterIdb.js";

var createCluster = function(initialSchema, options){
    var self = {};
    var useCrdt = false;
    var currentSchema={}//store full schema
    var currentUUIDS = {} //store current main IDS
    var storageIndexes={}
    var storageUUID={}
    var storageCrdt =[]
    var storageIsReady = undefined
    var storage = {}
    var subscribers = []
    var idbBufferStorage = []
    var idbStorage = undefined
    var _syncEnabled =false
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
        notifyChange()
    }

    var remove = function (storeName, id) {
        if (storageUUID[storeName][id]) {
            if (useCrdt) {
                deleteCrdt(storeName, id);
            }else{
                deleteJson(storeName, id);
            }
            persist()
        }else{
            alert("record does not exist")
        }
        notifyChange()
        
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
    var deleteJson = function(storeName, id){
        storageUUID[storeName][id]["tombstone"]= 1;
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
                            // console.log(storageUUID);
                            var toReturn = storageUUID[storeName][value]
                            if (toReturn &&  toReturn["tombstone"] != 1) {
                                return storageUUID[storeName][value]
                            }else{
                                return undefined
                            }
                        }
                    }
                }else{ //if another key
                    return {
                        equals:function(value){
                            var exportList=[]
                            for (let i = 0; i < storage[storeName].length; i++) {
                                const element = storage[storeName][i];
                                if (element[currentKey] == value && element["tombstone"] != 1) {exportList.push(element) }
                            }
                            console.log(exportList);
                            return exportList;
                        }
                    } 
                }

            },
            toArray : function(){
                var exportList=[]
                for (let i = 0; i < storage[storeName].length; i++) {
                    if (storage[storeName][i]["tombstone"] != 1) {exportList.push(storage[storeName][i]) }//TODO check if tombstone removal could be done before
                }
                return exportList;
                // return storage[storeName]
            }
        }
    }

    var packForLocalStorage = function(){
        var pack = {};
        // pack = {currentSchema:currentSchema , currentUUIDS:currentUUIDS, storageIndexes:storageIndexes, storageUUID:storageUUID, storage:storage,storageCrdt:storageCrdt};
        pack = {currentSchema:currentSchema , currentUUIDS:currentUUIDS, storageIndexes:storageIndexes, storageUUID:undefined, storage:storage,storageCrdt:undefined};
        return JSON.stringify(pack)
    }
    var persist = function(){
        if (options.persistence) {
            var currentPersistence = localStorage.setItem('supercluster-'+options.persistence,packForLocalStorage() );
            if (useCrdt) { //use idb for crdt
                // var currentPersistence = localStorage.setItem('supercluster-'+options.persistence,packForLocalStorage() );
                // alert(storageCrdt[storageCrdt.length-1].row)
                while (idbBufferStorage.length > 0) { //TODO buffer should be emptied even when idb is not used
                    idbStorage.add(idbBufferStorage.shift()) //clear the current idb buffer
                    //TODO use addBulk
                    // idbStorage.add(storageCrdt[storageCrdt.length-1])
                }
                
                
            }
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
            if (useCrdt) {
                storageIsReady =  new Promise(async (resolve, reject) => { //if idb is used wrap everything in a promise
                    if (!idbStorage) { idbStorage = await  createIDBStore(options.persistence)}//setup IDB storage
                    storageCrdt =  await idbStorage.getAll()
                    resolve(true)
                });
            }
            if (options.syncTo) { _syncEnabled = options.syncTo; }
            if (options.persistence) {
                
                var currentPersistence = localStorage.getItem('supercluster-'+options.persistence);
                if (currentPersistence){
                    console.log(currentPersistence);
                    var currentPersistence = JSON.parse(currentPersistence)
                    var newIndexedStorage = rebuildIndexes(currentPersistence.currentUUIDS, currentPersistence.storage)
                    // currentSchema = currentPersistence.currentSchema; currentUUIDS = currentPersistence.currentUUIDS; storageIndexes = currentPersistence.storageIndexes; storageUUID = newIndexedStorage ;storage = currentPersistence.storage;storageCrdt=currentPersistence.storageCrdt
                    currentSchema = currentPersistence.currentSchema; currentUUIDS = currentPersistence.currentUUIDS; storageIndexes = currentPersistence.storageIndexes; storage = currentPersistence.storage;
                    storageUUID = newIndexedStorage ;
                    // var migration = false
                    // if (migration && useCrdt && currentPersistence.storageCrdt && currentPersistence.storageCrdt[0]) { //TODO, remove after migration to idb
                    //     storageIsReady =  new Promise(async (resolve, reject) => { //if idb is used wrap everything in a promise
                    //         if (!idbStorage) { //setup IDB storage
                    //             idbStorage = await  createIDBStore(options.persistence)
                    //             // storageIsReady = Promise.all([idbStorage])
                    //         }
                    //         console.log(idbStorage);
                    //         idbStorage.clear()
                    //         await idbStorage.addBulk(currentPersistence.storageCrdt)
                    //         storageCrdt =  await idbStorage.getAll()
                    //         resolve(true)
                    //     });
                    // }else 
                    
                }
                updatePersitenceSchema(currentSchema,initialSchema)
                if (options.autoclean) { //clean the crdt in persitence
                    cleanOldMessages()
                }
            }
        }
    }

    var exportLocalStorage = async function(){
        // var ls =  localStorage.getItem('supercluster-'+options.persistence);
        var ls = {currentSchema:currentSchema , currentUUIDS:currentUUIDS, storageIndexes:storageIndexes, storageUUID:undefined, storage:storage,storageCrdt:undefined};
        var crdt = undefined
        if (useCrdt) {
            crdt = await idbStorage.getAll()
            crdt = compactCrdts(crdt)
        }
        return JSON.stringify({ls, crdt})
    }

    var importToLocalStorage = async function (template, uuid) {
        //TODO transfer to an helper function
    }

    var updatePersitenceSchema = function(currentSchema, initialSchema){
        //When a schema is updated this function compare the saved persitence schema with it and fill the missing elements
        for (const store in initialSchema) {
            var needsUpdate = false;
            var missingSchemaParts={};
            if (Object.hasOwnProperty.call(initialSchema, store)) {
                if (!currentSchema[store]) {
                    alert("Store '"+ store+ "'is missing. Update DB?")
                    missingSchemaParts[store]=initialSchema[store]
                    needsUpdate =true;
                }
                if (needsUpdate) {
                    setSchema(missingSchemaParts)
                }
            }
        }
    }

    var rebuildIndexes = function (currentUUIDSFromPersistence, storageFromPersistence) {
        // currentUUIDS[storeName]
        var storeWithIndexes = {}
        for (const store in storageFromPersistence) {
            if (Object.hasOwnProperty.call(storageFromPersistence, store)) {
                const currentStore = storageFromPersistence[store]; //get the operating storage
                storeWithIndexes[store] = {}
                var currentMainIndex = currentUUIDS[store] //get the main key of the current store
                for (let i = 0; i < currentStore.length; i++) {
                    const element = currentStore[i];
                    storeWithIndexes[store][ element[currentMainIndex] ] = element //map the id to the object
                }
            }
        }
        return storeWithIndexes
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
        sync(messages);
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
            idbBufferStorage.push(msg);
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
        console.log(storageUUID)
        console.log(storage)
        // alert()
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

    function compactCrdts(storageCrdt, cleanBefore) {
        let before = cleanBefore || Date.now()
        let cleanedMessages =[]
        let keptSignature ={}
      
        let sortedMessages = [...storageCrdt].sort((m1, m2) => {
          if (m1.timestamp < m2.timestamp) {
            return 1;
          } else if (m1.timestamp > m2.timestamp) {
            return -1;
          }
          return 0;
        });
        //go through sorted messages and add them  in the cleanedMessages, if not already in keptSignature or if is a thombstone
        sortedMessages.forEach(msg =>{
                var signature = msg.dataset + msg.row +msg.column
                if (msg.timestamp >= before) {
                    cleanedMessages.push(msg)
                } else if( !keptSignature[signature] ){
                    keptSignature[signature] = msg
                    cleanedMessages.push(msg)
                } else if (msg.column == 'tombstone'){
                    cleanedMessages.push(msg)
                }
            }

        )
        return cleanedMessages
    }

    function cleanOldMessages(storageCrdt, cleanBefore) {
        storageCrdt = compactCrdts()
    }

    //SYNC
    async function sync(initialMessages = [], since = null) {
        if (!_syncEnabled) {
            return;
        }
        
        let messages = initialMessages;
        
        // if (since) {
        //     let timestamp = new Timestamp(since, 0, '0').toString();
        //     messages = _messages.filter(msg => msg.timestamp >= timestamp);
        // }
        
        let result;
        try {
            result = await post({
            group_id: 'my-group',
            // client_id: getClock().timestamp.node(),
            messages,
            // merkle: getClock().merkle
            });
        } catch (e) {
            console.log(e);
            throw new Error('network-failure');
        }
        
        if (result.messages.length > 0) {
            receiveMessages(result.messages);
        }
        
        // let diffTime = merkle.diff(result.merkle, getClock().merkle);
        
        // if (diffTime) {
        //     if (since && since === diffTime) {
        //     throw new Error(
        //         'A bug happened while syncing and the client ' +
        //         'was unable to get in sync with the server. ' +
        //         "This is an internal error that shouldn't happen"
        //     );
        //     }
        
        //     return sync([], diffTime);
        // }
    }
    async function post(data) {
        console.log("sync in progress");
        let res = await fetch(_syncEnabled, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json'
            }
        });
        // console.log(await res.json());
        console.log( res.status);

        var resdata = await res.json();
        console.log( resdata);
        if (res.status !== 200) {
            throw new Error('API error: ' + res.reason);
        }
        return resdata;
    }
    function receiveMessages(messages) {
        // messages.forEach(msg =>
        //     Timestamp.recv(getClock(), Timestamp.parse(msg.timestamp))
        // );
        
        applyMessages(messages);
    }

    function notifyChange(data){
        for (let i = 0; i < subscribers.length; i++) {
            subscribers[i].callback(data);
            
        }
        //use global event
        const event = new CustomEvent('cluster_update', { detail: {} });
        window.dispatchEvent(event);
    }
    function subscribeToChange(id, callback) {
        subscribers.push({id, callback})
    }
    function isStorageReady() {
        return storageIsReady
    }


    //OUTPUT & INIT

    init()

    self.isStorageReady=isStorageReady
    self.exportLocalStorage=exportLocalStorage
    self.addStores=addStores;
    self.add=add;
    self.remove=remove
    self.get=get
    self.subscribeToChange=subscribeToChange
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