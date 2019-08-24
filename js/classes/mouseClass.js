class mouse {
  constructor(camera, scene, objPlayer) {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.direction = new THREE.Vector3();
    this.pitchObject = new THREE.Object3D();
    this.pitchObject.add(camera);
    this.boxGeometry = new THREE.BoxGeometry(10, 10, 10);
    this.basicMaterial = new THREE.MeshBasicMaterial({color: 0x1111DD});
    this.cube = new THREE.Mesh(this.boxGeometry, this.basicMaterial);
    this.yawObject = new THREE.Object3D();
    this.yawObject.add(this.cube);
    this.yawObject.position.z = objPlayer.body.position.z;
    this.yawObject.position.x = objPlayer.body.position.x;
    this.yawObject.position.y = objPlayer.body.position.y + 8;
	  this.yawObject.add(this.pitchObject);
    scene.add(this.yawObject);
    this.box = new THREE.Box3().setFromObject(this.yawObject);
  }
  update(velocityX, velocityY, velocityZ) {
    this.yawObject.translateX(velocityX);
		this.yawObject.translateY(velocityY);
		this.yawObject.translateZ(velocityZ);
    this.box.setFromObject(this.yawObject);
  }
}
