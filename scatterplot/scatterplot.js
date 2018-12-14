var width = 1200;
var height = 800;
var padding = 100;

var sc1Circle = []; 
var sc1Cross = [];
var sc2Circle = []; 
var sc2Cross = [];
var sc3Circle = []; 
var sc3Cross = [];

var yLabel = ["Wins+Nominations", "Budget", "IMDb Votes", "Wins+Nominations(sqrt scale)", "Wins+Nominations(log scale)"];

function makeChart(circleData, crossData, svgElement, sizeIt, yScaleType, chartNo){

    //x-axis scale
    var xScale = d3.scale.linear()
            .domain([0, Math.max(d3.max(circleData, function(d) { return d[0]; }), d3.max(crossData, function(d) { return d[0]; }))])
            .range([padding, width - padding * 2]);

    //y-axis scale
    var yScale;
    if(yScaleType == "log")
        yScale = d3.scale.log().clamp(true).domain([0.1, Math.max(d3.max(circleData, function(d) { return d[1]; }), d3.max(crossData, function(d) { return d[1]; }))+1])
        .range([height - padding, padding]).nice();
    else{
    if(yScaleType == "linear")
        yScale = d3.scale.linear();
    else
        yScale = d3.scale.sqrt();
    yScale.domain([0, Math.max(d3.max(circleData, function(d) { return d[1]; }), d3.max(crossData, function(d) { return d[1]; }))])
            .range([height - padding, padding]);
    }
    
    //Create points
    if(sizeIt){
        var sizeScale = d3.scale.linear()
                        .domain([0, Math.max(d3.max(circleData, function(d) { return d[2]; }), d3.max(crossData, function(d) { return d[2]; }))])
                        .range([3,10]);
        var arc  = d3.svg.symbol().type("cross").size(function(d){return 50*sizeScale(d[2]);});
        svgElement.selectAll(".circle")
        .data(circleData)
        .enter()
        .append("circle")
        .attr("cx", function(d){return xScale(d[0]);})
        .attr("cy", function(d){return yScale(d[1]);})
        .attr("r", function(d){return sizeScale(d[2]);})
        .attr("class", "rcircle");
    }
    else{
        var arc  = d3.svg.symbol().type("cross").size(50);
        svgElement.selectAll(".circle")
        .data(circleData)
        .enter()
        .append("circle")
        .attr("cx", function(d){return xScale(d[0]);})
        .attr("cy", function(d){return yScale(d[1]);})
        .attr("r", 5)
        .attr("class", "rcircle");

    }
    svgElement.selectAll(".cross")
        .data(crossData)
        .enter().append("path")
        .attr("d", arc)
        .attr("transform", function(d) { return "translate(" + xScale(d[0]) + "," + yScale(d[1]) + ")"; })
        .attr("class", "bcross");
    

    //Create x-axis
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(10);

    //Create y-axis
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .tickSize(10);

    //Attach x-axis
    svgElement.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (height - padding) + ")")
        .call(xAxis);

    //Attach y-axis
     svgElement.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis);

    // text label for the x axis
    svgElement.append("text")             
    .attr("transform",
            "translate(" + (width/2) + " ," + 
                        (height - padding +30) + ")")
    .style("text-anchor", "middle")
    .text("IMDb Rating");

    // text label for the y axis
    svgElement.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text(yLabel[chartNo]); 

    // Make legend
    var legend = svgElement.append('g') 
    legend.append("rect").attr("width",110).attr("height",40).attr("class", "leg").attr("x", width-200);
    legend.append("text").attr("x", width-140).attr("y", 15).style("text-anchor", "middle").text("Good Rating");
    legend.append("text").attr("x", width-140).attr("y", 35).style("text-anchor", "middle").text("Bad Rating");
    legend.append("circle")
    .attr("cx", width-190)
    .attr("cy", 30)
    .attr("r", 5)
    .attr("class", "rcircle");
    legend.append("path")
    .attr("d", d3.svg.symbol().type("cross").size(50))
    .attr("transform", "translate(" + (width-190) + "," + 10 + ")")
    .attr("class", "bcross");

}
d3.csv("movies.csv", function(data){
    for(var i = 0; i < data.length; i++){
        if(data[i].IsGoodRating == "1"){
            sc1Cross.push([Number(data[i].imdbRating), Number(data[i].WinsNoms)]);
            sc2Cross.push([Number(data[i].imdbRating), Number(data[i].Budget)]);
            sc3Cross.push([Number(data[i].imdbRating), Number(data[i].imdbVotes), Number(data[i].WinsNoms)]);
        }
        else{
            sc1Circle.push([Number(data[i].imdbRating), Number(data[i].WinsNoms)]);
            sc2Circle.push([Number(data[i].imdbRating), Number(data[i].Budget)]);
            sc3Circle.push([Number(data[i].imdbRating), Number(data[i].imdbVotes), Number(data[i].WinsNoms)]);
        }
    }

    var svg1 = d3.select("#chart1")
                .append("svg")
                .attr("width", width)
                .attr("height", height);

    var svg2 = d3.select("#chart2")
                .append("svg")
                .attr("width", width)
                .attr("height", height);

    var svg3 = d3.select("#chart3")
                .append("svg")
                .attr("width", width)
                .attr("height", height);

    var svg4 = d3.select("#chart4")
                .append("svg")
                .attr("width", width)
                .attr("height", height);

    var svg5 = d3.select("#chart5")
                .append("svg")
                .attr("width", width)
                .attr("height", height);

    makeChart(sc1Circle, sc1Cross, svg1, false, "linear", 0);
    makeChart(sc2Circle, sc2Cross, svg2, false, "linear", 1);
    makeChart(sc3Circle, sc3Cross, svg3, true, "linear", 2);
    makeChart(sc1Circle, sc1Cross, svg4, false, "sqrt", 3);
    makeChart(sc1Circle, sc1Cross, svg5, false, "log", 4);

});
