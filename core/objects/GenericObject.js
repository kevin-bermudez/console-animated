const { v4:uuidv4 } = require('uuid');
const { ScreenManager } = require('../screen/ScreenManager');
const { ScenesManager } = require('../scenes/ScenesManager');

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
  scenesManagerInstance = null;

  onUpdate = () => {}
  onRemove = () => {}

  constructor(config = {},x,y){
    this.id = uuidv4();
    this.config = config;
    // this.screenManagerInstance = ScreenManager.getInstance();
    this.originalPosition.x = x;
    this.originalPosition.y = y;
    // console.log('constructor generic object');
  }

  draw(){
    // console.log('draw in GenericObject')
    ScreenManager.getInstance().drawObject(this);
    this.inScreen = true;
    // console.log('una llamada a draw');
  }

  erase(){
    ScreenManager.getInstance().removeObject(this);
    this.inScreen = false;
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