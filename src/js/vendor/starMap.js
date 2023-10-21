var createRouter = function(){
    var self = {}
    var routes = []
    var middlewares = []
    var rootMiddlewares = []
  
    var setListener = function(){
      window.addEventListener('hashchange', function() {
        // new hash value
        //TODO not trigger
        setPageFromUrl()
      });
    }
    var setPageFromUrl = async function(){
      // var hash = new URL(document.URL).hash;
      let url = window.location.hash.slice(1) || '/';
      // console.log(url);
      if (url) {
        resolveUrl(url)
      }
    }

    function notifySearchParamChange(data){
      // for (let i = 0; i < subscribers.length; i++) {
      //     subscribers[i].callback(data);
          
      // }
      //use global event
      const event = new CustomEvent('search_param_update', { detail: {} });
      window.dispatchEvent(event);
  }

    var resolveUrl = function (url) {
        var urlToResolve = url.split("?")[0] // get url without search parmas 
        var searchParams = url.split("?")[1]
        if(urlToResolve[0]=="/"){
            urlToResolve = urlToResolve.slice(1)
        }
        let resolvedRoute = findRoute(urlToResolve, searchParams)
        if(resolvedRoute){
          console.log(resolvedRoute)
          applyMiddelwares(resolvedRoute)
          // resolvedRoute.callback({params:resolvedRoute.params, route:resolvedRoute.route,})
        }
    }

    var applyMiddelwares = function (resolvedRoute, middlewareIndex) {
      //rootMiddlewares
      var middlewareIndex =middlewareIndex || 0
      if (rootMiddlewares[middlewareIndex]) {
        var next= function(){
          applyMiddelwares(resolvedRoute,middlewareIndex+1 )
        };
        rootMiddlewares[middlewareIndex](resolvedRoute.params,resolvedRoute, next )
      }else{//resolve directly
        resolvedRoute.callback({params:resolvedRoute.params, route:resolvedRoute.route,})
      }
    }
  
    var findRoute = function (url, searchParams) {
      var splitUrl = url.split("/")
      var result = {match:false,route:undefined, callback: undefined, params:{}, searchParams:{}, url:"/"+url}

      //assign search params
      if (searchParams) {
        var allParams = searchParams.split("&")
        for (let i = 0; i < allParams.length; i++) {
          const sparams = allParams[i].split("=");
          var sparamId = sparams[0]
          var sparamValue = sparams[1]
          result.searchParams[sparamId] = sparamValue
        }
      }

      if ((typeof splitUrl[0] === 'string' && splitUrl[0].length === 0)) {//if root
        for (let i = 0; i < routes.length; i++) {
          if(  (typeof routes[i].route[0] === 'string' && routes[i].route[0].length === 0)){
              result.match = true
              result.callback = routes[i].callback;
              result.route  = splitUrl;
              // console.log(result);
              return result
          }
        }
      }
  
      for (let i = 0; i < routes.length; i++) {
        const currentRoute = routes[i];
        //check if root
        
        // console.log(routes, splitUrl,currentRoute.route, !result.match && splitUrl.length == currentRoute.route.length)
        if(!result.match && splitUrl.length == currentRoute.route.length){ //if no match found and length match
          
          result.params = {};//reset params
          result.callback = {};//reset callback
          result.route = undefined;//reset callback
  
          for (let k = 0; k < splitUrl.length; k++) {
            const urlPart = splitUrl[k];
            const routePart = currentRoute.route[k];
            console.log(currentRoute.route);
            console.log(routePart, urlPart);
            if (routePart && routePart[0] == ":") {//if is a param
              console.log("isparam")
              result.params[routePart.slice(1)] = urlPart;
              result.match = true
              result.callback = currentRoute.callback;
              result.route  = splitUrl;
            } else if(routePart && routePart == urlPart) {
              result.match = true
              result.callback = currentRoute.callback;
              result.route  = splitUrl;
            } else{
              result.match = false
              break
            }
            
          }
          console.log("check match");
          console.log(result);
          if(result.match){
            // console.log(result);
            return result
          }
  
        }
        // else if(result.match){
        //   console.log(result);
        //   return result
        // }
  
      }
      return undefined
    }

    function use(route /*, num1, …, numN */) {
      var base = route;
      var middlewaresStore = middlewares;
      if (base == "/") {
        middlewaresStore = rootMiddlewares;
      }
      for (let i = 1; i < arguments.length; i++) {
        middlewaresStore.push(arguments[i]);
      }
    }

    function setSearchParams(id, value, mode) { //mode can be "silent"
      
      let url = window.location.hash.slice(1) || '/';
      var currentParams = []

      if (url.split("?")[1]) {//if there are already search params
        
        var splitedParams = url.split("?")[1].split("&")
        url = url.split("?")[0]
        var updated=false;
        for (let i = 0; i < splitedParams.length; i++) {
          const sparam = splitedParams[i].split("=");
          if (sparam[0]==id) { //check if param should be updated
            sparam[1]=value
            updated=true
          }
          currentParams.push({id:sparam[0], value:sparam[1]})
        }
        if (!updated) { //if id set is new, add it to the list
          currentParams.push({id:id, value:value})
        }
      }else{
        currentParams.push({id:id, value:value})
      }

      var urlWithSearchParams = url +"?"
      for (let i = 0; i < currentParams.length; i++) {
        const element = currentParams[i];
        var joinSymbol =""
        if (i>0) {
          joinSymbol ="&"
        }
        urlWithSearchParams +=joinSymbol+currentParams[i].id + "="+ currentParams[i].value
      }
      console.log(urlWithSearchParams);
      var hrefUrl = "#"+urlWithSearchParams
      window.history.pushState({}, window.title, hrefUrl) // Update URL as well as browser history.
      if (mode != "silent") {
        setPageFromUrl()
      }
      notifySearchParamChange()
      
    }

    function goTo(url) {
      if (url.mode && url.mode =="replace") {
        replaceCurrentUrl (url.url)
      } else if(url[1] == ":"){
        updateCurrentUrl(url)
      }else{
        var hrefUrl = url
        // hrefUrl = hrefUrl.slice(1); // remove the leading slash
        hrefUrl = "#"+hrefUrl
        // console.log(hrefUrl);
        window.history.pushState({}, window.title, hrefUrl) // Update URL as well as browser history.
      }
      setPageFromUrl()
    }

    function updateCurrentUrl(updated) {
      var updated = updated.split("/")
      let url = window.location.hash.slice(1) || '/';
      url = url.split("/")
      console.log(url)
      console.log(updated)

      for (let i = 0; i < updated.length; i++) {
        const element = updated[i];
        if (element == ":") {
          updated[i] = url[i]
        }
      }
      var hrefUrl ="#"
      for (let j = 0; j < updated.length; j++) {

        if(updated[j] != ""){
          hrefUrl +="/"+updated[j]
        }
      }
      window.history.pushState({}, window.title, hrefUrl) // Update URL as well as browser history.
    }

    function replaceCurrentUrl (replacement) {
      var replacement = replacement.split("/")
      let url = window.location.hash.slice(1) || '/';
      url = url.split("/")
      console.log(url)
      var toReplace= url.length-1
      for (let i = replacement.length-1; i > -1; i--) {
        const element = replacement[i];
        url[toReplace] = replacement[i]
        toReplace--
      }
      console.log(url);
      var hrefUrl ="#"
      for (let j = 0; j < url.length; j++) {
        const element = url[j];
        if(url[j] != ""){
          hrefUrl +="/"+url[j]
        }
      }
      window.history.pushState({}, window.title, hrefUrl) // Update URL as well as browser history.
    }
    
    
  
    var route = function (route, callback) {
      var splitRoute = route.slice(1).split("/")
      var routeObject = {
        route:splitRoute,
        callback:callback,
      }
      routes.push(routeObject)
      // console.log(splitRoute);
    }
  
    var init= function () {
      setPageFromUrl()
      setListener()
    }
  
    self.goTo = goTo
    self.setSearchParams = setSearchParams
    self.use = use
    self.listen = init
    self.route = route
    return self
  }

  export default createRouter