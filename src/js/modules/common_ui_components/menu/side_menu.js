import createAdler from "../../../vendor/adler.js";


var softUpdate= function (event, data, instance) {

}

var setUpData= function(event, data, instance) {
    instance.getDOMElement().innerHTML=""
    console.log(instance.props);
    var content= instance.props.sections.get()
    for (let i = 0; i < content.length; i++) {
        const element = content[i];
        var htmlSection = document.createElement("p");
        htmlSection.classList="menu-label";
        htmlSection.innerHTML=element.value;
        instance.getDOMElement().appendChild(htmlSection)

        var htmlList = document.createElement("ul");
        htmlList.classList="menu-list";
        
        for (let j = 0; j < element.items.length; j++) {
            const listElement = element.items[j];
            var htmlItem = document.createElement("li");
            var icon=''
            if (listElement.iconPath) {
                icon= `<img class="darkModeCompatibleIcons" src="./img/icons/${listElement.iconPath}" style="height: 1.2em; margin-top: -4px;">`
                // icon= `<img class="darkModeCompatibleIcons" src="./img/icons/${listElement.iconPath}" style="filter: invert(100%);">`
            }
            if (instance.props.activeItem.get() && instance.props.activeItem.get() == listElement.id) {
                htmlItem.innerHTML=`<a class="is-active" >${icon} ${listElement.value}</a>`;
            }else{
                htmlItem.innerHTML=`<a>${icon} ${listElement.value}</a>`;
            }
            
            htmlItem.addEventListener("click", listElement.onClick)
            htmlList.appendChild(htmlItem)
        }
        instance.getDOMElement().appendChild(htmlList)
    }
}

var component =createAdler({
    content: p => /*html*/`
        <aside class="menu">
            <p class="menu-label">
            General
            </p>
            <ul class="menu-list">
            <li><a>Dashboard</a></li>
            <li><a>Customers</a></li>
            </ul>
            <p class="menu-label">
            Administration
            </p>
            <ul class="menu-list">
            <li><a>Team Settings</a></li>
            <li>
                <a class="is-active">Manage Your Team</a>
                <ul>
                <li><a>Members</a></li>
                <li><a>Plugins</a></li>
                <li><a>Add a member</a></li>
                </ul>
            </li>
            <li><a>Invitations</a></li>
            <li><a>Cloud Storage Environment Settings</a></li>
            <li><a>Authentication</a></li>
            </ul>
            <p class="menu-label">
            Transactions
            </p>
            <ul class="menu-list">
            <li><a>Payments</a></li>
            <li><a>Transfers</a></li>
            <li><a>Balance</a></li>
            </ul>
        </aside>
        `,
    params:{
        props:{
            sections:[
                {
                    value:"chapter",
                    items:[
                        {id:1, value:"test",onClick:()=> alert("test")},
                        {id:2, value:"test",onClick:()=> alert("test")},
                    ]
                },
                {
                    value:"chapter2",
                    items:[
                        {id:3, value:"test2",onClick:()=> alert("test")},
                    ]
                },
            ],
            activeItem:3
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
            // [".tableCddomponent","click", (event, data, instance)=> data.onClick(event, data, instance) ],
        ],
        events:{
            // onBeforeMount:(event, data, instance) => setUpData(event, data, instance),
            onMount:(event, data, instance) => setUpData(event, data, instance),
            
        },
        methods:{
            softUpdate:(event, data, instance)=>softUpdate(event, data, instance),
        },
    },
    // css:/*css*/` `,
})

export default component