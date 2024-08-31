const { GenericObject } = require("./GenericObject");

class MovingObject extends GenericObject{
  constructor(config){
    super(config);
  }

  nextMovement(movementSize){
    console.log('a')
  }
}

module.exports.MovingObject = MovingObject;