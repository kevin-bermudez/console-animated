const { v4:uuidv4 } = require('uuid');
const { ScreenManager } = require('../screen/ScreenManager');
const { saveObject } = require('../storage/generic-object-storage');

class GenericObject{
  config = {}
  data = {};
  id = null;
  
  lines = [];
  size = { x:0,y:0 }
  positionInScreen = {x:0,y:0}
  originalPosition = {x:0,y:0}
  inScreen = false;
  screenManagerInstance = null;
  scenesManagerInstance = null;

  onUpdate = () => {}
  onRemove = () => {}

  // reconfigure(config = {},x,y,data = {}){
  //   this.config = config;
  //   this.data = data;
  //   // this.screenManagerInstance = ScreenManager.getInstance();
  //   this.originalPosition.x = x;
  //   this.originalPosition.y = y;
  //   // console.log('constructor generic object');
  //   this.setGraphic('o');
  //   this.erase();
  //   this.draw();
  // }

  constructor(config = {},x,y,data,id = null){
    this.id = id ? id : uuidv4();
    this.config = config;
    this.data = data;
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

  generateStructureToSave(object){
    return {
      id: object.id,
      config: object.config,
      data: object.data
    }
  }

  saveObject = () => {
    const dataToSave = this.generateStructureToSave(this);
    saveObject(
      dataToSave.id,
      dataToSave.config,
      dataToSave.data
    )
  }
}

module.exports.GenericObject = GenericObject;