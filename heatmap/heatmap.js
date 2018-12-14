d3.csv("heatmap.csv", function(data){
  var houses = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];
  var dropdown = d3.select("body").append('select').attr('class','center').on('change',onchange)
  var options = dropdown.selectAll('option').data(houses).enter().append('option').text(function (d) { return d; });     
  var books = ["Sorcerer's Stone", "Chamber of Secrets", "Prisoner of Azkaban", "Goblet of Fire", "Order of the Phoenix", "Half Blood Prince", "Deathly Hallows"];
  var width = 1000;
  var height = 1000;
  var padding = 300;
  var svgElement = d3.select("body").append("svg").attr("width", width).attr("height", height).attr("class", "center");
  var gBuckets= [], sBuckets =[], hBuckets=[], rBuckets=[];
  var itemSize = 50;

  function bucketize(data,b){
    for(var i= 0;i<7;i++){
      var elem = {};
      elem["SpellType"] = data["SpellType"];
      elem["Book"] = books[i];
      elem["Count"] = data[books[i]];
      b.push(elem);
    }
  }

  function makeChart(bucket){
    var x_elements = d3.set(bucket.map(function( item ) { return item.SpellType; } )).values();
    var xScale = d3.scale.ordinal()
        .domain(x_elements)
        .rangeBands([0, x_elements.length * itemSize]);
    var yScale = d3.scale.ordinal()
        .domain(books)
        .rangeBands([0, books.length * itemSize]);
    var colorScale = d3.scale.linear()
        .domain([d3.min(bucket, function(d) { return parseInt(d.Count,10); }), d3.max(bucket, function(d) { return parseInt(d.Count,10); })])
        .range(["#ffeda0", "#f03b20"]);

    svgElement.selectAll('rect')
        .data(bucket)
        .enter().append('g').append('rect')
        .attr('class', 'cell')
        .attr('width', 50)
        .attr('height', 50)
        .attr('y', function(d) { return yScale(d.Book)+padding/2; })
        .attr('x', function(d) { return xScale(d.SpellType)+padding; })
        .attr('rx', 5)
        .attr('ry', 5)
        .attr('fill', function(d) {return colorScale(d.Count); })
        .attr("stroke", "alicewhite")
        .attr("stroke-width", 5);

    // Add an x-axis with label.
  svgElement.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate("+ (padding-10)+"," + (padding+240) + ")")
    .call(d3.svg.axis().scale(xScale).orient("bottom"))
    .selectAll('text')
    .attr("transform", "rotate(-90)");

    // text label for the x axis
  svgElement.append("text")             
    .attr("transform", "translate(" + (padding+450) + " ," + (padding +200) + ")")
    .attr("class", "label")
    .attr("text-anchor", "end")
    .attr("dx", ".71em")
    .text("Spell type");

  // Add a y-axis with label.
  svgElement.append("g")
    .attr("class", "y axis")
    .call(d3.svg.axis().scale(yScale).orient("left"))
    .attr("transform", "translate(" + padding + ","+padding/2+")")
    .append("text")
    .attr("class", "label")
    .attr("y", -10)
    .attr("dy", ".71em")
    .attr("text-anchor", "end")
    .text("Book");

  // Add a legend for the color values.
  var legend = svgElement.selectAll(".legend")
    .data(colorScale.ticks(10).slice(1))
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(" + (padding + i*50) + "," + (2*padding+10) + ")"; });

  legend.append("rect")
    .attr("width", 50)
    .attr("height", 50)
    .style("fill", colorScale);

  legend.append("text")
    .attr("x", 26)
    .attr("y", 10)
    .attr("dy", ".35em")
    .text(String);

  svgElement.append("text")
    .attr("class", "label")
    .attr("x", padding + 150)
    .attr("y", padding+300)
    .attr("dy", ".35em")
    .text("No of spells");
  }
  for(var i = 0;i<data.length; i++){
    if(data[i]["House"] == "Gryffindor"){
      bucketize(data[i], gBuckets)
    }
    else if(data[i]["House"] == "Ravenclaw"){
      bucketize(data[i], rBuckets)
    }
    else if(data[i]["House"] == "Slytherin"){
      bucketize(data[i], sBuckets)
    }
    else if(data[i]["House"] == "Hufflepuff"){
      bucketize(data[i], hBuckets)
    }
  }
  makeChart(gBuckets);
  function onchange() {
    if(d3.select('select').property('value')== "Gryffindor"){
      svgElement.selectAll("*").remove();
      makeChart(gBuckets);
    }
    else if(d3.select('select').property('value')== "Slytherin"){
      svgElement.selectAll("*").remove();
      makeChart(sBuckets);
    }
    else if(d3.select('select').property('value')== "Hufflepuff"){
      svgElement.selectAll("*").remove();
      makeChart(hBuckets);
    }
    else if(d3.select('select').property('value')== "Ravenclaw"){
      svgElement.selectAll("*").remove();
      makeChart(rBuckets);
    }
  };


});