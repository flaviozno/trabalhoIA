const width = 1000;
const height = 800;

const renderTree = () => {
    const svg = d3.select('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(50,50)');

    const treeLayout = d3.tree().size([height, width - 200]);

    const root = d3.hierarchy(treeData);

    root.each(node => {
        node.data.visited = false;
    });

    const treeNodes = treeLayout(root);

    svg.selectAll('.link')
        .data(treeNodes.links())
        .enter().append('path')
        .attr('class', 'link')
        .attr('d', d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x))
        .style('stroke', d => d.source.data.visited ? '#ccc' : 'forestgreen' )

    const node = svg.selectAll('.node')
        .data(treeNodes.descendants())
        .enter().append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.y},${d.x})`);

    node.append('circle')
        .attr('r', 4.5);

    node.append('text')
        .attr('dy', '.31em')
        .attr('x', d => d.children ? -13 : 13)
        .style('text-anchor', d => d.children ? 'end' : 'start')
        .text(d => d.data.value);
}

document.addEventListener('DOMContentLoaded', () => {
    renderTree()
    
    const selectElement = document.getElementById('citySelect');
    const selectElementRoot = document.getElementById('citySelectRoot');

    selectOptions.forEach(city => {
        const option = document.createElement('option');
        option.textContent = city.label;
        option.value = city.value;
        option.classList.add('bg-white', 'hover:bg-gray-100');
        selectElement.appendChild(option);
        
        const option2 = document.createElement('option');
        option2.textContent = city.label;
        option2.value = city.value;
        option2.classList.add('bg-white', 'hover:bg-gray-100');
        selectElementRoot.appendChild(option2);
    });
});
