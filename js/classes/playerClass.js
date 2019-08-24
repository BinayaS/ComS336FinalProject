class player {
  constructor(scene) {
    //-- Setup the body --
    {
      this.boxGeometry = new THREE.BoxGeometry(10, 10, 10);
      this.newGeometry = new THREE.BoxGeometry(10, 10, 20);
      this.newEyeGeometry = new THREE.BoxGeometry(2, 2, 2);
      this.basicMaterial = new THREE.MeshBasicMaterial({color: 0x1195DD});
      this.FaceMaterial = new THREE.MeshBasicMaterial({color: 0xFC3C3C});
      this.cube = new THREE.Mesh(this.boxGeometry, this.basicMaterial);
      this.eye1 = new THREE.Mesh(this.newEyeGeometry, this.FaceMaterial);
      this.eye2 = new THREE.Mesh(this.newEyeGeometry, this.FaceMaterial);

      //scene.add(this.eye1);
      //scene.add(this.eye2);

      this.cameraCube = new THREE.Mesh(this.newGeometry, this.basicMaterial);
      this.body = new THREE.Object3D();
      this.cameraBody = new THREE.Object3D();
      this.cameraBody.add(this.cameraCube);
      //this.cameraBody.translateY(20);
      this.cameraBody.translateZ(-30);
      this.body.add(this.cube);
      this.body.translateY(20);
      this.body.translateZ(-5);
      scene.add(this.body);
      //scene.add(this.cameraBody);
    }

    //-- Setup Keyboard Vars. --
    {
      this.moveForward = false;
      this.moveBackward = false;
      this.moveLeft = false;
      this.moveRight = false;
      this.jump = false;
      this.onGround = false;
      this.running = false;
    }

    //-- Setup Local Vars. --
    {
      this.hspd = 0;
      this.hspdX = 0;
      this.hspdZ = 0;
      this.vspd = 0;
      this.spd = 2;
      this.gravity=-.3;
      this.jumpSpd=10;
      this.collisionX = false;
      this.collisionXSign = false;
      this.collisionZ = false;
      this.collisionZSign = false;
      this.collisionY = false;
      this.collisionYSign = false;
      this.collisionXObject = null;
      this.collisionZObject = null;
      this.collisionYObject = null;
      this.currentMoveSpd = this.spd;
      this.box = new THREE.Box3().setFromObject(this.body);
      this.direction = new THREE.Vector3();
    }
  }

  addMouse(camera, scene) {
    this.mouse = new mouse(camera, scene, this);
  }
  addBlockGeneration(objBlockGeneration) {
    this.blockGeneration = objBlockGeneration;
  }

  update(objectList,delta) {



    var rotation = this.mouse.yawObject.rotation.y*180/Math.PI;
    //console.log(rotation);
    //console.log("Z: " + Math.sin(rotation));
    //console.log("X: " + Math.cos(rotation));

    //-- Update Min, Max, Cords. --
    {
      this.box.setFromObject(this.body);
    }

    //-- Movement --
    {
      //-- onGround Movement Calculation --
      {

        this.horizontalZ = this.moveBackward - this.moveForward;
        this.horizontalX = this.moveRight - this.moveLeft;
        if(this.horizontalX != 0 && this.horizontalZ != 0) {
          this.currentMoveSpd = this.spd/Math.sqrt(2);
        } else {
          this.currentMoveSpd = this.spd;
        }

        //-- horizontalX --
        if(this.horizontalX == 0) {
        	this.hspdX = 0;
        } else if(this.horizontalX > 0) {
        	this.hspdX = this.currentMoveSpd;
          //this.hspdX = Math.sin(rotation);
        } else {
        	this.hspdX = -this.currentMoveSpd;
          //this.hspdX = -Math.sin(rotation);
        }

        //-- horizontalZ --
        if(this.running) {
          this.hspdZ = -1;
        } else {
          this.hspdZ = 0;
        }

        // if(this.horizontalZ == 0) {
        // 	this.hspdZ = 0;
        // } else if(this.horizontalZ > 0) {
        // 	this.hspdZ = this.currentMoveSpd;
        //   //this.hspdZ = Math.cos(rotation);
        // } else {
        // 	this.hspdZ = -this.currentMoveSpd;
        //   //this.hspdZ = -Math.cos(rotation);
        // }

        if(this.onGround){
          if(this.jump) {
            this.vspd+=this.jumpSpd;
            this.onGround=false;
            this.jump=false;
          }
        } else {
          this.jump = false;
        }

        this.vspd+=this.gravity;
        // console.log(this.vspd);

      }
        //-- Do we have objects to collide with? --
        {
          if(objectList.length > 0) {

            //-- Itterate Through the list --
            {
              for(var i = 0; i < objectList.length; i++) {

                //-- Check for collision in the x axis --
                {
                  if(placeMeeting( this.box.min.x + this.hspdX, this.box.max.x + this.hspdX,
                                    this.box.min.z, this.box.max.z,
                                    this.box.min.y, this.box.max.y, objectList[i])) {

                    if(placeMeeting( this.box.min.x + sign(this.hspdX), this.box.max.x + sign(this.hspdX),
                                      this.box.min.z, this.box.max.z,
                                      this.box.min.y, this.box.max.y, objectList[i])) {
                                      this.collisionXSign = true;
                    }

                                    this.collisionX = true;
                                    this.collisionXObject = objectList[i];
                  }
                }

                //-- Check for collision in the z axis --
                {
                  if(placeMeeting( this.box.min.x, this.box.max.x,
                                    this.box.min.z + this.hspdZ, this.box.max.z + this.hspdZ,
                                    this.box.min.y, this.box.max.y, objectList[i])) {

                    if(placeMeeting( this.box.min.x, this.box.max.x,
                                      this.box.min.z + sign(this.hspdZ), this.box.max.z + sign(this.hspdZ),
                                      this.box.min.y, this.box.max.y, objectList[i])) {
                                      this.collisionZSign = true;
                    }
                                    this.collisionZ = true;
                                    this.collisionZObject = objectList[i];
                  }
                }

                //-- Check for collision in the y axis --
                {
                  if(placeMeeting( this.box.min.x, this.box.max.x,
                                    this.box.min.z, this.box.max.z,
                                    this.box.min.y + this.vspd, this.box.max.y + this.vspd, objectList[i])) {

                    if(placeMeeting( this.box.min.x, this.box.max.x,
                                      this.box.min.z, this.box.max.z,
                                      this.box.min.y+sign(this.vspd), this.box.max.y+sign(this.vspd), objectList[i])) {
                                      this.collisionYSign = true;
                    }
                                    this.collisionY = true;
                                    this.vspd=0;
                                    this.onGround=true;
                                    this.collisionYObject = objectList[i];
                  }
                }
              }
            }
            } else {
              this.body.translateX(this.hspdX);
              this.body.translateZ(this.hspdZ);
              this.body.translateY(this.vspd);
            }
          }


        //-- Check if there still is a collision in the x axis --
        {
          if(this.collisionXObject != null) {
            if(placeMeeting(this.box.min.x + this.hspdX, this.box.max.x + this.hspdX,
                            this.box.min.z, this.box.max.z,
                            this.box.min.y, this.box.max.y, this.collisionXObject)) {
                            this.collisionX = false;
                            //this.collisionXObject = null;
            } else if(!placeMeeting(this.box.min.x + sign(this.hspdX), this.box.max.x + sign(this.hspdX),
                            this.box.min.z, this.box.max.z,
                            this.box.min.y, this.box.max.y, this.collisionXObject)) {
                            this.collisionXSign = false;
                            this.collisionXObject = null;
            }
          }
        }

        //-- Check if there still is a collision in the x axis --
        {
          if(this.collisionZObject != null) {
            if(placeMeeting( this.box.min.x, this.box.max.x,
                            this.box.min.z + this.hspdZ, this.box.max.z + this.hspdZ,
                            this.box.min.y, this.box.max.y, this.collisionZObject)) {
                            this.collisionZ = false;
                            //this.collisionZObject = null;
            } else if(!placeMeeting(this.box.min.x, this.box.max.x,
                            this.box.min.z + sign(this.hspdZ), this.box.max.z + sign(this.hspdZ),
                            this.box.min.y, this.box.max.y, this.collisionZObject)) {
                            this.collisionZSign = false;
                            this.collisionZObject = null;
            }
          }
        }

        //-- Check if there still is a collision in the x axis --
        {
          if(this.collisionYObject != null) {
            if(this.vspd==0){
              this.collisionY=false;
              this.collisionYSign = false;
              this.collisionYObject = null;
            }
            else if(placeMeeting( this.box.min.x, this.box.max.x,
                            this.box.min.z, this.box.max.z,
                            this.box.min.y + this.vspd, this.box.max.y + this.vspd, this.collisionYObject)) {
                            this.collisionY = false;
                            //this.collisionYObject = null;
            } else if(!placeMeeting(this.box.min.x, this.box.max.x,
                            this.box.min.z, this.box.max.z,
                            this.box.min.y + sign(this.vspd), this.box.max.y + sign(this.vspd), this.collisionYObject)) {
                            this.collisionYSign = false;
                            this.collisionYObject = null;
            }
          }
        }


        //-- Can we move? --
        {
          if(!this.collisionX && !this.collisionXSign) {
            this.body.translateX(this.hspdX);
            //this.body.position.x = this.mouse.yawObject.position.x;
          } else {
            this.hspdX = 0;
          }
          if(!this.collisionY && !this.collisionYSign) {
            this.body.translateY(this.vspd);
          } else {
            this.vpsd = 0;
          }
          // if(this.collisionY) {
          //   this.on;
          // }
          if(!this.collisionZ && !this.collisionZSign) {
            this.body.translateZ(this.hspdZ);
            //this.body.position.z = this.mouse.yawObject.position.z;
          } else {
            this.hspdZ = 0;
          }
        }

        //-- Mouse update --
        this.mouse.yawObject.position.x = this.body.position.x;
        this.mouse.yawObject.position.z = this.body.position.z;
        this.mouse.yawObject.position.y = this.body.position.y + 5;

        //-- Setup face positions --
        this.eye1.position.y = this.body.position.y + 5;
        this.eye1.position.z = this.body.position.z - 4;
        this.eye1.position.x = this.body.position.x - 2;
        this.eye2.position.y = this.body.position.y + 5;
        this.eye2.position.z = this.body.position.z - 4;
        this.eye2.position.x = this.body.position.x + 2;

        if(this.body.position.y < -3000) {
          this.body.position.set(0, 40, 0);
          this.vspd = -10;
          this.running = false;
          this.blockGeneration.reset();
        }

        //this.mouse.update(this.hspdX, this.vspd, this.hspdZ);

        // this.cameraBody.rotation.y = this.mouse.yawObject.rotation.y;//*180/Math.PI;
        // this.cameraBody.position.x = this.body.position.x;
        // this.cameraBody.position.z = this.body.position.z;
        // this.cameraBody.position.y = this.body.position.y + 10;

        //this.body.position.x = this.mouse.yawObject.position.x;
        //this.body.position.y = this.cameraBody.position.y;
        //this.body.position.z = this.mouse.yawObject.position.z;

      }


    //-- Debug Code --
    {
      //console.log(this.body.position.z);
      //console.log(this.box.min);
      //console.log(this.collisionXSign);
      //console.log("Z" + this.collisionZSign);
      //console.log("X" + this.collisionXSign);
      // console.log(" ");
      //console.log("hspdz" + this.hspdZ);
      //console.log("hspdx" + this.hspdX);
    }

  }
}
