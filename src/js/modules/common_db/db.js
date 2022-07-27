var createDB = function(){
    var self={};

    var data={
        users:[]
    }

    var addUser = function({
        name=undefined,
    }={}){
        data.users.push({name})
    }

    self.addUser = addUser
    return self
}

var db = createDB();

export default db