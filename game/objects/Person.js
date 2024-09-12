const { GenericObject } = require('../../core/objects/GenericObject');
const { KeyListeners } = require("../../core/listeners/KeyListeners");
const { ScreenManager } = require("../../core/screen/ScreenManager");
const { getObjectsByType } = require('../../core/storage/generic-object-storage');
const type = 'Person';

class Person extends GenericObject{  
  keyListenersId = null;
  instance = null;

  constructor(x,y){
    let configTmp = {
      type:type
    }
    let dataTmp = {};
    let idTmp = null;

    const preSavedPerson = getObjectsByType(type);

    if(preSavedPerson.length){
      configTmp = preSavedPerson[0].config;
      dataTmp = preSavedPerson[0].data;
      idTmp = preSavedPerson[0].id;
    }
    
    super(
      configTmp,
      x,y,
      dataTmp,
      idTmp
    );
    
    this.setGraphic('o');
    this.draw();

    if(!preSavedPerson.length){
      this.data.pickableObjects = [];
      this.saveObject();
    }

    const keyListeners = KeyListeners.getInstance();
    this.keyListenersId = keyListeners.registerListener(this.manageMovementKeys);
  }

  // static getInstance(config = {},x,y,notReconfigure = false){
  //   // console.log('holi instance',config,x,y,notReconfigure);
  //   // console.log('data person',config,x,y,notReconfigure);
  //   if(!this.instance){
  //     Person.instance = new Person(x,y);
  //     Person.instance.reconfigure(config,x,y);
  //   } 

  //   if(!notReconfigure){
  //     // ScreenManager.getInstance().writeInAside(`${x} ${y}`,7)
  //     Person.instance.reconfigure(config,x,y);
  //   }

  //   return Person.instance;
  // }

  setPickableObject(pickableObject){
    this.data.pickableObjects.push(this.generateStructureToSave( pickableObject ));
    this.saveObject();
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