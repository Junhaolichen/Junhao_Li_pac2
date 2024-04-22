document.addEventListener('DOMContentLoaded', function() {
    // Cargar los datos
    d3.json('path/to/your/data.json').then(function(data) {
        const width = 600, height = 600;

        // Configurar el layout de circle packing
        const pack = d3.pack()
            .size([width - 2, height - 2])
            .padding(3);

        // Seleccionar el elemento SVG o crear uno nuevo
        const svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("background", "#eee")
            .attr("font-size", "10px")
            .attr("font-family", "sans-serif")
            .attr("text-anchor", "middle");

        // Procesar los datos
        const root = d3.hierarchy({children: data})
            .sum(d => d.value); // Asegúrate de que los datos tienen un campo 'value'

        // Crear nodos
        const nodes = pack(root).descendants();

        const circle = svg.selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", d => d.r)
            .style("fill", d => d.children ? "#555" : "#999");

        // Añadir etiquetas
        const label = svg.selectAll("text")
            .data(nodes)
            .join("text")
            .attr("x", d => d.x)
            .attr("y", d => d.y)
            .text(d => d.data.name);
    });
});
