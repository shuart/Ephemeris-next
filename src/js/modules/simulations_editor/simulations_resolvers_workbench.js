var createWorkbenchNodeLogic = function(){
    var self = {}

    var matrix = [
        [3,2,1,3,2,1],
        [3,2,1,3,2,1],
        [3,2,1,3,2,1],
        [3,2,1,3,2,1],
    ]
    var itemsInside =[]
    var benchMatrix =[]
    var benchMapping={}
    var bench = undefined

    var init = function () {
        for (let i = 0; i < matrix.length; i++) {
            const row = matrix[i];
            for (let j = 0; j < row.length; j++) {
                const col = row[j];
                var bench = createBench({i:i, j:j}, col)
                benchMapping[bench.getId()] = bench
                if (!benchMatrix[j]) {
                    benchMatrix[j] = []
                }
                benchMatrix[i][j] = bench
            }
            
        }
    }
    var getBenchMatrix = function () {
        return benchMatrix
    }
    var createBench = function(position, type){
        var self = {}
        var id=position.i+"_"+position.j
        var position = position
        var slot = undefined
        var assignedWorker = undefined
        var init = function () {
            
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
            if (potentialBench) {
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
                    listOfItems.push({item:bench.getSlot(), bench:bench})
                }
            }
            
        }
        return listOfItems
    }

    var inject = function(items){
        var injected = []
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            var availableBench = findAvailableSpot()
            if (availableBench) {
                availableBench.setSlot(item)
            }
            injected.push({bench:availableBench,item:item })
        }
        return injected
    }

    init()
    // debugger
    console.log(benchMatrix);
    console.log(benchMapping);
    
    self.getAllItems=getAllItems
    self.inject=inject
    self.getBenchMatrix=getBenchMatrix
    return self
}

export default createWorkbenchNodeLogic