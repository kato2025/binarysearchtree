//Create Node class to store data and pointers to left and right child nodes
class Node {
  constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
  }
}
// Create BinarySearchTree class to store the root node
class BinarySearchTree {
  constructor() {
      this.root = null;
  }
  insert(value) {
      const newNode = new Node(value);
      if (this.root === null) {
          this.root = newNode;
      } else {
          this.insertNode(this.root, newNode);
      }
  }
  insertNode(node, newNode) {
      if (newNode.value < node.value) {
          if (node.left === null) {
              node.left = newNode;
          } else {
              this.insertNode(node.left, newNode);
          }
      } else {
          if (node.right === null) {
              node.right = newNode;
          } else {
              this.insertNode(node.right, newNode);
          }
      }
  }
// Create method to check if the tree is balanced
  isBalanced(node) {
      if (node === null) {
          return true;
      }
      let leftHeight = this.getHeight(node.left);
      let rightHeight = this.getHeight(node.right);
      if (Math.abs(leftHeight - rightHeight) <= 1 && this.isBalanced(node.left) && this.isBalanced(node.right)) {
          return true;
      }
      return false;
  }
// Create method to find the height of the tree
  getHeight(node) {
      if (node === null) {
          return 0;
      }
      let leftHeight = this.getHeight(node.left);
      let rightHeight = this.getHeight(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
  }
// Create method to traverse the tree in level order
  levelOrderTraversal() {
      let result = [];
      let queue = [];
      if (this.root != null) {
          queue.push(this.root);
          while (queue.length > 0) {
              let node = queue.shift();
              result.push(node.value);
              if (node.left != null) queue.push(node.left);
              if (node.right != null) queue.push(node.right);
          }
      }
      return result;
  }
// Create methods to traverse the tree in pre-order
  preOrderTraversal(node, result = []) {
      if (node != null) {
          result.push(node.value);
          this.preOrderTraversal(node.left, result);
          this.preOrderTraversal(node.right, result);
      }
      return result;
  }
// Create methods to traverse the tree in post-order
  postOrderTraversal(node, result = []) {
      if (node != null) {
          this.postOrderTraversal(node.left, result);
          this.postOrderTraversal(node.right, result);
          result.push(node.value);
      }
      return result;
  }
// Create methods to traverse the tree in in-order
  inOrderTraversal(node, result = []) {
      if (node != null) {
          this.inOrderTraversal(node.left, result);
          result.push(node.value);
          this.inOrderTraversal(node.right, result);
      }
      return result;
  }
// Create method to rebalance the tree
  rebalance() {
      let elements = this.inOrderTraversal(this.root);
      this.root = this.buildBalancedTree(elements, 0, elements.length - 1);
  }
// Create method to build a balanced tree
  buildBalancedTree(elements, start, end) {
      if (start > end) {
          return null;
      }
      let mid = Math.floor((start + end) / 2);
      let node = new Node(elements[mid]);
      node.left = this.buildBalancedTree(elements, start, mid - 1);
      node.right = this.buildBalancedTree(elements, mid + 1, end);
      return node;
  }
}
// Create a function to generate an array of random numbers less than 100
function generateRandomNumbers(length) {
  let randomNumbers = [];
  for (let i = 0; i < length; i++) {
      randomNumbers.push(Math.floor(Math.random() * 100));
  }
  return randomNumbers;
}
// Create driver script
let numbers = generateRandomNumbers(10);
let bst = new BinarySearchTree();
numbers.forEach(number => {
  bst.insert(number);
});
// Create a new tree and test the methods
console.log("Original Tree:");
console.log("Is Balanced:", bst.isBalanced(bst.root));
console.log("Level Order Traversal:", bst.levelOrderTraversal());
console.log("Pre-order Traversal:", bst.preOrderTraversal(bst.root));
console.log("Post-order Traversal:", bst.postOrderTraversal(bst.root));
console.log("In-order Traversal:", bst.inOrderTraversal(bst.root));
// Test Unbalance the tree by adding numbers > 100
bst.insert(110);
bst.insert(120);
bst.insert(130);
// Test the methods again
console.log("\nUnbalanced Tree:");
console.log("Is Balanced (Step 2):", bst.isBalanced(bst.root));
console.log("Level Order Traversal:", bst.levelOrderTraversal());
// Test rebalance
bst.rebalance();
// Test the methods again
console.log("\nBalanced Tree:");
console.log("Is Balanced (Step 7):", bst.isBalanced(bst.root));
console.log("Level Order Traversal:", bst.levelOrderTraversal());
console.log("Pre-order Traversal:", bst.preOrderTraversal(bst.root));
console.log("Post-order Traversal:", bst.postOrderTraversal(bst.root));
console.log("In-order Traversal:", bst.inOrderTraversal(bst.root));
// Unbalance the tree again by adding numbers > 100
bst.insert(140);
bst.insert(150);
// Test the methods again
console.log("\nUnbalanced Tree (Again):");
console.log("Is Balanced (Step 5):", bst.isBalanced(bst.root));
console.log("Level Order Traversal:", bst.levelOrderTraversal());