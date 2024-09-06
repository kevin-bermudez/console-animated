const { GenericObject } = require('../../core/objects/GenericObject');
const { KeyListeners } = require("../../core/listeners/KeyListeners");
const { ScreenManager } = require("../../core/screen/ScreenManager");

class Person extends GenericObject{  
  keyListenersId = null;
  instance = null;

  constructor(config,x,y){
    super(config,x,y);

    const keyListeners = KeyListeners.getInstance();
    this.keyListenersId = keyListeners.registerListener(this.manageMovementKeys);
    this.data.pickableObjects = [];
  }

  static getInstance(config = {},x,y,notReconfigure = false){
    // console.log('holi instance',config,x,y,notReconfigure);
    // console.log('data person',config,x,y,notReconfigure);
    if(!this.instance){
      Person.instance = new Person(config,x,y);
      Person.instance.reconfigure(config,x,y);
    } 

    if(!notReconfigure){
      // ScreenManager.getInstance().writeInAside(`${x} ${y}`,7)
      Person.instance.reconfigure(config,x,y);
    }

    return Person.instance;
  }

  setPickableObject(pickableObject){
    this.data.pickableObjects.push(pickableObject);
  }

  onRemove(){
    const keyListeners = KeyListeners.getInstance();
    keyListeners.remcoveListener(this.keyListenersId);

    
  }

  manageMovementKeys = (key) => {
    const screenManager = ScreenManager.getInstance();

    if(screenManager.isDirKey(key.name)){
      screenManager.moveObject(this,key.name);
    }
  }
}

module.exports.Person = Person;