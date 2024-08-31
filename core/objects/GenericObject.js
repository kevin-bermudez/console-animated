const { v4:uuidv4 } = require('uuid');

class GenericObject{
  lines = [];
  size = { x:0,y:0 }
  positionInScreen = {x:0,y:0}
  inScreen = false;
  config = {
    name : ''
  }
  id = null;

  onUpdate = () => {}

  constructor(config = {}){
    this.id = uuidv4();
    this.config = config;
  }

  setGraphic(content){
    this.lines.push(content.split(''));
    this.size.y++;
    
    if(content.length > this.size.x){
      this.size.x = content.length;
    }
  }

  resetGraphics(){
    this.lines = [];
    this.size = { x:0,y:0 };
  }
}

module.exports.GenericObject = GenericObject;