var nanoid = (t=21)=>crypto.getRandomValues(new Uint8Array(t)).reduce(((t,e)=>t+=(e&=63)<36?e.toString(36):e<62?(e-26).toString(36).toUpperCase():e>62?"-":"_"),"");

var createImageStore =function(){
    var self ={}
    var db =undefined

    var init = function(){
        startDb()

        // setTimeout(function () {
        //     set({uuid:nanoid(),value:"testes" })
        // },5000)
        
    }

    var set =function(data){
        var id = nanoid()
        if (!data.uuid) { //provide data uuid or update the current one
            var imageObject = {uuid:id, dataUri:data}
            setImageToIdb(imageObject)
        }else{
            id = data.uuid //already is an image object
            updateImageToIdb(data)
        }
        
        return id
    }

    var get =function(uuid, callback){
        if (!db) {
            setTimeout(function () {
                getFromIdb(uuid, callback) //wait for idb to be setup and cancel operation if not loaded yet
            },2000)
        }else{
            getFromIdb(uuid, callback)
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
    var setImageToIdb = function(imageObject){
        
        const transaction = db.transaction(["images"], "readwrite");
        transaction.oncomplete = (event) => {
            console.log("All done!");
        };
        transaction.onerror = (event) => {
            console.error(event);
        };
        const objectStore = transaction.objectStore("images");

        const request = objectStore.add(imageObject);
        request.onsuccess = (event) => {
            console.log(event);
            return event.target.result
            // event.target.result === customer.ssn;
        };
    }
    var updateImageToIdb = function(imageObject){
        
        const objectStore = db.transaction(["images"], "readwrite").objectStore("images");
        const request = objectStore.get(imageObject.uuid);
        request.onerror = (event) => {
            console.error(event);
        };
        request.onsuccess = (event) => {
        const data = event.target.result;
        data.dataUri = imageObject.dataUri;
        const requestUpdate = objectStore.put(data);
        requestUpdate.onerror = (event) => {
            console.error(event);
        };
        requestUpdate.onsuccess = (event) => {
            console.log(event);
        };
};

    }


    var startDb = function(){
        
        const request = indexedDB.open("Ephemeris_image_idb");
        request.onerror = (event) => {
            console.error(`Database error: ${event.target.errorCode}`);
        };
        request.onsuccess = (event) => {
            db = event.target.result;
        };
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
          
            const objectStore = db.createObjectStore("images", { keyPath: "uuid" });
          
            // objectStore.createIndex("name", "name", { unique: false });
          
            // Use transaction oncomplete to make sure the objectStore creation is
            // finished before adding data into it.
            objectStore.transaction.oncomplete = (event) => {
              console.log("Done");
            };
        };
    }

    init()


    self.get = get
    self.set = set
    return self
}

var imageStore = createImageStore()
export default imageStore