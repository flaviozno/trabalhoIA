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

const extractValues = (node, result) => {
    if (node.value) {
        result.push({ label: node.value, value: node.value });
    }

    if (node.children && node.children.length > 0) {
        node.children.forEach(child => extractValues(child, result));
    }
}

let selectOptions = [];

extractValues(treeData, selectOptions)

class Node {
    constructor(value) {
        this.value = value;
        this.children = [];
    }

    addChild(value) {
        const newNode = new Node(value);
        this.children.push(newNode);
        return newNode;
    }
}

class Tree {
    constructor(rootValue) {
        this.root = new Node(rootValue);
    }

    depthFirstSearch(startedNode, target) {
        const stack = startedNode ? [startedNode] : [this.root];
        console.log(stack)
        const visitedNodes = [];

        while (stack.length > 0) {
            const currentNode = stack.pop();
            visitedNodes.push(currentNode);

            if (currentNode.value === target) {
                return visitedNodes;
            }

            for (let i = currentNode.children.length - 1; i >= 0; i--) {
                stack.push(currentNode.children[i]);
            }
        }

        return visitedNodes;
    }
}

const buildTree = (node, data) => {
    if(data.children.length === 0) return

    for(let childData of data.children) {
        const childNode = node.addChild(childData.value);
        buildTree(childNode, childData);
    }
}

const removeUnvisitedNodes = (visitedNodes, treeData, startedNode) => {
    const visitedValues = visitedNodes.map(node => node.value);

    const removeUnvisited = (node) => {
        if (!visitedValues.includes(node.value)) {
            return null; 
        }
        node.children = node.children.map(child => removeUnvisited(child)).filter(child => child !== null);
        return node;
    };

    return removeUnvisited(treeData);
};