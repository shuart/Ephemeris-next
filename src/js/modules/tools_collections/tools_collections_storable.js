export function sortable(self, section, onUpdate){

    section.addEventListener('dragstart', function(e){     
        dragEl = e.target; 
        nextEl = dragEl.nextSibling;
    
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('Text', dragEl.textContent);
      
        section.addEventListener('dragover', _onDragOver, false);
        section.addEventListener('dragend', _onDragEnd, false);
         
        setTimeout(function (){
            dragEl.classList.add('ghost');
        }, 0)
       
    });
}

// function sortable(self, section, onUpdate){
//     var dragEl, nextEl, newPos, dragGhost;
//     console.log([...section.children]);
 
//     let oldPos = [...section.children].map(item => {
//         console.log(item);
//       item.draggable = true
//       let pos = self.query("#"+item.id).getBoundingClientRect();
//       return pos;
//     });
   
//     function _onDragOver(e){
//         e.preventDefault();
//         e.dataTransfer.dropEffect = 'move';
        
//         var target = e.target;
//         if(!target.classList.contains("dragging_placeholder")){
//             target = target.closest(".dragging_placeholder")
//         }
//         if( target && target !== dragEl && target.nodeName == 'DIV' ){
//             if(target.classList.contains('inside')) {
//                 console.log("inside");
//                 e.stopPropagation();
//             } else {
        
//                 var targetPos = target.getBoundingClientRect();//getBoundinClientRect contains location-info about the element (relative to the viewport)
//                 var next = (e.clientY - targetPos.top) / (targetPos.bottom - targetPos.top) > .5 || (e.clientX - targetPos.left) / (targetPos.right - targetPos.left) > .5;    //checking that dragEl is dragged over half the target y-axis or x-axis. (therefor the .5)
//                 console.log(dragEl);
//                 console.log(next && target.nextSibling);
//                 console.log(next && target.nextSibling || target);
//                 section.insertBefore(dragEl, next && target.nextSibling || target);
                
//                 /*  console.log("oldPos:" + JSON.stringify(oldPos));
//                 console.log("newPos:" + JSON.stringify(newPos)); */
//                 /* console.log(newPos.top === oldPos.top ? 'They are the same' : 'Not the same'); */
//                 console.log(oldPos);
//             }
//         }   
//     }
    
//     function _onDragEnd(evt){
//         evt.preventDefault();
//         newPos = [...section.children].map(child => {      
//              let pos = self.query("#"+child.id).getBoundingClientRect();
//              return pos;
//            });
//         console.log(newPos);
//         dragEl.classList.remove('ghost');
//         section.removeEventListener('dragover', _onDragOver, false);
//         section.removeEventListener('dragend', _onDragEnd, false);

//         nextEl !== dragEl.nextSibling ? onUpdate(dragEl) : false;
//     }
       
//       section.addEventListener('dragstart', function(e){     
//         dragEl = e.target; 
//         nextEl = dragEl.nextSibling;
    
//         e.dataTransfer.effectAllowed = 'move';
//         e.dataTransfer.setData('Text', dragEl.textContent);
      
//         section.addEventListener('dragover', _onDragOver, false);
//         section.addEventListener('dragend', _onDragEnd, false);
         
//         setTimeout(function (){
//             dragEl.classList.add('ghost');
//         }, 0)
       
//     });
// }