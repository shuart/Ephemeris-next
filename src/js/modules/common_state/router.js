import createRouter from "../../vendor/starMap.js";
const common_router = createRouter()


common_router.route("/projetff/modee/teet/:id", (event)=> console.log(event))
common_router.route("/projet/module/test/:id", (event)=> console.log(event))
common_router.listen()

export default common_router