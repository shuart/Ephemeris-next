import { createAdler } from "../../vendor/adler.js"

export var getViewGridPlaceholder = function (type) {
    if (type == "table") {
        return gridViewTablePlaceHolder.instance()
    }else if(type =="instanceCard"){
        return gridViewInstanceCardPlaceHolder.instance()
    }else{
        var domPlaceholder = document.createElement("div")
        domPlaceholder.innerHTML="placehodler"
        return domPlaceholder
    }
    
}

var gridViewTablePlaceHolder = createAdler({
    tag:'eph-grid-view-placeholder-table',
    props:{
        currentPageId:undefined,
        // currentArea:undefined,
        // calledFromInstance:undefined,
        // cols:4,
        // rows:4,
        // schema:[],
        // showSettings:false,
    },
    attributes:[
    ],
    events : [
        // ["click", '.action_grid_add', addComp],
        // ["click", '.action-grid-save', saveNewLayout],
        // ["click", '.action-grid-add-left', addCompLeft],
        // ["click", '.action-grid-toggle-edit', toogleSettings],
    ],
    html:()=>/*html*/`
        <div class="placeholder">
            <table>
                <tr class="head-row">
                    <td class="head-cell"></td>
                    <td class="head-cell"></td>
                    <td class="head-cell"></td>
                </tr>
                <tr>
                    <td><div class="skeleton skeleton-text"></div></td>
                    <td><div class="skeleton skeleton-text"></div></td>
                    <td><div class="skeleton skeleton-text"></div></td>
                </tr>
                <tr>
                    <td><div class="skeleton skeleton-text"></div></td>
                    <td><div class="skeleton skeleton-text"></div></td>
                    <td><div class="skeleton skeleton-text"></div></td>
                </tr>
                <tr>
                    <td><div class="skeleton skeleton-text"></div></td>
                    <td><div class="skeleton skeleton-text"></div></td>
                    <td><div class="skeleton skeleton-text"></div></td>
                </tr>
                <tr>
                    <td><div class="skeleton skeleton-text"></div></td>
                    <td><div class="skeleton skeleton-text"></div></td>
                    <td><div class="skeleton skeleton-text"></div></td>
                </tr>
            </table>
        </div>
        
    `,
    onRender:(self) =>{
        // updateView(self)
        
    },
    css:`
    .placeholder{
        margin-top:20px;
    }
    .head-row{
        background-color: #8888882b;
    }
    .head-cell{
        border-style:none;
    }
    table, td, th {  
        border: 1px solid rgba(134, 134, 134, 0.23);
        text-align: left;
        height: 38px;
      }
    table{  
        border-radius: 8px;
        border-style: none;
        overflow: hidden;
    }
    table {
        border-collapse: collapse;
        width: 100%;
        padding:15px;
      }
    .skeleton {
        animation: skeleton-loading 8s linear infinite alternate;
    }
    @keyframes skeleton-loading {
        0% {
            background-color: hsl(200, 20%, 80%);
        }
        100% {
            background-color: hsl(200, 20%, 95%);
        }
    }
    .skeleton-text {
        width: 90%;
        height: 19px;
        border-radius: 2px;
        opacity: 0.5;
        margin-left: 5%;
    }
    .skeleton-text__body {
        width: 75%;
    }
    `,
})

var gridViewInstanceCardPlaceHolder = createAdler({
    tag:'eph-grid-view-placeholder-card',
    props:{
        currentPageId:undefined,
        // currentArea:undefined,
        // calledFromInstance:undefined,
        // cols:4,
        // rows:4,
        // schema:[],
        // showSettings:false,
    },
    attributes:[
    ],
    events : [
        // ["click", '.action_grid_add', addComp],
        // ["click", '.action-grid-save', saveNewLayout],
        // ["click", '.action-grid-add-left', addCompLeft],
        // ["click", '.action-grid-toggle-edit', toogleSettings],
    ],
    html:()=>/*html*/`
    <link rel="stylesheet" href="css/bulma.min.css">
    <link rel="stylesheet" href="css/bulma.dark.css">

    <link rel="stylesheet" href="css/main.css">

    <div class="card placeholder">
        <div class="card-content">
        <div class="media">
            <div class="media-left">
            <figure class="skeleton image is-48x48">
                
            </figure>
            </div>
            <div class="media-content">
            <p class="title is-4 skeleton skeleton-text skeleton-text-short"></p>
            <p class="subtitle is-6 skeleton skeleton-text skeleton-text-short"></p>
            </div>
        </div>
    
        <div class="content ">
            <div class="skeleton skeleton-text"></div>
            <div>\b</div>
            <div class="skeleton skeleton-text"></div>
            
            <div class="skeleton skeleton-text"></div>
        </div>
        </div>
    </div>
        
    `,
    onRender:(self) =>{
        // updateView(self)
        
    },
    css:`
    .placeholder{
        margin-top:20px;
    }
    .skeleton {
        animation: skeleton-loading 8s linear infinite alternate;
    }
    @keyframes skeleton-loading {
        0% {
            background-color: hsl(200, 20%, 80%);
        }
        100% {
            background-color: hsl(200, 20%, 95%);
        }
    }
    
    .skeleton-text {
        width: 90%;
        height: 19px;
        border-radius: 2px;
        opacity: 0.5;
        margin-left: 5%;
    }
    .skeleton-text-short {
        width: 50%;
        height: 19px;
        border-radius: 2px;
        opacity: 0.5;
        margin-left: 5%;
    }
    .skeleton-text__body {
        width: 75%;
    }
    `,
})