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
import project_views from "../project_views/project_views.js";
import project_views_settings from "../project_views/project_views_settings.js";
import login_ui from "../login/login_ui.js";

import evaluator_node_ui from "../common_evaluators/evaluator_node_ui.js";
import cycles_editor from "../cycles_editor/cycles_editor.js";
import simulations_editor from "../simulations_editor/simulations_editor.js";
import instance_view from "../instance_view/instance_view.js";
import tools_graph from "../tools_graph/tools_graph.js";
import tools_graphs_selection from "../tools_graph/tools_graph_selector.js";
import simulation_selector from "../simulations_editor/simulation_selector.js";
import toolsCollectionsSelector from "../tools_collections/tools_collections_selector.js";
import toolsCollections from "../tools_collections/tools_collections.js";

const common_router = createRouter()

var lastUrlBeforeRedirect = undefined
var setCurrentProject = function (id) {
    return projectManagement.setCurrent(id)
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

var redirectIfUserHasNoAcess = function (req,res, next) {
    var currentUser = userManagement.getCurrentUser()
    if (res.route[0] =="login" || res.route[0] =="") {
        next()
    }else{
        var currentProject = projectManagement.getById(res.route[0])
        if (currentProject && currentProject.createdBy && currentProject.createdBy != currentUser.id) {
            common_router.goTo("/")
        }else{
            next()
        }
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
            projectManagement.setCurrent(undefined)
            mainUiElement.append(project_selection.instance(), "main_area_mount_point");
            mainUiElement.append(common_side_bar.instance(), "toolbar_area_mount_point");
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
        common_router.route("/:project/dashboard", async (event)=>
        {
            console.log(event);
            await setCurrentProject(event.params.project)
            mainUiElement.append(project_dashboard.instance(), "main_area_mount_point");
            mainUiElement.append(common_side_bar.instance(), "toolbar_area_mount_point");
            mainUiElement.update();
        })
        common_router.route("/:project/evaluators/:evaluatorId", async (event)=>
        {
            console.log(event);
            await setCurrentProject(event.params.project)
            mainUiElement.append(evaluator_node_ui.instance({props:{evaluatorId:event.params.evaluatorId}}), "main_area_mount_point");
            mainUiElement.append(common_side_bar.instance(), "toolbar_area_mount_point");
            mainUiElement.update();
        })
        common_router.route("/:project/instances/:instanceId", async (event)=>
        {
            console.log(event);
            await setCurrentProject(event.params.project)
            mainUiElement.append(instance_view.instance({data:{instanceId:event.params.instanceId}}), "main_area_mount_point");
            mainUiElement.append(common_side_bar.instance(), "toolbar_area_mount_point");
            mainUiElement.update();
        })
        common_router.route("/:project/graphs/:instanceId", async (event)=> //TODO why is instance id needed?
        {
            console.log(event);
            await setCurrentProject(event.params.project)
            mainUiElement.append(tools_graphs_selection.instance(), "main_area_mount_point");
            mainUiElement.append(common_side_bar.instance(), "toolbar_area_mount_point");
            mainUiElement.update();
        })
        common_router.route("/:project/graph/:instanceId", async (event)=>
        {
            console.log(event);
            await setCurrentProject(event.params.project)
            mainUiElement.append(tools_graph.instance({data:{instanceId:event.params.instanceId}}), "main_area_mount_point");
            mainUiElement.append(common_side_bar.instance(), "toolbar_area_mount_point");
            mainUiElement.update();
        })
        common_router.route("/:project/collections/:instanceId", async (event)=> //TODO why is instance id needed?
        {
            console.log(event);
            await setCurrentProject(event.params.project)
            mainUiElement.append(common_side_bar.instance(), "toolbar_area_mount_point");
            mainUiElement.update();
            mainUiElement.loadAt(toolsCollectionsSelector.instance(), ".main_area_mount_point");
        })
        common_router.route("/:project/collection/:instanceId", async (event)=> //TODO why is instance id needed?
        {
            console.log(event);
            await setCurrentProject(event.params.project)
            mainUiElement.append(common_side_bar.instance(), "toolbar_area_mount_point");
            mainUiElement.update();
            var pageInstance = toolsCollections.instance()
            pageInstance.instanceId = event.params.instanceId
            mainUiElement.loadAt(pageInstance, ".main_area_mount_point");
        })
        common_router.route("/:project/cycles/:cycles", async (event)=>
        {
            console.log(event);
            await setCurrentProject(event.params.project)
            mainUiElement.append(cycles_editor.instance({props:{cycleId:event.params.cycles}}), "main_area_mount_point");
            mainUiElement.append(common_side_bar.instance(), "toolbar_area_mount_point");
            mainUiElement.update();
        })
        
        common_router.route("/:project/simulations/:simulation", async (event)=> //TODO why is instance id needed?
        {
            console.log(event);
            await setCurrentProject(event.params.project)
            mainUiElement.append(simulation_selector.instance(), "main_area_mount_point");
            mainUiElement.append(common_side_bar.instance(), "toolbar_area_mount_point");
            mainUiElement.update();
        })
        common_router.route("/:project/simulation/:simulation", async (event)=>
        {
            console.log(event);
            await setCurrentProject(event.params.project)
            mainUiElement.append(simulations_editor.instance({props:{simId:event.params.simulation}}), "main_area_mount_point");
            mainUiElement.append(common_side_bar.instance(), "toolbar_area_mount_point");
            mainUiElement.update();
        })
        common_router.route("/:project/views/:viewId", async (event)=>
        {
            console.log(event);
            await setCurrentProject(event.params.project)
            mainUiElement.append(project_views.instance({data:{viewId:event.params.viewId}}), "main_area_mount_point");
            mainUiElement.append(common_side_bar.instance(), "toolbar_area_mount_point");
            mainUiElement.update();
        })
        common_router.route("/:project/settings/views/:viewId", async (event)=>
        {
            console.log(event);
            await setCurrentProject(event.params.project)
            mainUiElement.append(project_views_settings.instance({data:{viewId:event.params.viewId}}), "main_area_mount_point");
            mainUiElement.append(common_side_bar.instance(), "toolbar_area_mount_point");
            mainUiElement.update();
        })
        // common_router.route("/:project/settings", (event)=>
        // {
        //     console.log(event);
        //     setCurrentProject(event.params.project)
        //     mainUiElement.append(settings_ui.instance(), "main_area_mount_point");
        //     mainUiElement.append(common_side_bar.instance(), "toolbar_area_mount_point");
        //     mainUiElement.update();
        // })
        common_router.route("/:project/settings/:section/:entity", async (event)=>
        {
            console.log(event);
            await setCurrentProject(event.params.project)
            mainUiElement.append(settings_ui.instance({props:{modelElementType:event.params.entity, activeSideMenuLink:event.params.entity}}), "main_area_mount_point");
            mainUiElement.append(common_side_bar.instance(), "toolbar_area_mount_point");
            mainUiElement.update();
        })
        common_router.route("/:project/settings/details/:entity/:entityId", async (event)=>
        {
            console.log(event);
            await setCurrentProject(event.params.project)
            mainUiElement.append(settings_ui.instance({props:{modelElementType:event.params.entity,modelElementDetails:event.params.entityId, activeSideMenuLink:event.params.entity}}), "main_area_mount_point");
            mainUiElement.append(common_side_bar.instance(), "toolbar_area_mount_point");
            mainUiElement.update();
        })

        common_router.use("/",logger,redirectIfNoUser, redirectIfUserHasNoAcess )
        common_router.listen()
    }

    var goTo = function(href){
        common_router.goTo(href)
    }
    var setSearchParams = function(id, value, mode){
        common_router.setSearchParams(id, value, mode)
    }
    var getSearchParam = function (paramName) {
        if (paramName) {
            let url = window.location.hash.slice(1) || '/';
            if (url.split("?")[1]) {//if there are already search params
                var splitedParams = url.split("?")[1].split("&")
                url = url.split("?")[0]
                for (let i = 0; i < splitedParams.length; i++) {
                    const sparam = splitedParams[i].split("=");
                    if (paramName == sparam[0]) {
                        return sparam[1]
                    }
                }
            }
        }
        return undefined
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
    self.setSearchParams = setSearchParams
    self.getSearchParam = getSearchParam
    return self
}


const state = createStateManager({mainUiElement:common_ui})
export default state