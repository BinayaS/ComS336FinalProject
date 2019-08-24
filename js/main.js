//-- Global Vars --
{
  var WIDTH;
  var HEIGHT;
  var renderer;
  var scene;
  var objCamera;
  var objectTree = new tree();
  var objectList = [];
  var prevTime = performance.now();
  var timer = 0;
  var points = 0;
}

//-- Init the ThreeJs Scene --
{
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setClearColor(0x000000, 1);
  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();

}

//-- Temp. Objects --
{
  var plane = new solid(200, 1, 200, 0, -10, -80, -1, 0xD9C323, scene)
  objectList.push(plane);

  // var light = new THREE.PointLight( 0x111111, 10, 1000 );
  // light.position.set( -40, 10, 0 );
  // light.castShadow = true;
  // scene.add( light );
  //
  // var light2 = new THREE.PointLight( 0x111111, 10, 1000 );
  // light2.position.set( 40, 10, 0 );
  // light2.castShadow = true;
  // scene.add( light2 );

  var cubeMaterials = [
      // back side
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('images/bkg/red/bkg1_back6.png'),
        side: THREE.DoubleSide
      }),
      // front side
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('images/bkg/red/bkg1_front5.png'),
        side: THREE.DoubleSide
      }),
      // Top side
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('images/bkg/red/bkg1_top3.png'),
        side: THREE.DoubleSide
      }),
      // Bottom side
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('images/bkg/red/bkg1_bottom4.png'),
        side: THREE.DoubleSide
      }),
      // right side
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('images/bkg/red/bkg1_right1.png'),
        side: THREE.DoubleSide
      }),
      // left side
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('images/bkg/red/bkg1_left2.png'),
        side: THREE.DoubleSide
      })
    ];

    var newGeometry = new THREE.BoxGeometry(10000, 10000, 10000);
    var mesh = new THREE.Mesh(newGeometry, cubeMaterials);
    scene.add(mesh);
}

//-- Vars --
{
  var objPlayer = new player(scene);
  objCamera = new camera(scene, objPlayer);
  objPlayer.addMouse(objCamera.camera, scene)
  var objBlockGeneration = new blockGeneration(scene, objPlayer, objectList);
  objPlayer.addBlockGeneration(objBlockGeneration);
  //var objMouse = new mouse(objCamera.camera, scene, objPlayer);

}

//-- Call Functions
{
  function render() {
  	requestAnimationFrame(render);

    var time = performance.now();
		var delta = ( time - prevTime ) / 1000;

    //-- Call updates --
    {
      // console.log(isCollision(objectTree,objPlayer));
      objBlockGeneration.update(objPlayer);
      objPlayer.update(objectList, delta);
      // light.position.set(objPlayer.body.position.x + 40, objPlayer.body.position.y + 20, objPlayer.body.position.z);
      // light2.position.set(objPlayer.body.position.x - 40, objPlayer.body.position.y + 20, objPlayer.body.position.z);
      if(objPlayer.running) {
        points += 1;
      }
      document.getElementById("Points").innerHTML = "Points: " + points;
      mesh.rotateX(0.02*Math.PI/180);
      mesh.rotateY(0.04*Math.PI/180);
      mesh.rotateZ(0.06*Math.PI/180);
      mesh.position.x = objPlayer.body.position.x;
      //mesh.position.y = objPlayer.body.position.y;
      mesh.position.z = objPlayer.body.position.z;

      //objMouse.update(objPlayer.hspdX, objPlayer.vspd, objPlayer.hspdZ, delta);
      //console.log(objMouse.yawObject.rotation.y * 180/Math.PI);


    }
    prevTime = time;
  	renderer.render(scene, objCamera.camera);
  }

  render(objPlayer);
}
