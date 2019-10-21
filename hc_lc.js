var parseDate = d3.timeParse("%b-%y");
d3.csv("./data/monthly_sales.csv")
    .row(function(d){ 
        var hm_total = Number(d['HM-SE']) + Number(d['HM-NE']) + Number(d['HM-NW']) + Number(d['HM-SW']) + Number(d['HM-C']);
        var cf_total = Number(d['CF-SE']) + Number(d['CF-NE']) + Number(d['CF-NW']) + Number(d['CF-SW']) + Number(d['CF-C']); 
        var ff_total = Number(d['FF-SE']) + Number(d['FF-NE']) + Number(d['FF-NW']) + Number(d['FF-SW']) + Number(d['FF-C']);        
        return {
            HM_Total: hm_total/  1000000,
            CF_Total: cf_total/  1000000,
            FF_Total: ff_total/  1000000,
            NE_Total: (Number(d['HM-NE']) + Number(d['FF-NE']) + Number(d['CF-NE'])) / 1000000,
            NW_Total: (Number(d['HM-NW']) + Number(d['FF-NW']) + Number(d['CF-NW']))/ 1000000,
            SE_Total: (Number(d['HM-SE']) + Number(d['FF-SE']) + Number(d['CF-SE']))/ 1000000,
            SW_Total: (Number(d['HM-SW']) + Number(d['FF-SW']) + Number(d['CF-SW'])) / 1000000,
            C_Total: (Number(d['HM-C']) + Number(d['FF-C']) + Number(d['CF-C']))/ 1000000,
            date: parseDate(d['Month, Year']),
            Total: (hm_total+ cf_total + ff_total)/  1000000
        }; })
    .get(function(error,data){

      var ne = [];
      var se = [];
      var nw = [];
      var sw = [];
      var c = [];
      var hm = []
      var cf = [];
      var ff = [];
      var year = [];
      var ht = 0;
      var ft = 0;
      var ct = 0;
      var t = 0;
      for(var index in data) {
         if (index != 'columns'){
            var obj = data[index];
            console.log(index)
            console.log(obj)
            ht += obj['HM_Total']
            ct += obj['CF_Total']
            ft += obj['FF_Total']
            t += obj.HM_Total + obj.CF_Total + obj.FF_Total
            if(obj.date >= new Date(2018, 0, 0)){
               hm.push(obj['HM_Total']);
               ne.push(obj['NE_Total']);
               nw.push(obj['NW_Total']);
               se.push(obj['SE_Total']);
               sw.push(obj['SW_Total']);
               c.push(obj['C_Total']);
               cf.push(obj['CF_Total']);
               ff.push(obj['FF_Total']);
               year.push(d3.timeFormat("%b-%Y")(obj['date']));
            }}
      }
   
   var series = [
      {
          name: 'North east',
          data: ne
             
      }, 
      {
         name: 'North west',
         data: nw
      },
      {
         name: 'South west',
         data: sw
      },
      {
         name: 'South east',
         data: se
      },
      {
         name: 'Central',
         data: c
      },
   ];

   var xAxis = {
      title: {
         text: 'Year'
      },
       categories: year
    };

     // Configuration about the plot
 var title = {
   text: 'Downward trend of overall sales due to the introduction of the impossible burger by region'   
};


var yAxis = {
   title: {
      text: 'Sales (USD Million)'
   },
   plotLines: [{
      value: 0,
      width: 1,
      color: '#808080'
   }]
};  

var legend = {
   layout: 'vertical',
   align: 'right',
   verticalAlign: 'middle',
   borderWidth: 0
};


// Data structure to hold all the configurations together
var json = {};

// Tying all the configurations
json.title = title;
json.xAxis = xAxis;
json.yAxis = yAxis;
json.legend = legend;

// Tying the data as the series data
json.series = series;

// We need to couple the chart data structure with the chartPlaceHolder div
var someVar = document.getElementById("regions");
Highcharts.chart(someVar, json);


var series2 = [{
   name: 'Percentage',
   colorByPoint: true,
   data: [
   {
       name: 'Hamburger',
       y: ht/t
          
   }, 
   {
      name: 'Chicken Filet',
      y: ct/t
   }, 
   {
      name: 'Fish Filet',
      y: ft/t
   }
   ]}];



var chart = {
   plotBackgroundColor: null,
   plotBorderWidth: null,
   plotShadow: false,
   type: 'pie' 
};

// Configuration about the plot
var title = {
   text: 'Percentage of Sales by product'   
};


var legend = {
   layout: 'vertical',
   align: 'right',
   verticalAlign: 'middle',
   borderWidth: 0
};


var plotOptions = {
   pie: {
     allowPointSelect: true,
     cursor: 'pointer',
     dataLabels: {
       enabled: true,
       format: '<b>{point.name}</b>: {point.percentage:.1f} %'
     }
   }
 };

// Data structure to hold all the configurations together
var json = {};

// Tying all the configurations
json.chart = chart;
json.title = title;
json.legend = legend;
json.plotOptions = plotOptions;

// Tying the data as the series data
json.series = series2;

// We need to couple the chart data structure with the chartPlaceHolder div
var someVar = document.getElementById("percentage_sales");
Highcharts.chart(someVar, json);



var series3 = [
   {
      name: 'Total Sales',
      data: [11.537605, 11.783337, 11.503497, 11.653009, 12.023086, 11.647873, 11.671713, 12.234701, 12.016076, 11.319166, 11.911041, 11.624733]
   }

];


   var chart = {
      type: 'bar'   
   };
   
   // Configuration about the plot
   var title = {
      text: 'Average Sales by month'   
   };
   
   var xAxis = {
      title: {
         text: 'Month'
      },
      categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
   };
   var yAxis = {
      title: {
         text: 'Sales (USD Millions)'
      },
      plotBar: [{
         value: 0,
         width: 1,
         color: '#808080'
      }]
   };  
   
   
   var legend = {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0
   };
   
   // Data structure to hold all the configurations together
   var json = {};
   
   // Tying all the configurations
   json.chart = chart;
   json.title = title;
   json.xAxis = xAxis;
   json.yAxis = yAxis;
   json.legend = legend;
   
   // Tying the data as the series data
   json.series = series3;
   
   // We need to couple the chart data structure with the chartPlaceHolder div
   var someVar = document.getElementById("Sales_by_month");
   Highcharts.chart(someVar, json);





   var series4 = [
      {
         name: 'Daily mean Fish Filet Sales',
         data: [40282.20,48357.50,44156.25,46205.50,52766.80,44751.50,40106.40]
      }
   
   ];
   
   
      var chart = {
         type: 'bar'   
      };
      
      // Configuration about the plot
      var title = {
         text: 'Average Fish Filet Sales by day'   
      };
      
      var xAxis = {
         title: {
            text: 'Month'
         },
         categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday', 'Saturday', 'Sunday']
      };
      var yAxis = {
         title: {
            text: 'Sales (USD)'
         },
         plotBar: [{
            value: 0,
            width: 1,
            color: '#808080'
         }]
      };  
      
      
      var legend = {
         layout: 'vertical',
         align: 'right',
         verticalAlign: 'middle',
         borderWidth: 0
      };
      
      // Data structure to hold all the configurations together
      var json = {};
      
      // Tying all the configurations
      json.chart = chart;
      json.title = title;
      json.xAxis = xAxis;
      json.yAxis = yAxis;
      json.legend = legend;
      
      // Tying the data as the series data
      json.series = series4;
      
      // We need to couple the chart data structure with the chartPlaceHolder div
      var someVar = document.getElementById("Fish_Filet_Sales");
      Highcharts.chart(someVar, json);







});










