function topologicalOrdering(data) {
    let adgencyList = createAdgencyList(data);
    let parentsList = createParentsList(data);
    let order = dfsTopSort(data, adgencyList);
    console.log(order)
    let ordered = data.nodes.sort((a,b)=>{
        return order[a.params.uuid]>order[b.params.uuid]
    })
    console.log(ordered)
    return {
        orderedNodes:ordered,
        order:order,
        adgencyList:adgencyList,
        parentsList:parentsList,
        originalData:data,
    }
    
    
    function createAdgencyList(data) {
        let adgencyList = {};
        data.nodes.forEach(element => {
            adgencyList[element.params.uuid]=[]
        });

        data.links.forEach(element => {
            adgencyList[element.from].push(element.to)
        });
        return adgencyList
    }
    function createParentsList(data) {
        let parentsList = {};
        data.nodes.forEach(element => {
            parentsList[element.params.uuid]=[]
        });

        data.links.forEach(element => {
            parentsList[element.to].push(element.from)
        });
        return parentsList
    }
    function dfsTopSortHelper(v, n, visited, topNums, adjacencyList) {
        visited[v] = true;
        const neighbors = adjacencyList[v];
        for (const neighbor of neighbors) {
            if (!visited[neighbor]) {
                n = dfsTopSortHelper(neighbor, n, visited, topNums,adjacencyList);
            }
        }
        topNums[v] = n;
        return n - 1;
    }

    function dfsTopSort(data, adgencyList) {
        const vertices = Object.keys(adgencyList);
        const visited = {};
        const topNums = {};
        let n = vertices.length - 1;
        for (const v of vertices) {
            if (!visited[v]) {
                n = dfsTopSortHelper(v, n, visited, topNums, adgencyList)
            }
        }
        return topNums;
    }
    
    //console.log(dfsTopSort(graph));
}


export default topologicalOrdering