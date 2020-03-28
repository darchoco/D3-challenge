// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};


var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;

var scatter = d3.select("#scatter")
.append("svg")
.attr("height", svgHeight)
.attr("width", svgWidth);

var chartGroup = scatter.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function(Data) {
    // var id = Data.map(data => data.id);
    // console.log("id", id);
    // var state = Data.map(data => data.state);
    // console.log("state", state);
     var abbr = Data.map(data => data.abbr);
    // console.log("abbr", abbr);
    // var age = Data.map(data => data.age);
    // console.log("age", age);
    // var obesity = Data.map(data => data.obesity);
    // console.log("obesity", obesity);
  
    console.log(Data);
    Data.forEach(function(data) {
        data.age = +data.age;
        data.obesity = +data.obesity;
        
      });

  // scales
var xScale = d3.scaleLinear()
.domain([28, d3.max(Data, d=>d.age)])
.range([28, width]);

var yScale = d3.scaleLinear()
.domain([20, d3.max(Data, d=>d.obesity)])
.range([height, 20]);

    // Step 3: Create axis functions
    // ==============================
var bottomAxis = d3.axisBottom(xScale);
var leftAxis = d3.axisLeft(yScale);

chartGroup.append("g")
.attr("transform", `translate(0, ${height})`)
.call(bottomAxis);

chartGroup.append("g")
.call(leftAxis);



var circlesGroup = chartGroup.selectAll("circle")
.data(Data)
.enter()
.append("circle")
.attr("cx", d => xScale(d.age))
.attr("cy", d => yScale(d.obesity))
.attr("r", "15")
.attr("fill", "blue")
.attr("opacity", ".5")

var labels = chartGroup.selectAll("labels")
.data(Data)
.enter()
.append("text")
.attr("x",d => xScale(d.age)-10)
.attr("y",d => yScale(d.obesity)+5)
.text(d=>d.abbr)



    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("average age");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("obesity %");



}).catch(function(error) {
    console.log(error);
  });