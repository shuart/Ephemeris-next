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

    var storeCurrentUserIdForNextLogin = function(id){
        localStorage.setItem('ephemeris-lastUser', id);
    }
    var getPreviousUserIdForNextLogin = function(){
        return localStorage.getItem('ephemeris-lastUser');
    }

    var setCurrentUser = function(id){
        console.log("set "+ id +" as current user");
        storeCurrentUserIdForNextLogin(id)
        currentUser=id
    }
    var getCurrentUser = function(id){
        return db.get("users").where("id").equals(currentUser)
    }

    var signOutUser = function(){
        localStorage.removeItem('ephemeris-lastUser');
        currentUser = undefined;
    }
    
    var init = function(){
        var previousUser = getPreviousUserIdForNextLogin()
        if (previousUser) { currentUser=previousUser}
    }

    init()
    self.getCurrentUser = getCurrentUser;
    self.setCurrentUser = setCurrentUser;
    self.addUser = addUser;
    self.getAllUsers = getAllUsers
    self.signOutUser = signOutUser
    return self

}

var userManagement = createUserManagement()

export default userManagement