// Define SVG area dimensions
var svgWidth = 900;
var svgHeight = 465;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Select html id where graphic will appear, append SVG area to it, and set the dimensions
var svg = d3
  .select("#dollar")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append group to SVG area and shift "translate" it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Create a function to parse date and time
  var parseTime = d3.timeParse("%m/%d/%y");

// Load data from data.csv
d3.csv("data/data.csv").then(function(financeData) {
   console.log(financeData);


   // Format the data
   financeData.forEach(function(data) {
     console.log(data.Date);     
     data.Date = parseTime(data.Date);
     data.DOLLAR_INDEX = +data.DOLLAR_INDEX;
     console.log(data.Date);
   });

   // Create scaling functions
   var xTimeScale = d3.scaleTime()
     .domain(d3.extent(financeData, d => d.Date))
     .range([0, width]);

   var yLinearScale = d3.scaleLinear()
     .domain([0, d3.max(financeData, d => d.DOLLAR_INDEX)])
     .range([height, 0]);

   // Create axis functions
   var bottomAxis = d3.axisBottom(xTimeScale)
     .tickFormat(d3.timeFormat("%m/%y"));
   var leftAxis = d3.axisLeft(yLinearScale);

   // Line generators for each line
   var line1 = d3.line()
     .x(d => xTimeScale(d.Date))
     .y(d => yLinearScale(d.DOLLAR_INDEX));

   // Append a path for line1
   chartGroup.append("path")
     .attr("d", line1(financeData))
     .classed("line", true)
     .attr("fill", "lightblue");

   chartGroup.append("g")
     .classed("axis", true)
     .call(leftAxis);

   chartGroup.append("g")
     .classed("axis", true)
     .attr("transform", `translate(0, ${height})`)
     .call(bottomAxis);

}).catch(function(error) {
  console.log(error);

});
