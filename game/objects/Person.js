const { GenericObject } = require('../../core/objects/GenericObject');
const { KeyListeners } = require("../../core/listeners/KeyListeners");
const { ScreenManager } = require("../../core/screen/ScreenManager");

class Person extends GenericObject{
  static type = 'Person';
  
  constructor(config = {}){
    super(config);

    const keyListeners = KeyListeners.getInstance();
    keyListeners.registerListener(this.manageMovementKeys)
  }

  manageMovementKeys = (key) => {
    const screenManager = ScreenManager.getInstance();

    if(screenManager.isDirKey(key.name)){
      screenManager.moveObject(this,key.name);
    }
  }
}

module.exports.Person = Person;