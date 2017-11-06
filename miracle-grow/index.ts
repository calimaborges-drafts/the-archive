export const searchTree = (
  nodesArray: [any],
  id: any,
  key = "id",
  parentKey = "parent"
) =>
  nodesArray.reduce(function treeReducer(result, node) {
    if (node[key] === id) return node;
    else if (!node.children || node.children.length === 0) return result;
    else return node.children.reduce(treeReducer, result);
  }, null);

export const miracleGrow = (
  nodesArray: [any],
  key = "id",
  parentKey = "parent",
  parentId: any = null
): [any] =>
  nodesArray.reduce(
    (tree, node) =>
      node[parentKey] === parentId
        ? [
            ...tree,
            {
              ...node,
              children: miracleGrow(nodesArray, key, parentKey, node[key])
            }
          ]
        : tree,
    []
  );
