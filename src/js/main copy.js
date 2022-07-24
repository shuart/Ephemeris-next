import createAdler from "./vendor/adler.js";

var button =createAdler({
    content: p => `<button class="action1 adlerButton">${p.test} world</button><p class="action2">${p.test2} here</p>`,
    params:{
        data:{
            test:"Hello",
            test2:"click",
        },
        on:[
            [".action1","click", (event, data)=> alert("test "+ data.test)],
            [".action2","click", (event, data, instance)=> instance.setData({test:"barr"}) ],
        ]
    },
    css:`
        .adlerButton {
            background-color: blue;
            padding: 5px;
            border: none;
            color: white;
            margin: 3px;
        }
    `,
})
//button.mount()

var hw =createAdler({
    content: p => `
        <p class="action1">${p.test} world</p>
        <p class="action2">hoover area</p>
        <div a-if="seen" adler="button" class="myAdlerButton"></div>
        <div data-test="ola" a-sync="test2:testSync" adler="button" class="myAdlerButton"></div>
        <div>A list comes here</div>
        <div>
            <div a-for="list" adler="button" class="myAdlerlist"></div>
        </div>
        <div>A controlable element comes here</div>
        <div>
            <div a-id="controlable" adler="button" class="myAdlerlist"></div>
        </div>
        <div>mount area comes here</div>
        <div>
            <div a-slot="mountPoint"></div>
        </div>
        `
        ,
    params:{
        data:{
            test:"Hello",
            testSync:"push",
            seen:true,
            list:[{test:"un"}, {test:"deux"}, {test:"trois"} ]
        },
        on:[
            [".action1","click", (event, data)=> alert("test "+ data.test)],
            [".action2","click", (event, data, instance)=> instance.setData({test:"barr"}) ],
        ]
    },
    components:{
        button: button
    }
})
hw.mount()

setTimeout(function(){
    console.log(hw.getNodes());
    hw.getNodes().controlable.setData({test:"desdkosefsmelfesml"})
    hw.getNodes().controlable.getData({test:"desdkosefsmelfesml"})
},1000)

setTimeout(function(){
    hw.setData({test:"foo", seen:false})
},2000)

setTimeout(function(){
    hw.setData({testSync:"push push"})
},7000)


setTimeout(function(){
    hw.append(button.instance(),"mountPoint")
    setTimeout(function(){
        hw.update()
        setTimeout(function(){
            hw.clearSlot("mountPoint")
        },2000)
    },5000)
},5000)