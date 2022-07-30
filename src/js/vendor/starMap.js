var createRouter = function(){
    var self = {}
    var routes = []
  
    var setListener = function(){
      window.addEventListener('hashchange', function() {
        // new hash value
        setPageFromUrl()
      });
    }
  
  
    var setPageFromUrl = async function(){
      // var hash = new URL(document.URL).hash;
      let url = window.location.hash.slice(1) || '/';
      console.log(url);
      if (url) {
        resolveUrl(url)
      }
    }

    var resolveUrl = function (url) {
        var urlToResolve = url
        if(urlToResolve[0]=="/"){
            urlToResolve = urlToResolve.slice(1)
        }
        let resolvedRoute = findRoute(urlToResolve)
        if(resolvedRoute){
          resolvedRoute.callback({params:resolvedRoute.params, route:resolvedRoute.route,})
        }
    }
  
    var findRoute = function (url) {
      var splitUrl = url.split("/")
      var result = {match:false,route:undefined, callback: undefined, params:{}}
  
      for (let i = 0; i < routes.length; i++) {
        const currentRoute = routes[i];
        if(!result.match && splitUrl.length == currentRoute.route.length){ //if no match found and length match
          
          result.params = {};//reset params
          result.callback = {};//reset callback
          result.route = undefined;//reset callback
  
          for (let k = 0; k < splitUrl.length; k++) {
            const urlPart = splitUrl[k];
            const routePart = currentRoute.route[k];
            if (routePart && routePart[0] == ":") {//if is a param
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
            }
            
          }
  
        }else if(result.match){
          console.log(result);
          return result
        }else{
          return undefined
        }
  
      }
    }
  
    var route = function (route, callback) {
      var splitRoute = route.slice(1).split("/")
      var routeObject = {
        route:splitRoute,
        callback:callback,
      }
      routes.push(routeObject)
      console.log(splitRoute);
    }
  
    var init= function () {
      setPageFromUrl()
      setListener()
    }
  
    self.listen = init
    self.route = route
    return self
  }

  export default createRouter