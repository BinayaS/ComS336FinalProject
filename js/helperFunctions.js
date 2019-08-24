function isCollision(tree, player,hspdX,hspdZ,vspd){
  var currentNode=tree.root;

  return collisionDirection(currentNode,player,hspdX,hspdZ,vspd);
}

function instersect(obj,playerCoords){
  var objCoords=obj.box;
  var aMinX=objCoords.min.x;
  var aMaxX=objCoords.max.x;
  var aMinY=objCoords.min.y;
  var aMaxY=objCoords.max.y;
  var aMinZ=objCoords.min.z;
  var aMaxZ=objCoords.max.z;


  var bMinX=playerCoords.min.x;
  var bMaxX=playerCoords.max.x;
  var bMinY=playerCoords.min.y;
  var bMaxY=playerCoords.max.y;
  var bMinZ=playerCoords.min.z;
  var bMaxZ=playerCoords.max.z;

  return (aMinX <= bMaxX && aMaxX >= bMinX) &&
           (aMinY <= bMaxY && aMaxY >= bMinY) &&
           (aMinZ <= bMaxZ && aMaxZ >= bMinZ);
}

function collisionDirection(obj,player,hspdX,hspdZ,vspd){
  var playerCoords=player;

  playerCoords.max.x+=hspdX;
  playerCoords.min.x+=hspdX;
  playerCoords.max.z+=hspdZ;
  playerCoords.min.z+=hspdZ;
  playerCoords.max.y+=vspd;
  playerCoords.min.y+=vspd;
  if(instersect(obj,playerCoords)){
    return true;
  }
  else return false;
}

function placeMeeting(minx, maxx, minz, maxz, miny, maxy, object) {

  var objCoords=object.box;
  var aMinX=objCoords.min.x;
  var aMaxX=objCoords.max.x;
  var aMinY=objCoords.min.y;
  var aMaxY=objCoords.max.y;
  var aMinZ=objCoords.min.z;
  var aMaxZ=objCoords.max.z;

  var bMinX=minx;
  var bMaxX=maxx;
  var bMinY=miny;
  var bMaxY=maxy;
  var bMinZ=minz;
  var bMaxZ=maxz;

  return (aMinX <= bMaxX && aMaxX >= bMinX) &&
           (aMinY <= bMaxY && aMaxY >= bMinY) &&
           (aMinZ <= bMaxZ && aMaxZ >= bMinZ);
}

function breadthFirstSearch(node) {
    var queue = [];
    var visited = [];
    var output = [];

    fromQueue(node, queue, visited, output);

    console.log(output);
    return output;
}

function fromQueue(node, queue, visited, output) {
  //get node & put it into the visited
  visited.push(node);
  //check if current node is in the queue if so remove it
  for(var i = 0; i < queue.length; i++) {
    if(node == queue[i]) {
      queue.splice(i, 1);
      break;
    }
  }
  //update output to have node
  output.push(node);

  //take children add to the queue if not null
  if(node.childL != null) {
    queue.push(node.childL);
  }
  if(node.childR != null) {
    queue.push(node.childR);
  }

  if(queue.length != 0) {
    fromQueue(queue[0], queue, visited, output);
  }

}

function sign(number) {
  if(number > 0) {
    return 1
  } else if(number < 0) {
    return -1
  } else {
    return 0;
  }
}
