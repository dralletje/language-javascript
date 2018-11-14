const Parser = require('tree-sitter');
const JavaScript = require('tree-sitter-javascript');

const parser = new Parser();
parser.setLanguage(JavaScript);

const sourceCode = 'let x = "--\\n--";';
const tree = parser.parse(sourceCode);

console.log(`tree.rootNode.tree:`, tree.rootNode.tree)

let walk = (node) => {
  console.log(`node:`, node)
  for (let child of node.children) {
    walk(child);
  }
}

walk(tree.rootNode);
