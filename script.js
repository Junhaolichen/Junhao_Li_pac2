document.addEventListener('DOMContentLoaded', function() {
    const width = 600;
    const height = 600;
    const data = {
        name: "root",
        children: [
            { name: "child1", value: 100 },
            { name: "child2", value: 50, children: [
                { name: "grandchild1", value: 30 },
                { name: "grandchild2", value: 20 }
            ]},
            { name: "child3", value: 75 }
        ]
    };

    const svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("font", "10px sans-serif")
        .attr("text-anchor", "middle");

    const root = d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value);

    const pack = d3.pack()
        .size([width, height])
        .padding(3);

    const nodes = pack(root).descendants();

    const circle = svg.selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", d => d.r)
        .style("fill", d => d.children ? "#555" : "#999");

    const label = svg.selectAll("text")
        .data(nodes)
        .join("text")
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .text(d => d.data.name);
});