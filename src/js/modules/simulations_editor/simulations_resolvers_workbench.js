import nanoid from "../../vendor/nanoid.js"

var createWorkbenchNodeLogic = function(node){
    var self = {}
    var linkedNode = node
    var nodeLogicId = nanoid()
    if (linkedNode && linkedNode.params.uuid) {
        nodeLogicId = linkedNode.params.uuid
    }

    var matrix = [
        [3,2,1,3,2,1],
        [3,2,1,3,2,1],
        [3,2,1,3,2,1],
        [3,2,1,3,2,1],
    ]
    // matrix = [
    //     [1],
    //     [1],
    //     [1,1],
    //     [1],
    //     [1],
    //     [1],
    // ]
    var itemsInside =[]
    var benchMatrix =[]
    var benchMapping={}
    var itemMapping={}
    var bench = undefined

    var init = function () {
        for (let i = 0; i < matrix.length; i++) {
            const row = matrix[i];
            for (let j = 0; j < row.length; j++) {
                const col = row[j];
                var bench = createBench({i:i, j:j}, col, benchMatrix)
                benchMapping[bench.getId()] = bench
                if (!benchMatrix[i]) {
                    benchMatrix[i] = []
                }
                benchMatrix[i][j] = bench
            }
            
        }
        
    }
    var getBenchMatrix = function () {
        return benchMatrix
    }
    var createBench = function(position, type, benchArea){
        var self = {}
        var id=position.i+"_"+position.j
        var position = position
        var slot = undefined
        var assignedWorker = undefined
        var linePriority = type
        var init = function () {
            
        }
        var isWorkable = function(){
            if (linePriority == 1) {
                return true
            } else {
                var noOtherPriority = true
                for (let k = 1; k < linePriority; k++) {
                    // const element = array[i];
                    // var lenghtOfRow = benchArea[position.i]
                    var sideBench = benchArea[position.i][position.j+k] //you need to add to go right
                    if (sideBench && sideBench.getSlot() && sideBench.getSlot()[nodeLogicId]< 100) {
                        noOtherPriority = false
                        return noOtherPriority
                    }
                }
                return noOtherPriority
            }
        }
        var canExit = function(){
            var exitFree = true
                for (let k = 1; k < benchArea[position.i].length-position.j; k++) {
                    // const element = array[i];
                    // var lenghtOfRow = benchArea[position.i]
                    var sideBench = benchArea[position.i][position.j+k] //you need to add to go right
                    var isOccupied = sideBench.getSlot()
                    if (sideBench && isOccupied && sideBench.getSlot()[nodeLogicId]< 100 ) {
                        
                        exitFree = false
                        return exitFree
                    }
                }
                return exitFree
        }
        var isReachable = function(){
            var reachable = true
            for (let k = 1; k < position.j+1; k++) {
                var sideBench = benchArea[position.i][position.j-k] //you need to add to go left
                if (sideBench && sideBench.getSlot() ) {
                    reachable = false
                    return reachable
                }
            }
            return reachable
        }
        var getPrevious = function () {
            
        }
        var getNext = function(){

        }
        var getLeft = function () {
            
        }
        var getRight = function(){
            
        }
        var getSlot = function () {
            return slot
        }
        var setSlot = function (item) {
            slot = item
        }
        var exitSlot = function () {
            var itemToExit = slot
            slot = undefined
            return itemToExit
        }
        var getId = function () {
            return id
        }
        var getPosition = function(){
            return position
        }
        init()
        
        self.canExit = canExit
        self.isReachable = isReachable
        self.isWorkable = isWorkable
        self.exitSlot = exitSlot
        self.getPosition = getPosition
        self.setSlot = setSlot
        self.getSlot = getSlot
        self.getId = getId
        return self
    }

    var findAvailableSpotInRow = function (row) {
        for (let i = row.length-1; i >= 0; i--) {
            const bench = row[i];
            if (!bench.getSlot()) {
                return bench
            }
            
        }
        return undefined
    }

    var findAvailableSpot = function(){
        for (let i = 0; i < benchMatrix.length; i++) {
            const benchRow = benchMatrix[i];
            var potentialBench = findAvailableSpotInRow(benchRow)
            if (potentialBench && potentialBench.isReachable()) {
                return potentialBench
            }
        }
        return undefined

    }
    var getAllItems = function () {
        var listOfItems = []
        
        for (let i = 0; i < benchMatrix.length; i++) {
            const benchRow = benchMatrix[i];
            for (let j = 0; j < benchRow.length; j++) {
                const bench = benchRow[j];
                if (bench.getSlot()) {
                    listOfItems.push({item:bench.getSlot(), bench:bench, progress:bench.getSlot()[nodeLogicId],i,j})
                }
            }
            
        }
        return listOfItems
    }
    var getAllItemsProgress = function () {
        var listOfItems = []
        
        for (let i = 0; i < benchMatrix.length; i++) {
            const benchRow = benchMatrix[i];
            for (let j = 0; j < benchRow.length; j++) {
                const bench = benchRow[j];
                if (bench.getSlot()) {
                    listOfItems.push({item:bench.getSlot(), progress:bench.getSlot()[nodeLogicId],i,j, bench:bench})
                }
            }
            
        }
        return listOfItems
    }

    // var doWorkCycle = function(){
    //     var allItems = getAllItems()
    //     for (let i = 0; i < allItems.length; i++) {
    //         const itemInfo = allItems[i];
            
    //         var isFinished =itemInfo.item[nodeLogicId]>= 100
    //         if (!isFinished) {
                
    //             itemInfo.item[nodeLogicId] +=10
    //         }
    //     } 
    //     return allItems
    // }

    var doWorkCycle = function(){
        var allItems = getAllItems()
        for (let i = 0; i < allItems.length; i++) {
            const itemInfo = allItems[i];
            
            var isFinished =itemInfo.item[nodeLogicId]>= 100
            if (!isFinished && itemInfo.bench.isWorkable()) {
                
                itemInfo.item[nodeLogicId] += parseInt(node.evalData.workPerTime)
            }
            if (itemInfo.item[nodeLogicId] == 0) {
                debugger
            }
        } 
        return allItems
    }

    var getFinishedItems = function () {
        // var allItems = getAllItems()
        var finishedItems = []
        // for (let i = 0; i < allItems.length; i++) {
        //     const itemInfo = allItems[i];
        //     if (itemInfo.item[nodeLogicId]>= 100) {
        //         finishedItems.push(itemInfo)
        //     }
        // }
        var longerRow = 0 //find the longest row to iterate
        for (let i = 0; i < benchMatrix.length; i++) {
            const benchRow = benchMatrix[i];
            if (benchRow.length > longerRow) {
                longerRow = benchRow.length
            }
        }
        //iterate from the front
        for (let i = longerRow-1; i >=0; i--) {
            for (let j = 0; j < benchMatrix.length; j++) {
                const benchRow = benchMatrix[j];
                if (benchRow[i]) {
                    if (benchRow[i].getSlot() && benchRow[i].getSlot()[nodeLogicId]>=100 && benchRow[i].canExit()) {
                        finishedItems.push({item:benchRow[i].getSlot(), progress:benchRow[i].getSlot()[nodeLogicId],i:j,j:i, bench:benchRow[i]}) //invers j and i cause of matrix order
                    }
                }
            }
        }
        
        // return finishedItems.reverse()
        return finishedItems
    }
    var freeItem = function (uuid) {
        
        var bench = itemMapping[uuid]
        delete itemMapping[uuid]
        return bench.exitSlot()
    }

    var getSpaceLeft = function () {
        var spotLeft = 0
        for (let i = 0; i < benchMatrix.length; i++) {
            const benchRow = benchMatrix[i];
            for (let j = 0; j < benchRow.length; j++) {
                // const bench = benchRow[j];
                if (!benchRow[j].getSlot()) {
                    spotLeft++
                }else{
                    break
                }
            }
            // var potentialBench = findAvailableSpotInRow(benchRow)
            // if (potentialBench && potentialBench.isReachable()) {
            //     return potentialBench
            // }
        }
        return spotLeft
    }

    var inject = function(items){
        var injected = []
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            var availableBench = findAvailableSpot()
            if (availableBench) {
                availableBench.setSlot(item)
                itemMapping[item.uuid]=availableBench
                //tag item for getting a attribute to work on
                if (nodeLogicId) {
                    item[nodeLogicId] = 0
                }
                
            }
            injected.push({bench:availableBench,item:item })
        }
        return injected
    }
    var getNodeLogicId = function(){return nodeLogicId; }

    init()
    // debugger
    console.log(benchMatrix);
    console.log(benchMapping);
    
    self.getSpaceLeft=getSpaceLeft
    self.freeItem=freeItem
    self.getFinishedItems=getFinishedItems
    self.getAllItemsProgress=getAllItemsProgress
    self.doWorkCycle=doWorkCycle
    self.getAllItems=getAllItems
    self.inject=inject
    self.getBenchMatrix=getBenchMatrix
    self.getNodeLogicId = getNodeLogicId
    return self
}

export default createWorkbenchNodeLogic