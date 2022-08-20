import createRouter from "../../vendor/starMap.js";
import common_ui from "../common_ui/ui.js";
//DOMAIN
import userManagement from "../common_user_management/user_management.js";
import projectManagement from "../common_project_management/project_management.js";
//UI
import project_selection from "../project_selection/project_selection.js";
import project_dashboard from "../project_dashboard/project_dashboard.js";
import settings_ui from "../common_settings/settings_ui.js";
import common_side_bar from "../common_side_bar/common_side_bar.js";
import login_ui from "../login/login_ui.js";


const common_router = createRouter()

var lastUrlBeforeRedirect = undefined
var setCurrentProject = function (id) {
    projectManagement.setCurrent(id)
}

var logger = function(req,res,next){
    // console.log(req)
    next()
}

var redirectIfNoUser = function(req,res,next){
    var currentUser = userManagement.getCurrentUser()
    // console.log(res);
    // next()
    if (currentUser || res.route[0] =="login") {
        next()
    }else{
        lastUrlBeforeRedirect= res.url;
        common_router.goTo("/login")
    } 
}

var createStateManager = function({
    mainUiElement=undefined,
}={}){
    var self={}

    var setUpRouter = function () {
        

        common_router.route("/projetff/modee/teet/:id", (event)=> console.log(event))
        common_router.route("/", (event)=>
        {
            // console.log(event);
            mainUiElement.append(project_selection.instance(), "main_area_mount_point");
            mainUiElement.update();
        })
        common_router.route("/login", (event)=>
        {
            // console.log(event);
            mainUiElement.append(login_ui.instance(), "main_area_mount_point");
            mainUiElement.update();
        })
        common_router.route("/project/dashboard", (event)=>
        {
            console.log(event);
            // mainUiElement.append(project_dashboard.instance(), "main_area_mount_point");
            // mainUiElement.update();
        })
        common_router.route("/:project/dashboard", (event)=>
        {
            console.log(event);
            setCurrentProject(event.params.project)
            mainUiElement.append(project_dashboard.instance(), "main_area_mount_point");
            mainUiElement.append(common_side_bar.instance(), "toolbar_area_mount_point");
            mainUiElement.update();
        })
        common_router.route("/:project/settings", (event)=>
        {
            console.log(event);
            setCurrentProject(event.params.project)
            mainUiElement.append(settings_ui.instance(), "main_area_mount_point");
            mainUiElement.append(common_side_bar.instance(), "toolbar_area_mount_point");
            mainUiElement.update();
        })

        common_router.use("/",logger,redirectIfNoUser )
        common_router.listen()
    }

    var goTo = function(href){
        common_router.goTo(href)
    }
    var goToLastBeforeRedirect = function(href){
        if (lastUrlBeforeRedirect) {
            common_router.goTo(lastUrlBeforeRedirect)
        } else {
            common_router.goTo("/")
        }
    }

    var init = function () {
        setUpRouter()
    }

    init()
    self.goToLastBeforeRedirect = goToLastBeforeRedirect
    self.goTo = goTo
    return self
}


const state = createStateManager({mainUiElement:common_ui})
export default state