const svgW = 500;
const svgH = 500;

const svg = d3.select("#chartContainer").append("svg")
.style("width", svgW)
.style("height", svgH)
.style("background-color", "lightpink")

console.log(svg);

const appendData = (d) => {
    console.log("d", d)
    d3.select("svg").selectAll("rect")
    .data(d)
    .enter()
    .append("rect")
    .attr("fill", "navy")
    .attr("class", "bar")
    .attr("height", d => d[1])
    .attr("width", 10)
    .attr("x", (d, i) => i * 12)
    .attr("y", d => svgH - d[1])
    .append("title")
    .text(d => {
        return `Date: ${d[0]}\nTotal: $${d[1]}`})
}

d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
.then(response => {
    return response.data;
})
.then(d => {
    appendData(d);
})


// d3.select("body").selectAll("div")
//   .data(dataset)
//   .enter()
//   .append("div")
//   .attr("class", "bar")
//   // Add your code below this line
//   .style("height", d => d)