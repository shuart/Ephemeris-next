import createAdler from "../../vendor/adler.js";
import nanoid from "../../vendor/nanoid.js";
import mainPopup from "../common_ui_components/mainPopup/mainPopup.js"

var softUpdate= function (event, data, instance) {

}

var renderTable= function ({
    schema=[],
    width = undefined,
    height= "100%",
    uuid = nanoid()
}={}) {
    var area = ''
    for (let i = 0; i < schema.length; i++) {
        const rowItem = schema[i];
        area +='<div class="adler_grid_row" >' + renderRow({rowId:i, cols:rowItem.cols}) +'</div>'
    }
    area += '<div class="adler_grid_row_add">+</div>'

    return area
}

var renderRow = function ({
    cols=[],
    rowId = undefined,
    width = undefined,
    height= "100%",
    uuid = nanoid()
}={}) {
    var area = ''
    for (let i = 0; i < cols.length; i++) {
        const colItem = cols[i];
        area +='<div class="adler_grid_col" style="width:25%">' + renderCol({components:colItem.components, rowId:rowId, colId:i}) +'</div>'
    }
    area += `<div data-row-id="${rowId}" class="adler_grid_row_remove">x</div>`
    area += `<div data-row-id="${rowId}" class="adler_grid_col_add">+</div>`
    return area
}
var renderCol = function ({
    components=[],
    rowId = undefined,
    colId= undefined,
    width = undefined,
    height= "100%",
    uuid = nanoid()
}={}) {
    var area = ''
    for (let i = 0; i < components.length; i++) {
        const compItem = components[i];
        area +=`<div a-slot="view_mount_point_${rowId}_${rowId}" class="adler_grid_comp_area" >` + renderComp(compItem) +'</div>'
    }
    area += `<div data-row-id="${rowId}" data-col-id="${rowId}" class="adler_grid_col_remove">x</div>`
    area += `<div data-row-id="${rowId}" data-col-id="${colId}" class="adler_grid_comp_add">+</div>`
    return area
}
var renderComp = function ({
    width = undefined,
    height= "100%",
    uuid = nanoid()
}={}) {
    var area = 'test'
    
    return area
    
}

var addRow = function(event, data, instance){
    mainPopup.mount()
    var currentSchema = instance.props.test.get(); currentSchema.push({ setting:{}, cols:[]});
    instance.props.test.set(currentSchema); instance.update();
}
var removeRow = function(event, data, instance){
    var currentSchema = instance.props.test.get();
    if (event.target.dataset.rowId > -1) { currentSchema.splice(event.target.dataset.rowId, 1) }
    instance.props.test.set(currentSchema); instance.update();
}

var addCol = function(event, data, instance){
    var currentSchema = instance.props.test.get(); currentSchema[event.target.dataset.rowId].cols.push({ setting:{}, components:[]});
    instance.props.test.set(currentSchema); instance.update();
}
var removeCol = function(event, data, instance){
    var currentSchema = instance.props.test.get();
    if (event.target.dataset.rowId > -1) { currentSchema[event.target.dataset.rowId].cols.splice(event.target.dataset.colId, 1) }
    instance.props.test.set(currentSchema); instance.update();
}

var addComp = function(event, data, instance){
    var currentSchema = instance.props.test.get(); currentSchema[event.target.dataset.rowId].cols[event.target.dataset.colId].components.push({ setting:{}, componentType:"undefined"});
    instance.props.test.set(currentSchema); instance.update();
}

var setUp = function (event, data, instance) {
    // var schema = [
    //     { setting:{}, cols:[
    //         { setting:{}, components:[]},{ setting:{}, components:[]}
    //     ]},
    //     { setting:{}, cols:[
    //         { setting:{}, components:[]},
    //     ]}
    // ]
    var schema = instance.props.test.get()
    var html = '<div class="Component container">' + renderTable({schema:schema}) +'</div>'
    // alert(html)
    instance.setContent((p)=> html)
}

var component =createAdler({
    content: p => /*html*/`
    <div class="Component container">
    GRID
        <div class="adler_grid_row" >
            <div class="adler_grid_col" >
                <div class="adler_grid_comp_add">+</div>
            </div>
            <div class="adler_grid_col" style="width:25%">
                <div class="adler_grid_comp_area">Component name</div>
                <div class="adler_grid_comp_add">+</div>
            </div>
            <div class="adler_grid_col_add">+</div>
        </div>
        <div class="adler_grid_row_add">+</div>
    </div>
        `,
    params:{
        props:{
            test:[
                { setting:{}, cols:[
                    { setting:{}, components:[]},{ setting:{}, components:[ { setting:{}, componentType:"test"} ]}
                ]},
                { setting:{}, cols:[
                    { setting:{}, components:[]},
                ]}
            ],
        },
        listen:{
            test:function (event, data, instance) {
                //alert("test")
            }
        },
        data:{
            value:"Hello",
            list:[],
            table:undefined,
            // onClick:()=>console.log("click")
        },
        on:[
            [".adler_grid_row_add","click", addRow ],
            [".adler_grid_row_remove","click", removeRow ],
            [".adler_grid_col_add","click", addCol ],
            [".adler_grid_col_remove","click", removeCol ],
            [".adler_grid_comp_add","click", addComp ],
        ],
        events:{
            onBeforeMount:(event, data, instance) => setUp(event, data, instance),
            // onMount:(event, data, instance) => setUp(event, data, instance),
            
        },
        methods:{
            softUpdate:(event, data, instance)=>softUpdate(event, data, instance),
        },
    },
    components:{
        // table_component: table_component
    },
    css:/*css*/`
        .adler_grid_col{
            min-height:100px;
            min-width:50px;
            margin:5px;
            border-style: dashed;
            border-color: #bbb;
            border-radius: 11px;
            position:relative;
        }
        .adler_grid_row{
            min-height:100px;
            min-width:50px;
            display: flex; /* or inline-flex */
            border-style: dashed;
            border-color: #646464;
            border-radius: 11px;
            margin-bottom: -3px;
        }
        .adler_grid_row_add{
            width: 20px;
            margin: auto;
            color: black;
            font-size: 2em;
            cursor:pointer;
        }
        .adler_grid_row_remove, .adler_grid_col_remove {
            background-color: #fd7d7d61;
            height: 15px;
            width: 15px;
            border-radius: 20px;
            padding: -3px;
            padding-top: -21px;
            text-align: center;
            font-size: 9px;
            color: white;
            position: absolute;
            right: 0px;
            margin: 5px;
            cursor:pointer;
        }
        .adler_grid_col_remove{
            top: -4px;
        }
        .adler_grid_col_add{
            width: 20px;
            margin: auto;
            color: black;
            font-size: 2em;
            cursor:pointer;
        }
        .adler_grid_comp_add{
            width: 20px;
            margin: auto;
            color: black;
            font-size: 2em;
            cursor:pointer;
            position: relative;
            top: 5px;
            width: 50px;
            /* height: 37px; */
            text-align: center;
            border-radius: 9px;
            box-shadow: -1px 3px 5px 0px rgba(38, 38, 38, 0.2);
            font-size: 1.5em;
            border-top-style: solid;
            border-top-width: 3px;
            border-top-left-radius: 1px;
            border-top-right-radius: 1px;
            margin-bottom: 11px;
            margin-top: 12px;
        }
        .adler_grid_comp_area {
            width: 20px;
            margin: auto;
            color: black;
            font-size: 2em;
            cursor: pointer;
            position: relative;
            top: 5px;
            width: 100%;
            /* height: 37px; */
            text-align: center;
            border-radius: 9px;
            box-shadow: -1px 3px 5px 0px rgba(38, 38, 38, 0.2);
            font-size: 1.5em;
            border-top-style: solid;
            border-top-width: 10px;
            border-top-left-radius: 1px;
            border-top-right-radius: 1px;
            height: 83px;
            border-top-color: #01b3ab;
        
            margin-top: 12px;
        }

    
    `,
})

export default component