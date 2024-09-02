const { GenericObject } = require('../../core/objects/GenericObject');
const { KeyListeners } = require("../../core/listeners/KeyListeners");
const { ScreenManager } = require("../../core/screen/ScreenManager");

class Person extends GenericObject{  
  keyListenersId = null;
  pickableObjects = [];
  instance = null;

  constructor(config,x,y){
    super(config,x,y);

    const keyListeners = KeyListeners.getInstance();
    this.keyListenersId = keyListeners.registerListener(this.manageMovementKeys);
    
    this.setGraphic('o');
    this.draw();
  }

  static getInstance(config = {},x,y){
    if(!this.instance){
      Person.instance = new Person(config,x,y);
    }

    return this.instance;
  }

  setPickableObject(pickableObject){
    this.pickableObjects.push(pickableObject);
  }

  onRemove(){
    const keyListeners = KeyListeners.getInstance();
    keyListeners.removeListener(this.keyListenersId);
  }

  manageMovementKeys = (key) => {
    const screenManager = ScreenManager.getInstance();

    if(screenManager.isDirKey(key.name)){
      screenManager.moveObject(this,key.name);
    }
  }
}

module.exports.Person = Person;