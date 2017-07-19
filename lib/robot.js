'use strict';

const directions = [ 'north', 'east', 'south', 'west' ];

function Robot() {
}

Robot.prototype.orient = function(direction){
  if(directions.includes(direction)){
    this.bearing = direction
  }
  else{
    throw new Error("Invalid Robot Bearing")
  };
}

Robot.prototype.turnRight = function(){
  let currentIndex = directions.indexOf(this.bearing)
  if(currentIndex === 3){
    this.bearing = directions[0]
  }
  else{
    this.bearing = directions[currentIndex + 1]
  }
}

Robot.prototype.turnLeft = function(){
  let currentIndex = directions.indexOf(this.bearing)
  if(currentIndex === 0){
    this.bearing = directions[3]
  }
  else{
    this.bearing = directions[currentIndex - 1]
  }
}

Robot.prototype.at = function(x,y){
  this.coordinates = [x,y]
}

Robot.prototype.advance = function(){

  switch(this.bearing){
    case 'north':
      this.coordinates[1]++
      break;
    case 'east':
      this.coordinates[0]++
      break;
    case 'south':
      this.coordinates[1]--
      break;
    case 'west':
      this.coordinates[0]--
      break;
  }

}

Robot.prototype.instructions = function(instruction){
  let instructionsArray = []
  let charArray = instruction.split("");
  charArray.forEach(function(character){
    switch(character){
      case 'L':
        instructionsArray.push("turnLeft")
        break;
      case 'R':
        instructionsArray.push("turnRight")
        break;
      case 'A':
        instructionsArray.push("advance")
        break;
    }
  })
  return instructionsArray;
}

Robot.prototype.place = function(placeHash){
  this.bearing = placeHash["direction"];
  this.coordinates = [placeHash["x"],placeHash["y"]];
}

Robot.prototype.evaluate = function(instructions){
  let instructionsArray = this.instructions(instructions)
  instructionsArray.forEach(instruction=>{
    let robot = this
    robot[instruction]()
  })

}
