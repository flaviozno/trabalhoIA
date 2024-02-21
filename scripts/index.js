const findSolution = (rootCity, city) => {
    if(city){
        const tree = new Tree(treeData.value);
        buildTree(tree.root, treeData)
        if(rootCity === treeData.value){
            visitedNodes = tree.depthFirstSearch('',city);
            visitedNodes.forEach(element => {
                console.log(element.value)
            });
            removeUnvisitedNodes(visitedNodes, treeData, '');
            d3.select('svg').selectAll("*").remove();
            renderTree()
        }else{
            visitedNodes = tree.depthFirstSearch(treeData.children[1],city);
            visitedNodes.forEach(element => {
                console.log(element.value)
            });
            removeUnvisitedNodes(visitedNodes, treeData, treeData.children[1]);
            d3.select('svg').selectAll("*").remove();
            renderTree()
        }
    }
}