import createAdler from "../../vendor/adler.js";
import userManagement from "../common_user_management/user_management.js";

var getCurrentUser = function () {
    return userManagement.getCurrentUser()
}

var project_selection =createAdler({
    content: p => /*html*/`
            <button class="action1 adlerButton">${p.currentUserName} world</button><p class="action2">${p.test2} here</p>
                <div class="masonry">
                <div class="brick">
                    <div class="card">
                        <header class="card-header">
                        <p class="card-header-title">
                            Card header fqzflm zqkfdl mqdkml qfjqml lmf lqfmlq,mfzq
                        </p>
                        <button class="card-header-icon" aria-label="more options">
                            <span class="icon">
                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                        </button>
                        </header>
                    </div>
                </div>
                <div class="brick">
                    <div class="card">
                        <header class="card-header">
                        <p class="card-header-title">
                            Card header
                        </p>
                        <button class="card-header-icon" aria-label="more options">
                            <span class="icon">
                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                        </button>
                        </header>
                    </div>
                </div>
                <div class="brick">
                    <div class="card">
                        <header class="card-header">
                        <p class="card-header-title">
                            Card head er dz ql, mlzk f mqlfjozq jfkl qzjflqz ml fqlzj flmzqj flkjql kfjqlz f
                        </p>
                        <button class="card-header-icon" aria-label="more options">
                            <span class="icon">
                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                        </button>
                        </header>
                    </div>
                </div>
                <div class="brick">
                    <div class="card">
                        <header class="card-header">
                        <p class="card-header-title">
                            Card header
                        </p>
                        <button class="card-header-icon" aria-label="more options">
                            <span class="icon">
                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                        </button>
                        </header>
                    </div>
                </div>
                <div class="brick">
                <img src="files/images/pears.jpg" alt="Pears" title="Pears">
                </div>
                <div class="brick">
                <img src="files/images/easter-eggs.jpg" alt="Easter-eggs" title="Easter-eggs">
                </div>
                <div class="brick">
                <img src="files/images/lemons.jpg" alt="Lemons" title="Lemons">
                </div>
                <div class="brick">
                <img src="files/images/cherries.jpg" alt="Cherries" title="Cherries">
                </div>
                <div class="brick">
                <img src="files/images/grapes.jpg" alt="Grapes" title="Grapes">
                </div>
            </div><!-- .masonry -->
        `,
    params:{
        data:{
            test:"project seelction",
            test2:"seelction",
            currentUserName:"Undefined",
        },
        on:[
            [".action1","click", (event, data)=> alert("test "+ data.test)],
            [".action2","click", (event, data, instance)=> instance.setData({test:"barr"}) ],
        ],
        events:{
            // onBeforeMount:(event, data, instance)=> alert("MOUNTING"),
            onBeforeMount:(event, data, instance) => instance.setData({currentUserName:getCurrentUser().name}, false),
        },
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

export default project_selection