// @TODO: YOUR CODE HERE!

//declare the svg width
var svgWidth = 960;
var svgHeight = 500;

//declare margins to be adjusted
var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

//set actual height and width using declared above
var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;

//selecting the location for the graph, applying the attributes
var scatter = d3.select("#scatter")
.append("svg")
.attr("height", svgHeight)
.attr("width", svgWidth);

//transforming the declared graph to match with margins created
var chartGroup = scatter.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);


//calling csv data to pull
d3.csv("assets/data/data.csv").then(function(Data) {

//converting needed data into numbers versus strings  
    console.log(Data);
    Data.forEach(function(data) {
        data.age = +data.age;
        data.obesity = +data.obesity;
        
      });

  // setting scales, adjusted for actual values
var xScale = d3.scaleLinear()
.domain([28, d3.max(Data, d=>d.age)])
.range([28, width]);

var yScale = d3.scaleLinear()
.domain([20, d3.max(Data, d=>d.obesity)])
.range([height, 20]);

//create axis function to starting appending using scales
var bottomAxis = d3.axisBottom(xScale);
var leftAxis = d3.axisLeft(yScale);

//transforming with axis
chartGroup.append("g")
.attr("transform", `translate(0, ${height})`)
.call(bottomAxis);
//transforming with axis
chartGroup.append("g")
.call(leftAxis);




//set text labels first to be able to click on circles
//use xScale and Yscale to graph appropriately on svg
var labels = chartGroup.selectAll("labels")
.data(Data)
.enter()
.append("text")
.attr("x",d => xScale(d.age)-10)
.attr("y",d => yScale(d.obesity)+5)
.text(d=>d.abbr)

//apply the data, age on x, obesity on y
//opacity set to allow for text labels to be seen
var circlesGroup = chartGroup.selectAll("circle")
.data(Data)
.enter()
.append("circle")
.attr("cx", d => xScale(d.age))
.attr("cy", d => yScale(d.obesity))
.attr("r", "15")
.attr("fill", "blue")
.attr("opacity", ".5")

//set up tooltip to allow for circles to be clicked on and show exact data
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>average age: ${d.age}<br>obesity %: ${d.obesity}`);
      });

//create toolTip in chart
    chartGroup.call(toolTip);

//create listener to call on function to pull data
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

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


//in case of error
}).catch(function(error) {
    console.log(error);
  });