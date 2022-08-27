let nanoid=(t=21)=>crypto.getRandomValues(new Uint8Array(t)).reduce(((t,e)=>t+=(e&=63)<36?e.toString(36):e<62?(e-26).toString(36).toUpperCase():e>62?"-":"_"),"");
var demoId1 = nanoid()
var demoId2 = nanoid()
var demoId3 = nanoid()

var createNodeManager = function () {
    var self = {}


    return self
}

var createNode= function({
    headerColor = 0xffff00,
    uuid=nanoid(),
    position={x:0,y:0},
    name = "Node",
    props =[
        {id:demoId1, label:"demo", type:"text", editable:true, socket:"input", value:"Default"},
        {id:demoId2, label:"demo2", type:"text", editable:true, socket:"input", value:"Default2"},
        {id:demoId3, label:"demo2", type:"text", editable:true, socket:"output", value:"Default3"},
    ],
    links={
        demoId1:undefined,
        demoId2:undefined,
        demoId3:undefined,
    },
    methods ={
        mixString:(props) => {
            props.demoId3.set(props.demoId1.get() +props.demoId2.get())
        }
    },
    event={
        onEvaluate:(props) =>{
            props.demoId3.set(props.demoId1.get() +props.demoId2.get())
        }
    },
    } = {}){
    var self={}

    return self
}