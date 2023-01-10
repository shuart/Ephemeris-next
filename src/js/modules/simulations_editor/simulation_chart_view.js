import apexcharts from '../../vendor/charts/apexCharts.js';

var createChartView = function ({
    container = document.body,
    canvasWidth =800, canvasHeight = 500,
    darkMode = "auto",
    uiCallbacks = {},//onConnect,
    } = {}) {
    var self ={}
    var chart = undefined


    function updateChart(nodes) {

        let newSeries = []
        for (const key in nodes) {
            if (nodes.hasOwnProperty.call(nodes, key)) {
                const element = nodes[key];
                if (element) {
                    newSeries.push({
                        name: key,
                        data: element,
                      })
                }
            }
        }
        chart.updateSeries(newSeries)
    
        // if (localConfig.chartScale !=1 || localConfig.chartOffset != 0) {
        //     Reports.status.scaledFrames.push((Reports.status.frame+1)*localConfig.chartScale+localConfig.chartOffset)
        //     chart.updateOptions({
        //         xaxis: {
        //           categories: Reports.status.scaledFrames
        //         }
        //       })
        // }
        
    }
    

    var updateFromData = function(data){
        
        updateChart(data)
    }

    var init= function(){
        container.innerHTML =''
        var options = {
            chart: {
              type: 'line'
            },
            series: [{
              name: 'sales',
              data: [30,40,35,50,49,60,70,91,125]
            }],
            // xaxis: {
            //   categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
            // }
          }
          
          chart = new apexcharts(container, options);
          
          chart.render();
    }

    init()
    self.updateFromData = updateFromData
    return self
    
    
}

export default createChartView