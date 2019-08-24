document.onclick = function() {
  document.documentElement.requestPointerLock();
}

document.addEventListener('keydown', function(event) {
  //-- Player Input --
  {
    if(event.keyCode == 65) {
        //alert('a was pressed');
        objPlayer.moveLeft = true;
    }
    if(event.keyCode == 68) {
        //alert('d was pressed');
        objPlayer.moveRight = true;
    }
    if(event.keyCode == 87) {
        //alert('w was pressed');
        objPlayer.moveForward = true;
    }
    if(event.keyCode == 83) {
        //alert('s was pressed');
        objPlayer.moveBackward = true;
    }
    if(event.keyCode == 32) {
        objPlayer.jump = true;
    }
  }

  //-- Camera Input --
  {
    if(event.keyCode == 81) {
      //Q
      points = 0;
      objPlayer.running = true;
    }
    if(event.keyCode == 69) {
      //E
    }
  }

});

document.addEventListener('keyup', function(event) {
  //-- Player Input --
  {
    if(event.keyCode == 65) {
        //alert('a was released');
        objPlayer.moveLeft = false;
    }
    if(event.keyCode == 68) {
        //alert('d was released');
        objPlayer.moveRight = false;
    }
    if(event.keyCode == 87) {
        //alert('w was released');
        objPlayer.moveForward = false;
    }
    if(event.keyCode == 83) {
        //alert('s was released');
        objPlayer.moveBackward = false;
    }
  }

});

window.addEventListener( 'mousemove', function(event) {
  objPlayer.mouse.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	objPlayer.mouse.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
	var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

	objPlayer.mouse.yawObject.rotation.y -= movementX * 0.002;
	objPlayer.mouse.pitchObject.rotation.x -= movementY * 0.002;

	objPlayer.mouse.pitchObject.rotation.x = Math.max(- Math.PI / 2, Math.min(Math.PI / 2, objPlayer.mouse.pitchObject.rotation.x));
});
