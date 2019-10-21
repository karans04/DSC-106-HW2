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
            date: parseDate(d['Month, Year']),
            Total: (hm_total+ cf_total + ff_total)/  1000000
        }; })
    .get(function(error,data){
        if (error) throw error;

        var margin = {top:100, right: 20, bottom:30, left:60},
        width = 860 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

        var allGroup = ["Hamburger", "Chicken Filet", "Fish Filet"]

        var color = d3.scaleOrdinal(['#4daf4a']);  

        var maxDate = d3.max(data, function(d){return d.date;});
        var minDate = d3.min(data, function(d){return d.date;});
        var maxTotal = (d3.max(data, function(d){return d.Total;}));
        var minTotal = (d3.min(data, function(d){return d.Total;}));

        var x = d3.scaleTime()
                  .domain([minDate, maxDate])
                  .range([0,width]);

        var yAxis = d3.axisLeft(y)
        var xAxis = d3.axisBottom(x)


        var y = d3.scaleLinear()
                  .domain([minTotal, maxTotal])
                  .range([height, 0]);

        var svg = d3.select("#my_dataviz").append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom + 60)
                  .append("g")
                  .attr("transform",
                      "translate(" + margin.left + "," + margin.top + ")");


        
                
        var before = [];
        var after = [];
        var sales_drop = [];

        for(var index in data) {
            var obj = data[index];

            if (index < data.length-1){
                second = (data[Number(index) + 1])
                sales_drop.push((second.Total - obj.Total) / second.Total );
            }
            
        
            //Filter dates from 2011 and newer
            if(obj.date <= new Date(2018, 9, 0)){
                before.push(obj);
            } 
            if(obj.date >= new Date(2018, 8, 0)){
                after.push(obj)
            }
        }
        console.log(d3.min(sales_drop))
        var oct_drop = ((after[1].Total - after[0].Total)/ after[1].Total)

        var count = 0
        for(var index in sales_drop){
            if (oct_drop <= sales_drop[index]){
                count += 1;
            } 
        }
        var greater_than_percentage_drops = ((count/ sales_drop.length) * 100);

        
        var valueline = d3.line()
                          .x(function(d,i) { return x(d.date); })
                          .y(function(d,i) { return y(d.Total); });

        var valueline_hm = d3.line()
                          .x(function(d,i) { return x(d.date); })
                          .y(function(d,i) { return yy(d['HM-Total']); });

        var valueline_cf = d3.line()
                          .x(function(d,i) { return x(d.date); })
                          .y(function(d,i) { return yy(d['CF-Total']); });

        var valueline_ff = d3.line()
                          .x(function(d,i) { return x(d.date); })
                          .y(function(d,i) { return yy(d['FF-Total']); });








        svg.append("path")
            .data([before])
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", function(d,i){ return color(i); })
            .attr("data-legend",function(d) { return d.name})
            .attr("d", valueline);

        svg.append("path")
            .data([after])
            .attr("class", "line")
            .attr("fill", "none")
            .style("stroke", "red")
            .attr("data-legend",function(d) { return d.name})
            .attr("d", valueline);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        svg.append("g").call(d3.axisLeft(y));


        svg.append("text")
           .attr("x", (width / 2))             
           .attr("y", 0 - (margin.top / 2))
           .attr("text-anchor", "middle")  
           .style("font-size", "16px") 
           .style("text-decoration", "underline")  
           .text("Hit on sales from BK's Impossible Burger");

         svg.append("text")
           .attr("x", (width / 2))             
           .attr("y", 20 - (margin.top / 2))
           .attr("text-anchor", "middle")  
           .style("font-size", "12px") 
           .text("Total Revenue from all burgers by the month");

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 10 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Sales (USD Millions)");   


        svg.append("text").attr("x", 430).attr("y", 410).text("Year").style("font-size", "15px").attr("alignment-baseline","middle");

        svg.append("circle").attr("cx",600).attr("cy",30).attr("r", 6).style("fill", "red");
        svg.append("circle").attr("cx",600).attr("cy",60).attr("r", 6).style("fill", color(0));
        svg.append("text").attr("x", 620).attr("y", 30).text("Post Impossible Burger").style("font-size", "15px").attr("alignment-baseline","middle");
        svg.append("text").attr("x", 620).attr("y", 60).text("Pre Impossible Burger").style("font-size", "15px").attr("alignment-baseline","middle");
});