const width = 1000;
const height = 800;

let treeData = {
    value: 'Brazil',
    children: [
        {
            value: 'Rio de Janeiro',
            children: [
                { value: 'Rio de Janeiro City', children: [] },
                { value: 'Niterói', children: [] },
                { value: 'Nova Iguaçu', children: [] },
                {
                    value: 'Campos dos Goytacazes',
                    children: [
                        { value: 'Campos City', children: [] },
                        { value: 'São João da Barra', children: [] },
                        { value: 'Itaperuna', children: [] },
                    ],
                },
            ],
        },
        {
            value: 'São Paulo',
            children: [
                { value: 'São Paulo City', children: [] },
                { value: 'Campinas', children: [] },
                { value: 'Guarulhos', children: [] },
                {
                    value: 'Santos',
                    children: [
                        { value: 'Santos City', children: [] },
                        { value: 'São Vicente', children: [] },
                        { value: 'Praia Grande', children: [] },
                    ],
                },
            ],
        },
        {
            value: 'Minas Gerais',
            children: [
                { value: 'Belo Horizonte', children: [] },
                { value: 'Uberlândia', children: [] },
                { value: 'Contagem', children: [] },
                {
                    value: 'Juiz de Fora',
                    children: [
                        { value: 'Juiz de Fora City', children: [] },
                        { value: 'Muriaé', children: [] },
                        { value: 'Cataguases', children: [] },
                    ],
                },
            ],
        },
        {
            value: 'Bahia',
            children: [
                { value: 'Salvador', children: [] },
                { value: 'Feira de Santana', children: [] },
                { value: 'Vitória da Conquista', children: [] },
            ],
        },
        {
            value: 'Ceará',
            children: [
                { value: 'Fortaleza', children: [] },
                { value: 'Caucaia', children: [] },
                { value: 'Juazeiro do Norte', children: [] },
            ],
        },
    ]
};

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
});
