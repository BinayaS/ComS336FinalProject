class solid {
  constructor(width, height, depth, x, y, z, material, _color, scene) {
    this.geometry = new THREE.BoxGeometry(width, height, depth);

    if(material == -1) {
      this.material = new THREE.MeshBasicMaterial({ color:_color });
    } else {
      //TODO
    }

    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.body = new THREE.Object3D();
    this.body.add(this.cube);
    this.body.position.setX(x);
    this.body.position.setY(y);
    this.body.position.setZ(z);
    this.box = new THREE.Box3().setFromObject(this.body);

    if(scene != null) {
      scene.add(this.body);
    }
  }
  update() {
    this.box.setFromObject(this.body);
  }
}
