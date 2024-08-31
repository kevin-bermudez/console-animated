const { v4:uuidv4 } = require('uuid');
const { ScreenManager } = require('../screen/ScreenManager');

class GenericObject{
  lines = [];
  size = { x:0,y:0 }
  positionInScreen = {x:0,y:0}
  originalPosition = {x:0,y:0}
  inScreen = false;
  config = {
    name : ''
  }
  id = null;
  screenManagerInstance = null;

  onUpdate = () => {}

  constructor(config = {},x,y){
    this.id = uuidv4();
    this.config = config;
    this.screenManagerInstance = ScreenManager.getInstance();
    this.originalPosition.x = x;
    this.originalPosition.y = y;
  }

  draw(){
    this.screenManagerInstance.drawObject(this)
  }

  erase(){
    this.screenManagerInstance.removeObject(this);
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