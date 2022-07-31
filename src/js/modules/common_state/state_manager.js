import createRouter from "../../vendor/starMap.js";
import project_selection from "../project_selection/project_selection.js";
import login_ui from "../login/login_ui.js";

var redirectIfNoUser = function(){

}

var logger = function(req,res,next){
    console.log(req)
    console.log("d65qz1dz5qd46z5qd46zq54d6z5q4d6zq56zzq6")
    next()
}

var createStateManager = function({
    mainUiElement=undefined,
}={}){
    var self={}

    var setUpRouter = function () {
        const common_router = createRouter()

        common_router.route("/projetff/modee/teet/:id", (event)=> console.log(event))
        common_router.route("/", (event)=>
        {
            console.log(event);
            mainUiElement.append(login_ui.instance(), "main_area_mount_point");
            mainUiElement.update();
        })
        common_router.route("/projects", (event)=>
        {
            console.log(event);
            mainUiElement.append(project_selection.instance(), "main_area_mount_point");
            mainUiElement.update();
        })

        common_router.use("/",logger,logger )
        common_router.listen()
    }

    var init = function () {
        setUpRouter()
    }

    init()
    return self
}


export default createStateManager