import createdb from "../../vendor/superCluster.js";

var createUserManagement = function(){
    var self={}
    var currentUser = undefined;

    var db = createdb({
        users:["id","test"]
    },{persistence:"users"})

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

    var setCurrentUser = function(id){
        console.log("set "+ id +" as current user");
        currentUser=id
    }


    self.setCurrentUser = setCurrentUser;
    self.addUser = addUser;
    self.getAllUsers = getAllUsers
    return self

}

var userManagement = createUserManagement()

export default userManagement