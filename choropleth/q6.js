var width = 1000;
var height = 600;
var pos = 275;
var svgElement = d3.select("body").append("svg").attr("width", width).attr("height", height).attr("class", "center");
var education = d3.map();
var county = d3.map();
var stats = d3.map();
var path = d3.geo.path();

d3.queue()
    .defer(d3.json, "us.json")
    .defer(d3.csv, "education.csv", function(d) {education.set(d.id, +d.percent_educated); county.set(d.id, d.name);})
    .defer(d3.csv, "education_details.csv", function(d){stats.set(d.id, [d.qualified_professionals, d.high_school, d.middle_school_or_lower]);})
    .await(done);

function done(error, us){
    var color = d3.scale.linear().domain([0,100]).range(["#ffeda0", "#f03b20"]);
    var tip = d3.tip().attr('class', 'd3-tip').offset([-10, 0]).html(function(d) {
        return county.get(d.id) + "<br>" + "Percentage Educated: " + education.get(d.id) + "%" + "<br>" + "Qualified Professionals: " + stats.get(d.id)[0] + "<br>" + "High School Graduates: " + stats.get(d.id)[1] + "<br>" + "Middle School or Lower Graduates: " + stats.get(d.id)[2];});
    svgElement.call(tip);
    svgElement.append("g")
        .attr("class", "county")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.counties).features)
        .enter().append("path")
        .attr("fill", function(d) { return color(d.percent_educated = education.get(d.id)); })
        .attr("d", path)
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    svgElement.append("path")
        .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
        .attr("class", "state")
        .attr("d", path);

    // Add a legend for the color values.
    var legend = svgElement.selectAll(".legend")
    .data(color.ticks(10).slice(1))
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(" + (pos + i*50) + "," + (2*pos+10) + ")"; });

    legend.append("rect")
    .attr("width", 50)
    .attr("height", 20)
    .style("fill", color);

    legend.append("text")
    .attr("x", 18)
    .attr("y", 30)
    .attr("dy", ".35em")
    .text(function(d){return d+"%";});
}
