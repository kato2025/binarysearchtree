//Create Node class to store data and pointers to left and right child nodes
class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
// Create Tree class to store the root node and methods to build, insert, delete, find, and traverse the tree
  class Tree {
    constructor(dataArray) {
      const sortedArray = Array.from(new Set(dataArray)).sort((a, b) => a - b);
      this.root = this.buildTree(sortedArray);
    }
  // Create a method to build the binary tree
    buildTree(dataArray) {
      if (dataArray.length === 0) {
        return null;
      }
      const mid = Math.floor(dataArray.length / 2);
      const root = new Node(dataArray[mid]);
      root.left = this.buildTree(dataArray.slice(0, mid));
      root.right = this.buildTree(dataArray.slice(mid + 1));
      return root;
    }
  // Create a method to print the tree
    prettyPrint(node = this.root, prefix = "", isLeft = true) {
      if (node !== null) {
        console.log(prefix + (isLeft ? "├── " : "└── ") + node.data);
        this.prettyPrint(node.left, prefix + (isLeft ? "│   " : "    "), true);
        this.prettyPrint(node.right, prefix + (isLeft ? "│   " : "    "), false);
      }
    }
  // Create a method to insert a node
    insert(value) {
      this.root = this._insertRec(this.root, value);
    }
    _insertRec(node, value) {
      if (node === null) {
        return new Node(value);
      }
      if (value < node.data) {
        node.left = this._insertRec(node.left, value);
      } else if (value > node.data) {
        node.right = this._insertRec(node.right, value);
      }
      return node;
    }
  // Create a method to delete a node
    delete(value) {
      this.root = this._deleteRec(this.root, value);
    }
    _deleteRec(node, value) {
      if (node === null) {
        return node;
      }
      if (value < node.data) {
        node.left = this._deleteRec(node.left, value);
      } else if (value > node.data) {
        node.right = this._deleteRec(node.right, value);
      } else {
        if (node.left === null) {
          return node.right;
        } else if (node.right === null) {
          return node.left;
        }
        node.data = this._minValue(node.right);
        node.right = this._deleteRec(node.right, node.data);
      }
      return node;
    }
// Create a method to find the minimum value
    _minValue(node) {
      let minValue = node.data;
      while (node.left !== null) {
        minValue = node.left.data;
        node = node.left;
      }
      return minValue;
    }
  // Create a method to find a node
    find(value) {
      return this._findRec(this.root, value);
    }
    _findRec(node, value) {
      if (node === null || node.data === value) {
        return node;
      }
      if (value < node.data) {
        return this._findRec(node.left, value);
      }
      return this._findRec(node.right, value);
    }
  // Create methods to traverse the tree
    levelOrder(callback = null) {
      const result = [];
      const queue = [];
      if (this.root !== null) {
        queue.push(this.root);
        while (queue.length > 0) {
          const node = queue.shift();
          result.push(node.data);
          if (node.left !== null) {
            queue.push(node.left);
          }
          if (node.right !== null) {
            queue.push(node.right);
          }
          if (callback !== null) {
            callback(node);
          }
        }
      }
      return result;
    }
    inorder(callback = null) {
      const result = [];
      this._inorderRec(this.root, result, callback);
      return result;
    }
    _inorderRec(node, result, callback) {
      if (node !== null) {
        this._inorderRec(node.left, result, callback);
        result.push(node.data);
        if (callback !== null) {
          callback(node);
        }
        this._inorderRec(node.right, result, callback);
      }
    }
// Create methods to traverse the tree in preorder
    preorder(callback = null) {
      const result = [];
      this._preorderRec(this.root, result, callback);
      return result;
    }
    _preorderRec(node, result, callback) {
      if (node !== null) {
        result.push(node.data);
        if (callback !== null) {
          callback(node);
        }
        this._preorderRec(node.left, result, callback);
        this._preorderRec(node.right, result, callback);
      }
    }
// Create methods to traverse the tree in postorder
    postorder(callback = null) {
      const result = [];
      this._postorderRec(this.root, result, callback);
      return result;
    }
    _postorderRec(node, result, callback) {
      if (node !== null) {
        this._postorderRec(node.left, result, callback);
        this._postorderRec(node.right, result, callback);
        result.push(node.data);
        if (callback !== null) {
          callback(node);
        }
      }
    }
// Create methods to find the height and depth of the tree
    height(node) {
      if (node === null) {
        return -1;
      }
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
    }
// Create a method to find the depth of a node
    depth(node, currentDepth = 0) {
        if (node === null) {
          return currentDepth;
        }
        const leftDepth = this.depth(node.left, currentDepth + 1);
        const rightDepth = this.depth(node.right, currentDepth + 1);
        return Math.max(leftDepth, rightDepth);
      }
// Create a method to check if the tree is balanced
    isBalanced(node = this.root) {
      if (node === null) {
        return true;
      }
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
      if (Math.abs(leftHeight - rightHeight) <= 1 &&
          this.isBalanced(node.left) &&
          this.isBalanced(node.right)) {
        return true;
      }
      return false;
    }
// Create a method to rebalance the tree
    rebalance() {
      const nodes = this.inorder();
      this.root = this.buildTree(nodes);
    }
  }
// Create a new tree and test the methods
  const dataArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
  const tree = new Tree(dataArray);
  tree.prettyPrint();
  // Test insert
  tree.insert(6);
  console.log("Tree after inserting 6:");
  tree.prettyPrint();
  // Test delete
  tree.delete(7);
  console.log("Tree after deleting 7:");
  tree.prettyPrint();
  // Test find
  const foundNode = tree.find(23);
  console.log("Found node with value 23:", foundNode);
  // Test traversals
  console.log("Level order traversal:", tree.levelOrder());
  console.log("Inorder traversal:", tree.inorder());
  console.log("Preorder traversal:", tree.preorder());
  console.log("Postorder traversal:", tree.postorder());
  // Test height and depth
  console.log("Height of the tree:", tree.height(tree.root));
  console.log("Depth of the node with value 67:", tree.depth(foundNode));
  // Test if the tree is balanced
  console.log("Is the tree balanced?", tree.isBalanced());
  // Test rebalancing
  tree.rebalance();
  console.log("Tree after rebalancing:");
  tree.prettyPrint();
  