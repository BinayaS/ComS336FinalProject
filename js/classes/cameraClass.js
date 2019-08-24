class camera {
  constructor(scene, object) {
    //-- Init camera --
    {
      this.camera = new THREE.PerspectiveCamera(70, WIDTH/HEIGHT, 1, 10000);
      //this.camera.rotation.y =  180 * Math.PI / 180;
      //this.camera.rotation.x = 20 * Math.PI / 180;
      scene.add(this.camera);
    }

    //-- Init Vars --
    {
      this.object = object;
    }

  }
  update(scene) {

  }

  cameraFollow() {
    //-- Follow the object's positions --
    {
      //this.camera.position.z = this.object.body.position.z;
      //this.camera.position.x = this.object.body.position.x;
      //this.camera.position.y = this.object.body.position.y;
    }
  }
}
