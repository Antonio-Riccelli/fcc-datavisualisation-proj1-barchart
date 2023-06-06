const dataUrl = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
const margin = {
    top: 30,
    right: 30,
    bottom: 70,
    left: 60
}
const svgW = 1000 - margin.left - margin.right;
const svgH = 800 - margin.top - margin.bottom;
const chartHeight = svgH - margin.top - margin.bottom;

const svg = d3.select("#chartContainer").append("svg")
.style("width", svgW + margin.left + margin.right)
.style("height", svgH + margin.top + margin.bottom)
.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);
console.log(svg);

const appendData = (d) => {

    console.log("Downloaded data: ", d);
    
    // X scale and Axes
    const Xscale = d3.scaleBand().domain(d.map(e => e[0].substr(0, 4))).range([0, svgW]).round(true)
    const xAxis = d3.axisBottom(Xscale);

    console.log("Created X axis...")

    // Y scale and Axes
    const Yscale = d3.scaleLinear()
    .domain([0, d3.max(d, d => d[1])])
    .range([svgH, 0]).nice();
    const yAxis = d3.axisLeft(Yscale);

    console.log("Created Y axis...")

    // Append X axis
    svg.append("g")
    .attr("transform", `translate(0, ${svgH})`)
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end")

    // Append Y axis
    svg.append("g")
    .call(yAxis);

    console.log("Appended X and Y axis...")



    svg.selectAll("rect")
    .data(d)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d, i) => i * 20)
    .attr("y", d => svgH - d[1])
    .attr("width", Xscale.bandwidth())
    .attr("height", (d, i) => Yscale(d[1]) - d[1])
    .style("padding", 0.5)
    .append("title")
    .style("stroke", "black")
    .text(d => {
        console.log("Returning text...")
        return `Date: ${d[0]}\nTotal: $${d[1]}`})
}

d3.json(dataUrl)
.then(response => {
    console.log("Downloading data...")
    console.log("response", response);
    return response.data;
})
.then(d => {
    console.log("Appending d data...")
    appendData(d);
})

