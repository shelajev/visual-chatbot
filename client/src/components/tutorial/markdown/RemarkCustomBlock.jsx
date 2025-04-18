import { visit } from "unist-util-visit";

/**
 * Plugin for remark that transforms code blocks with language 'copy' 
 * into custom nodes with copyText data attribute.
 * @returns {function} transformer
 */
export function remarkCustomBlock() {
  return function transformer(tree) {

    // Visit all code blocks in the tree
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang !== 'custom')
        return null;

      const metaData = node.meta?.split(" ") || [];
      if (metaData.length === 0)
        return null;

      const [nodeType, ...rest] = metaData;
      const properties = {};
      if (rest) {
        rest.forEach((item) => {
          const [key, value] = item.split("=");
          properties[key] = value;
        });
      }

      const customNode = {
        type: 'element',
        tagName: nodeType,
        data: {
          hName: nodeType,
          hProperties: properties,
        },
        children: [
          {
            type: 'text',
            value: node.value
          }
        ]
      };
      
      // Replace the original code node with our custom copy node
      parent.children[index] = customNode;
    });
  };
}
