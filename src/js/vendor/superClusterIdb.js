var nanoid = (t=21)=>crypto.getRandomValues(new Uint8Array(t)).reduce(((t,e)=>t+=(e&=63)<36?e.toString(36):e<62?(e-26).toString(36).toUpperCase():e>62?"-":"_"),"");

export var createIDBStore = async function(dbname){
    var self ={}
    var db =undefined

    var init = async function(){
        db = await startDb(dbname)

        // setTimeout(function () {
        //     set({uuid:nanoid(),value:"testes" })
        // },5000)
        
    }

    // var set =function(data){
    //     var id = "i"+nanoid()
    //     if (!data.uuid) { //provide data uuid or update the current one
    //         var imageObject = {uuid:id, dataUri:data}
    //         setImageToIdb(imageObject)
    //     }else{
    //         id = data.uuid //already is an image object
    //         updateImageToIdb(data)
    //     }
        
    //     return id
    // }

    var get =function(uuid, callback){
        if (!db) {
            setTimeout(function () {
                getFromIdb(uuid, callback) //wait for idb to be setup and cancel operation if not loaded yet
            },2000)
        }else{
            getFromIdb(uuid, callback)
        }
        
    }
    var getAll =function(callback){
        if (!db) {
            setTimeout(function () { return getAllfromIdb(callback) },2000) //wait for idb to be setup and cancel operation if not loaded yet
        }else{
            return getAllfromIdb(callback)
        }
        
    }
    var add =function(crdt, callback){
        // var result = undefined
        if (!db) {
            setTimeout(function () {
                return addToDb(crdt) //wait for idb to be setup and cancel operation if not loaded yet
            },2000)
        }else{
            return addToDb(crdt)
        }
    }

    var addBulk =function(crdt, callback){
        if (!db) {
            setTimeout(function () {
                return addBulkToDb(crdt) //wait for idb to be setup and cancel operation if not loaded yet
            },2000)
        }else{
            return addBulkToDb(crdt)
        }
    }
    

    var getFromIdb = function(uuid, callback){
        const transaction = db.transaction(["images"]);
        const objectStore = transaction.objectStore("images");
        const request = objectStore.get(uuid);
        request.onerror = (event) => {
          // Handle errors!
        };
        request.onsuccess = (event) => {
          // Do something with the request.result!
          callback(request.result)
        };
        return uuid
    }
    var getAllfromIdb = function (callback) {
        const transaction = db.transaction(["crdts"]);
        const objectStore = transaction.objectStore("crdts");
        return new Promise((resolve, reject) => {
            objectStore.getAll().onsuccess = (event) => {
                console.log(`Got all : ${event.target.result}`);
                if (callback) {
                    callback(event.target.result) 
                }
                resolve(event.target.result)
            };
        });
        
    }
    var addToDb = function(crdt){
        return new Promise((resolve, reject) => {

            const transaction = db.transaction(["crdts"], "readwrite");
            transaction.oncomplete = (event) => {
                console.log("All done!");
            };
            transaction.onerror = (event) => {
                console.error(event);
                reject()
            };
            const objectStore = transaction.objectStore("crdts");
            console.log(crdt);
            const request = objectStore.add(crdt);
            request.onsuccess = (event) => {
                console.log(event);
                resolve(event.target.result)
                // event.target.result === customer.ssn;
            };

        });
    }
    var addBulkToDb = function(crdts){
        return new Promise((resolve, reject) => {

            const transaction = db.transaction(["crdts"], "readwrite");
            transaction.oncomplete = (event) => {
                resolve(event)
                console.log("All done!");
            };
            transaction.onerror = (event) => {
                console.error(event);
            };
            const objectStore = transaction.objectStore("crdts");
            for (let i = 0; i < crdts.length; i++) {
                objectStore.add(crdts[i]);
                
            }

        });
        
        // request.onsuccess = (event) => {
        //     console.log(event);
        //     return event.target.result
        //     // event.target.result === customer.ssn;
        // };
    }
    // var updateImageToIdb = function(imageObject){
        
    //     const objectStore = db.transaction(["images"], "readwrite").objectStore("images");
    //     const request = objectStore.get(imageObject.uuid);
    //     request.onerror = (event) => {
    //         console.error(event);
    //     };
    //     request.onsuccess = (event) => {
    //         const data = event.target.result;
    //         data.dataUri = imageObject.dataUri;
    //         const requestUpdate = objectStore.put(data);
    //         requestUpdate.onerror = (event) => {
    //             console.error(event);
    //         };
    //         requestUpdate.onsuccess = (event) => {
    //             console.log(event);
    //         };
    //     };

    // }

    function cleanOldMessages(cleanBefore) {

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
      
        storageCrdt = cleanedMessages
    }

    var clear =function(){
        if (!db) {
            setTimeout(function () {
                clearDb() //wait for idb to be setup and cancel operation if not loaded yet
            },2000)
        }else{
            clearDb()
        }
        
    }

    function clearDb() {
        // open a read/write db transaction, ready for clearing the data
        const transaction = db.transaction(["crdts"], "readwrite");
        // report on the success of the transaction completing, when everything is done
        transaction.oncomplete = (event) => {
            console.log("Done");
        };
        transaction.onerror = (event) => {
            console.error(`Database error: ${event.target.errorCode}`);
        };
        // create an object store on the transaction
        const objectStore = transaction.objectStore("crdts");

        // Make a request to clear all the data out of the object store
        const objectStoreRequest = objectStore.clear();

        objectStoreRequest.onsuccess = (event) => {
            // report the success of our request
            console.log("store cleared");
        };
        
    }


    var startDb = function(dbname){
        return new Promise((resolve, reject) => {

            const request = indexedDB.open("supercluster-crdt-"+dbname);
            request.onerror = (event) => {
                console.error(`Database error: ${event.target.errorCode}`);
            };
            request.onsuccess = (event) => {
                // db = event.target.result;
                resolve(event.target.result)
            };
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                const objectStore = db.createObjectStore("crdts", { autoIncrement: true });
                // const objectStore = db.createObjectStore("crdts", { keyPath: "row" });
            
                objectStore.createIndex("dataset", "dataset", { unique: false });
            
                // Use transaction oncomplete to make sure the objectStore creation is
                // finished before adding data into it.
                objectStore.transaction.oncomplete = (event) => {
                console.log("Done");
                };
            };
            

        });
        
    }

    await init()


    self.clear = clear
    self.add = add
    self.addBulk = addBulk
    self.getAll = getAll
    // self.set = set
    return self
}