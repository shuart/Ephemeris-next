import { createAdler } from "../../../vendor/adler.js"
import createInstancesManagement from "../../common_project_management/instances_management.js";
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
import { createEditor } from "../../../vendor/writer/writer.js";
import showPopupInstancePreview from "../../popup_instance_preview/popup_instance_preview.js";

var setCurrentTags = function () {
  var instancesRepo = createInstancesManagement()
  var instances = instancesRepo.getAll()

  return instances.map(i=>({id:i.uuid, tag:i.name}))
}

mermaid.initialize({startOnLoad: true, securityLevel: 'loose',maxTextSize: 90000, maxEdges:90000});

var diagramArea = createAdler({
    tag:'diagram-area',
    props:{
        nodes:[], 
        links:[], 
        focusNode:undefined,
        onLabelMouseDown:function (element, self) {
          self.query('.goTo').innerHTML =element.dataset.id;
        },
        nodesToHighlightOnClick:undefined,
        to_print:"foo",
        to_print_reac:"bar",
    },
    attributes:[
        "to_print",
        "to_print_reac",
    ],
    html:()=>/*html*/`

        <div class="area mermaid">
            hello
        </div>
        <div class="area goTo">
            
        </div>
        <svg id="ProseMirror-icon-collection" style="display: none;"><symbol id="pm-icon-4eb53ba9" viewBox="0 0 805 1024"><path d="M317 869q42 18 80 18 214 0 214-191 0-65-23-102-15-25-35-42t-38-26-46-14-48-6-54-1q-41 0-57 5 0 30-0 90t-0 90q0 4-0 38t-0 55 2 47 6 38zM309 442q24 4 62 4 46 0 81-7t62-25 42-51 14-81q0-40-16-70t-45-46-61-24-70-8q-28 0-74 7 0 28 2 86t2 86q0 15-0 45t-0 45q0 26 0 39zM0 950l1-53q8-2 48-9t60-15q4-6 7-15t4-19 3-18 1-21 0-19v-37q0-561-12-585-2-4-12-8t-25-6-28-4-27-2-17-1l-2-47q56-1 194-6t213-5q13 0 39 0t38 0q40 0 78 7t73 24 61 40 42 59 16 78q0 29-9 54t-22 41-36 32-41 25-48 22q88 20 146 76t58 141q0 57-20 102t-53 74-78 48-93 27-100 8q-25 0-75-1t-75-1q-60 0-175 6t-132 6z"></path></symbol><symbol id="pm-icon-25612f7a" viewBox="0 0 585 1024"><path d="M0 949l9-48q3-1 46-12t63-21q16-20 23-57 0-4 35-165t65-310 29-169v-14q-13-7-31-10t-39-4-33-3l10-58q18 1 68 3t85 4 68 1q27 0 56-1t69-4 56-3q-2 22-10 50-17 5-58 16t-62 19q-4 10-8 24t-5 22-4 26-3 24q-15 84-50 239t-44 203q-1 5-7 33t-11 51-9 47-3 32l0 10q9 2 105 17-1 25-9 56-6 0-18 0t-18 0q-16 0-49-5t-49-5q-78-1-117-1-29 0-81 5t-69 6z"></path></symbol><symbol id="pm-icon--1d0983fe" viewBox="0 0 896 1024"><path d="M608 192l-96 96 224 224-224 224 96 96 288-320-288-320zM288 192l-288 320 288 320 96-96-224-224 224-224-96-96z"></path></symbol><symbol id="pm-icon--78ecc05e" viewBox="0 0 951 1024"><path d="M832 694q0-22-16-38l-118-118q-16-16-38-16-24 0-41 18 1 1 10 10t12 12 8 10 7 14 2 15q0 22-16 38t-38 16q-8 0-15-2t-14-7-10-8-12-12-10-10q-18 17-18 41 0 22 16 38l117 118q15 15 38 15 22 0 38-14l84-83q16-16 16-38zM430 292q0-22-16-38l-117-118q-16-16-38-16-22 0-38 15l-84 83q-16 16-16 38 0 22 16 38l118 118q15 15 38 15 24 0 41-17-1-1-10-10t-12-12-8-10-7-14-2-15q0-22 16-38t38-16q8 0 15 2t14 7 10 8 12 12 10 10q18-17 18-41zM941 694q0 68-48 116l-84 83q-47 47-116 47-69 0-116-48l-117-118q-47-47-47-116 0-70 50-119l-50-50q-49 50-118 50-68 0-116-48l-118-118q-48-48-48-116t48-116l84-83q47-47 116-47 69 0 116 48l117 118q47 47 47 116 0 70-50 119l50 50q49-50 118-50 68 0 116 48l118 118q48 48 48 116z"></path></symbol><symbol id="pm-icon-5a60796" viewBox="0 0 1024 1024"><path d="M761 1024c113-206 132-520-313-509v253l-384-384 384-384v248c534-13 594 472 313 775z"></path></symbol><symbol id="pm-icon--6ff882d4" viewBox="0 0 1024 1024"><path d="M576 248v-248l384 384-384 384v-253c-446-10-427 303-313 509-280-303-221-789 313-775z"></path></symbol><symbol id="pm-icon--6141f81" viewBox="0 0 768 896"><path d="M0 512h128v-128h-128v128zM0 256h128v-128h-128v128zM0 768h128v-128h-128v128zM256 512h512v-128h-512v128zM256 256h512v-128h-512v128zM256 768h512v-128h-512v128z"></path></symbol><symbol id="pm-icon-28a6efee" viewBox="0 0 768 896"><path d="M320 512h448v-128h-448v128zM320 768h448v-128h-448v128zM320 128v128h448v-128h-448zM79 384h78v-256h-36l-85 23v50l43-2v185zM189 590c0-36-12-78-96-78-33 0-64 6-83 16l1 66c21-10 42-15 67-15s32 11 32 28c0 26-30 58-110 112v50h192v-67l-91 2c49-30 87-66 87-113l1-1z"></path></symbol><symbol id="pm-icon--2d1566b3" viewBox="0 0 640 896"><path d="M0 448v256h256v-256h-128c0 0 0-128 128-128v-128c0 0-256 0-256 256zM640 320v-128c0 0-256 0-256 256v256h256v-256h-128c0 0 0-128 128-128z"></path></symbol><symbol id="pm-icon--3cb9c8" viewBox="0 0 800 900"><path d="M0 75h800v125h-800z M0 825h800v-125h-800z M250 400h100v-100h100v100h100v100h-100v100h-100v-100h-100z"></path></symbol><symbol id="pm-icon--2eec1b76" viewBox="0 0 1024 1024"><path d="M219 310v329q0 7-5 12t-12 5q-8 0-13-5l-164-164q-5-5-5-13t5-13l164-164q5-5 13-5 7 0 12 5t5 12zM1024 749v109q0 7-5 12t-12 5h-987q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h987q7 0 12 5t5 12zM1024 530v109q0 7-5 12t-12 5h-621q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h621q7 0 12 5t5 12zM1024 310v109q0 7-5 12t-12 5h-621q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h621q7 0 12 5t5 12zM1024 91v109q0 7-5 12t-12 5h-987q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h987q7 0 12 5t5 12z"></path></symbol></svg>
        
    `,
    onRender:(self) =>{

      // setTimeout(function () {
      //   var element = self.query('.area');
      //   console.log(element);
      //   let graphDefinition = 'graph TB\na-->b';
      //   mermaid.render('graphDiv', graphDefinition, function (svg) {
      //     console.log(svg);
      //     element.innerHTML = svg;
      //   });
      // },5000)
      console.log(self.nodes,self.links);
      var element = self.query('.area');
      const drawDiagram = async function (element) {
        // const graphDefinition = 'graph TB\na-->b';
        var graphDefinition = 'graph TB\n';
  
        var approvedNodes = {}
        var approvedLinks = {}

        if (self.focusNode) {// record nodes to display when focusing on selection
          approvedNodes[self.focusNode]= true
          for (let i = 0; i < self.links.length; i++) {
            const element = self.links[i];
            if (element.to == self.focusNode ) {
              approvedLinks[element.uuid]= true
              approvedNodes[element.from]= true
            }
            if (element.from == self.focusNode ) {
              approvedLinks[element.uuid]= true
              approvedNodes[element.to]= true
            }
            
          }
        }
        // console.log(approvedNodes);
        // alert(self.focusNode)

        for (let i = 0; i < self.nodes.length; i++) {
          const element = self.nodes[i];
          // graphDefinition += 'trt'+i+'\n'
          if (!self.focusNode || approvedNodes[element.uuid]) {
            if (self.focusNode == element.uuid) {
              graphDefinition += element.uuid.replace('--','__')+'(["'+element.name+'"])\n'
            }else{
              graphDefinition += element.uuid.replace('--','__')+'["'+element.name+'"]\n'
            }
            
          }
          
        }
        var doneRelation ={}
        for (let i = 0; i < self.links.length; i++) {
          const element = self.links[i];
          // graphDefinition += 'trt'+i+'\n'
          if (!doneRelation[element.to+element.from] && (!self.focusNode || approvedLinks[element.uuid])) {//avoid reverse relation
            graphDefinition += element.from.replace('--','__')+'-->'+element.to.replace('--','__')+'\n'
            doneRelation[element.from+element.to] = true
          }
          
        }
        // alert(graphDefinition)



        const { svg } = await mermaid.render('graphDiv', graphDefinition);
        // element.innerHTML = svg;

        element.innerHTML = svg.replace(/( )*max-width:( 0-9\.)*px;/i, '');
  
        var doPan = false;
        var eventsHandler;
        var panZoom;
        var mousepos;
  
        eventsHandler = {
          haltEventListeners: ['mousedown', 'mousemove', 'mouseup']
  
          , mouseDownHandler: function (ev) {
            if (ev.target.className == "[object SVGAnimatedString]") {
              doPan = true;
              mousepos = { x: ev.clientX, y: ev.clientY }
            }
            if (ev.target.className == "nodeLabel") {

              self.onLabelMouseDown(ev.target.parentElement.parentElement.parentElement.parentElement, self)
            }
          }
  
          , mouseMoveHandler: function (ev) {
            if (doPan) {
              panZoom.panBy({ x: ev.clientX - mousepos.x, y: ev.clientY - mousepos.y });
              mousepos = { x: ev.clientX, y: ev.clientY };
              window.getSelection().removeAllRanges();
            }
          }
  
          , mouseUpHandler: function (ev) {
            doPan = false;
          }
  
          , init: function (options) {
            options.svgElement.addEventListener('mousedown', this.mouseDownHandler, false);
            options.svgElement.addEventListener('mousemove', this.mouseMoveHandler, false);
            options.svgElement.addEventListener('mouseup', this.mouseUpHandler, false);
          }
  
          , destroy: function (options) {
            options.svgElement.removeEventListener('mousedown', this.mouseDownHandler, false);
            options.svgElement.removeEventListener('mousemove', this.mouseMoveHandler, false);
            options.svgElement.removeEventListener('mouseup', this.mouseUpHandler, false);
          }
        }
        self.query('#graphDiv').style.height ='90%'
        self.query('#graphDiv').style.width ='100%'
        self.query('#graphDiv').style.maxWidth ='none';
        panZoom = svgPanZoom(self.query('#graphDiv'), {
          zoomEnabled: true
          , controlIconsEnabled: true
          , fit: 1
          , center: 1
          , maxZoom: 100
          , minZoom: 0.10
          , customEventsHandler: eventsHandler
        })

        // setTimeout(() => {

        //     var svgs = d3.selectAll(".mermaid svg");
        //     console.log(svgs);
        //     svgs.each(function() {
        //       var svg = d3.select(this);
        //       svg.html("<g>" + svg.html() + "</g>");
        //       var inner = svg.select("g");
        //       var zoom = d3.zoom().on("zoom", function(event) {
        //         inner.attr("transform", event.transform);
        //       });
        //       svg.call(zoom);
        //     });
        // }, 1000);
      };
    
      drawDiagram(element);
    

    },
    css:`
    .area{
      height:100%;
    }

    rect , circle,  ellipse,polygon {
      fill: #e0eae9 !important;
      stroke: #e0eae9 !important;
    }
 

    @media (prefers-color-scheme: dark) {

      #graphDiv .label text, #graphDiv span, #graphDiv p {
        fill: #333 !important;
        color: #fff !important;
      }

      rect , circle,  ellipse,polygon {
        fill: #1f2020 !important;

        stroke: #81B1DB !important;
        stroke-width: 1px !important;
        color:white;
      }
      .flowchart-link{
        stroke: lightgrey !important;
        fill: none;
      }
      .marker{
        stroke: lightgrey !important;
        fill: lightgrey !important;
      }
    }

    
    `
})

export {diagramArea}