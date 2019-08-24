class blockGeneration {
  constructor(scene, objPlayer, objectList) {
    this.solid1 = new solid(15, 50, 20, 0, 100, 0, -1, 0x00A388, scene);
    this.solid2 = new solid(40, 20, 15, 0, 100, 0, -1, 0x00A388, scene);
    this.solid3 = new solid(5, 40, 70, 0, 100, 0, -1, 0x00A388, scene);
    this.solid4 = new solid(60, 20, 5, 0, 100, 0, -1, 0x00A388, scene);
    this.solid5 = new solid(15, 15, 60, 0, 100, 0, -1, 0x00A388, scene);
    this.solid6 = new solid(15, 20, 15, 0, 100, 0, -1, 0x00A388, scene);
    this.solid7 = new solid(15, 10, 40, 0, 100, 0, -1, 0x00A388, scene);
    this.solid8 = new solid(30, 20, 30, 0, 100, 0, -1, 0x00A388, scene);
    objectList.push(this.solid1);
    objectList.push(this.solid2);
    objectList.push(this.solid3);
    objectList.push(this.solid4);
    objectList.push(this.solid5);
    objectList.push(this.solid6);
    objectList.push(this.solid7);
    objectList.push(this.solid8);

    this.lastXPos = 0;
    this.lastYPos = 0;
    this.lastZPos = 0;

    this.Zoffset = 70;
    this.Xoffset = 120;
    this.randomNumb = Math.floor(Math.random() * this.Xoffset+30) - this.Xoffset;
    this.randomNumbY = Math.floor(Math.random() * 160) - 70;
    this.reset();
  }
  reset() {
    this.lastZPos = objPlayer.body.position.z - this.Zoffset - 170;
    this.solid1.body.position.z = this.lastZPos;
    this.solid1.body.position.y = this.randomNumbY;
    this.randomNumbY = Math.floor(Math.random() * 170) - 70;
    this.solid1.body.position.x = this.randomNumb;
    this.randomNumb = Math.floor(Math.random() * this.Xoffset+30) - this.Xoffset;

    this.lastZPos -= this.Zoffset;
    this.solid2.body.position.z = this.lastZPos;
    this.solid2.body.position.y = this.randomNumbY;
    this.randomNumbY = Math.floor(Math.random() * 170) - 70;
    this.solid2.body.position.x = this.randomNumb;
    this.randomNumb = Math.floor(Math.random() * this.Xoffset+30) - this.Xoffset;

    this.lastZPos -= this.Zoffset;
    this.solid3.body.position.z = this.lastZPos;
    this.solid3.body.position.y = this.randomNumbY;
    this.randomNumbY = Math.floor(Math.random() * 170) - 70;
    this.solid3.body.position.x = this.randomNumb;
    this.randomNumb = Math.floor(Math.random() * this.Xoffset+30) - this.Xoffset;

    this.lastZPos -= this.Zoffset;
    this.solid4.body.position.z = this.lastZPos;
    this.solid4.body.position.y = this.randomNumbY;
    this.randomNumbY = Math.floor(Math.random() * 170) - 70;
    this.solid4.body.position.x = this.randomNumb;
    this.randomNumb = Math.floor(Math.random() * this.Xoffset+30) - this.Xoffset;

    this.lastZPos -= this.Zoffset;
    this.solid5.body.position.z = this.lastZPos;
    this.solid5.body.position.y = this.randomNumbY;
    this.randomNumbY = Math.floor(Math.random() * 20) - 10;
    this.solid5.body.position.x = this.randomNumb;
    this.randomNumb = Math.floor(Math.random() * this.Xoffset+30) - this.Xoffset;

    this.lastZPos -= this.Zoffset;
    this.solid6.body.position.z = this.lastZPos;
    this.solid6.body.position.y = this.randomNumbY;
    this.randomNumbY = Math.floor(Math.random() * 170) - 70;
    this.solid6.body.position.x = this.randomNumb;
    this.randomNumb = Math.floor(Math.random() * this.Xoffset+30) - this.Xoffset;

    this.lastZPos -= this.Zoffset;
    this.solid7.body.position.z = this.lastZPos;
    this.solid7.body.position.y = this.randomNumbY;
    this.randomNumbY = Math.floor(Math.random() * 170) - 70;
    this.solid7.body.position.x = this.randomNumb;
    this.randomNumb = Math.floor(Math.random() * this.Xoffset+30) - this.Xoffset;

    this.lastZPos -= this.Zoffset;
    this.solid8.body.position.z = this.lastZPos;
    this.solid8.body.position.y = this.randomNumbY;
    this.randomNumbY = Math.floor(Math.random() * 170) - 70;
    this.solid8.body.position.x = this.randomNumb;
    this.randomNumb = Math.floor(Math.random() * this.Xoffset+30) - this.Xoffset;
  }

  relocate(solid) {
    this.lastZPos -= this.Zoffset;
    solid.body.position.z = this.lastZPos;
    solid.body.position.y = this.randomNumbY;
    this.randomNumbY = Math.floor(Math.random() * 170) - 70;
    solid.body.position.x = this.randomNumb;
    this.randomNumb = Math.floor(Math.random() * this.Xoffset+30) - this.Xoffset;
  }

  update(objPlayer) {
    this.solid1.update();
    this.solid2.update();
    this.solid3.update();
    this.solid4.update();
    this.solid5.update();
    this.solid6.update();
    this.solid7.update();
    this.solid8.update();

    if(this.solid1.body.position.z > objPlayer.body.position.z + 70 ) {
      console.log("AA");
      this.relocate(this.solid1);
    }
    if(this.solid2.body.position.z > objPlayer.body.position.z + 70 ) {
      this.relocate(this.solid2);
    }
    if(this.solid3.body.position.z > objPlayer.body.position.z + 70 ) {
      this.relocate(this.solid3);
    }
    if(this.solid4.body.position.z > objPlayer.body.position.z + 70 ) {
      this.relocate(this.solid4);
    }
    if(this.solid5.body.position.z > objPlayer.body.position.z + 70 ) {
      this.relocate(this.solid5);
    }
    if(this.solid6.body.position.z > objPlayer.body.position.z + 70 ) {
      this.relocate(this.solid6);
    }
    if(this.solid7.body.position.z > objPlayer.body.position.z + 70 ) {
      this.relocate(this.solid7);
    }
    if(this.solid8.body.position.z > objPlayer.body.position.z + 70 ) {
      this.relocate(this.solid8);
    }

  }
}
