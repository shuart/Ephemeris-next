import createdb from "../../vendor/superCluster.js";

var createUserManagement = function(){
    var self={}

    var db = createdb({
        users:["id","test"]
    })

    var getAllUsers = function () {
        return db.get("users").toArray()
    }
    var addUser =function({
        name=undefined,
        email=undefined,
        password=undefined,
    }={}){
        console.log(name);
        db.add("users", { name:name})
    }


    self.addUser = addUser;
    self.getAllUsers = getAllUsers
    return self

}

var userManagement = createUserManagement()

export default userManagement