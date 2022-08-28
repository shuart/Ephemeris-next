let nanoid=(t=21)=>crypto.getRandomValues(new Uint8Array(t)).reduce(((t,e)=>t+=(e&=63)<36?e.toString(36):e<62?(e-26).toString(36).toUpperCase():e>62?"-":"_"),"");
var demoId1 = nanoid()
var demoId2 = nanoid()
var demoId3 = nanoid()



var createNode= function({
    uuid=nanoid(),
    ui=undefined,
    headerColor = 0xffff00,
    position={x:0,y:0},
    name = "Node",
    props =[
        // {id:demoId1, label:"demo", type:"text", editable:true, socket:"input", value:"Default"},
        // {id:demoId2, label:"demo2", type:"text", editable:true, socket:"input", value:"Default2"},
        // {id:demoId3, label:"demo2", type:"text", editable:true, socket:"output", value:"Default3"},
        // {id:demoId4, label:"demo4", type:"text", editable:true, socket:"none", value:"Default3"},
    ],
    links={
        // demoId1:undefined,
        // demoId2:undefined,
        // demoId3:undefined,
    },
    methods ={
        // mixString:(props) => {
        //     props.demoId3.set(props.demoId1.get() +props.demoId2.get())
        // }
    },
    event={
        // onEvaluate:(props) =>{
        //     props.demoId3.set(props.demoId1.get() +props.demoId2.get())
        // },
        // onInit:(props) => alert(props.demoId1.get()),
    },
    } = {}){
    var self={}
    var currentUi = undefined
    var interactiveProps = undefined



    var setUpProps = function(){
        var interactivePropsObject = {}
        for (let i = 0; i < props.length; i++) {
            const element = props[i];
            interactivePropsObject[element.id] = {
                get:function () {
                    return element.value
                },
                set:function (newValue) {
                    element.value = newValue
                }
            }
        }
        return interactivePropsObject
    }

    var evaluate = function(){
        doEvent("onEvaluate")
    }

    var doEvent = function(eventName){
        if (event[eventName]) {
            event[eventName](interactiveProps)
        }
    }

    
    // var instance = function(ui, data){
    //     var node= createNode()
    //     if (data && data.props) {
    //         //Update props
    //     }
    //     if (data && data.name) {
    //         name = data.name
    //     }
    //     init(ui)
    // }

    var init = function () {
        interactiveProps = setUpProps()
        if(ui){
            currentUi = ui
            addToScene(ui)
        }
        doEvent("onInit")
        
    }
    var getUuid = function() {
        return uuid
    }
    //UI
    
    var addToScene = function (currentScene) {
        currentScene.addNode({headerColor, uuid, position, name, props, links})
    }
    //init
    init()
    self.getUuid=getUuid;
    self.init=init;
    self.evaluate = evaluate;
    return self
}


var createNodeManager = function ({
    ui=undefined,
    } = {}) {
    var self = {}
    var nodeTemplates ={};
    var nodeInUse = {};
    var linksInUse={}
    
    var addLinks = function(links){
        for (let i = 0; i < links.length; i++) {
            const element = links[i];
            linksInUse[links[i].from] = element
            // ui.addLinks(links)
        }
    }
    var addNode = function(templateName, params){
        var template = nodeTemplates[templateName]
        var newParams= Object.assign({},template,params,{ui:ui, links:linksInUse})
        var node = createNode(newParams)
        nodeInUse[node.getUuid()] = node 
    }

    var addNodeTemplate = function(name, params){
        // var newParams= Object.assign({},params,{ui:ui})
        // var node = createNode(newParams)
        nodeTemplates[name]=params
        
    }

    self.addLinks = addLinks
    self.addNodeTemplate = addNodeTemplate
    self.addNode = addNode
    return self
}

export default createNodeManager