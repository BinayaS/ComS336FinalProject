class node {
  constructor(name, data) {
    this.name = name;
    this.data = data;
    this.box3 = new THREE.Box3().setFromObject(this.data);
    this.parent = null;
    this.childL = null;
    this.childR = null;
  }
  setChildL(node) {
    this.childL = node;
    node.parent = this;
  }
  setChildR(node) {
    this.childR = node;
    node.parent = this;
  }
}

class tree {
  constructor() {
    this.root = null;
  }
  setRoot(node) {
    this.root = node;
    node.parent = this;
  }
}

class octree {
  constructor(name) {
    this.name = name;
    this.childTrees = [8];
    this.nodes = [];
  }
}
