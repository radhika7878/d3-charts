var data = 
[{city: 'San Antonio', population_2012: 1383505, growth: {year_2013:25405, year_2014:26644 , year_2015:28593 , year_2016:23591 , year_2017:24208}},
{city: 'New York', population_2012: 8383504, growth: {year_2013:75138 , year_2014:62493 , year_2015:61324 , year_2016:32967 , year_2017:7272}},
{city: 'Chicago', population_2012: 2717989, growth: {year_2013:6493 , year_2014:2051 , year_2015:-1379 , year_2016:-4879 , year_2017:-3825}},
{city: 'Los Angeles', population_2012: 3859267, growth:{year_2013:32516 , year_2014:30885 , year_2015:30791 , year_2016:27657 , year_2017:18643}},
{city: 'Phoenix', population_2012: 1495880, growth: {year_2013:25302 , year_2014:26547 , year_2015:27310 , year_2016:27003 , year_2017:24036}}];

var barData = [], growthData = {};
for(var i = 0;i<data.length;i++){
    var totalPop = data[i].population_2012 + data[i].growth.year_2013 + data[i].growth.year_2014 +data[i].growth.year_2015 +data[i].growth.year_2016 +data[i].growth.year_2017;
    barData[i] = {"name" : data[i].city, "value": totalPop};
    var pop = data[i].population_2012;
    var thirteen = {"year" : "2013", "pct" : data[i].growth.year_2013/pop * 100};
    pop = pop+data[i].growth.year_2013;
    var fourteen = {"year": "2014", "pct": data[i].growth.year_2014/pop * 100};
    pop = pop+data[i].growth.year_2014
    var fifteen = {"year": "2015", "pct": data[i].growth.year_2015/pop * 100};
    pop = pop+data[i].growth.year_2015
    var sixteen = {"year": "2016", "pct": data[i].growth.year_2016/pop * 100};
    pop = pop+data[i].growth.year_2016
    var seventeen = {"year": "2017", "pct": data[i].growth.year_2017/pop * 100};
    growthData[data[i].city] = [thirteen, fourteen, fifteen, sixteen, seventeen];
}
barData = barData.sort(function (a, b) {
    return d3.ascending(a.value, b.value);
});

var margin = {
    top: 15,
    right: 25,
    bottom: 15,
    left: 80
};

var marginLine = {
    top: 20, right: 20, bottom: 30, left: 50
}

var width = 700 - margin.left - margin.right,
    height = 430 - margin.top - margin.bottom;

var widthLine = 300 - marginLine.left - marginLine.right,
    heightLine = 400 - marginLine.top - marginLine.bottom;

var svgElement = d3.select("#barchart").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var lineSvg = d3.select("#linechart").append("svg").attr("width", widthLine+marginLine.left+marginLine.right).attr("height", heightLine + marginLine.top + marginLine.bottom).append("g").attr("transform", "translate(" + marginLine.left + "," + marginLine.top + ")");

var x = d3.scale.linear()
.range([0, width])
.domain([0, d3.max(barData, function (d) {
    return d.value;
})]);

var y = d3.scale.ordinal()
.rangeRoundBands([height, 0], .1)
.domain(barData.map(function (d) {
    return d.name;
}));

var yAxis = d3.svg.axis()
.scale(y)
.tickSize(0)
.orient("left");

var gy = svgElement.append("g")
.attr("class", "y axis")
.call(yAxis)

var bars = svgElement.selectAll(".bar")
.data(barData)
.enter()
.append("g")

bars.append("rect")
.attr("class", "bar")
.attr("y", function (d) {
    return y(d.name);
})
.attr("height", 50)
.attr("x", 0)
.attr("width", function (d) {
    return x(d.value);
})
.attr('fill', 'lightgray')
.on("mouseover", showlinechart)
.on("mouseout", removelinechart);

bars.append("text")
.attr("class", "num")
.attr("y", function (d) {
    return y(d.name) + 50 / 2 + 4;
})
.attr("x", 10)
.text(function (d) {
    return d.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
});

function showlinechart(d){
    d3.select(this).attr({
        fill: "dodgerblue"
    });
    makeLineChart(growthData[d.name]);
    document.getElementById("linechart").style.visibility = "visible";
}

function removelinechart(){
    d3.select(this).attr({
        fill: "lightgray"
    });
    document.getElementById("linechart").style.visibility = "hidden";
}

function makeLineChart(data){
    lineSvg.selectAll("*").remove();
    var x = d3.scale.linear().rangeRound([0, 300]);

    var y = d3.scale.linear().rangeRound([heightLine, 0]);
    var line = d3.svg.line().x(function(d) { return x(d.year); }).y(function(d) { return y(d.pct); });

    x.domain([2013, 2017]);
    y.domain(d3.extent(data, function(d) { return d.pct; }));

    var yAxis = d3.svg.axis()
    .scale(y)
    .tickSize(5)
    .orient("left");

    lineSvg.append("g")
    .attr("class", "yaxis")
    .call(yAxis);

    lineSvg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -50)
    .attr("x",0 - (heightLine / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Pct Increase")
    .attr("class", "label"); 

    var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(5)
    .orient("bottom");

    lineSvg.append("g")
    .attr("class", "yaxis")
    .attr("transform","translate(" + (0) + " ," + (heightLine) + ")")
    .call(xAxis)
    .selectAll('text')
    .text(function (d) {
        return d.toString();
    });;

    lineSvg.append("text")             
    .attr("transform","translate(" + (widthLine/2) + " ," + (heightLine +30) + ")")
    .style("text-anchor", "middle")
    .text("Year")
    .attr("class", "label"); ;


    lineSvg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "dodgerblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);


}


