const { objectTypes } = require("../../game/objects/object-contants");
const { UpdateListeners } = require("../listeners/UpdateListeners");
const { ScreenManager } = require("../screen/ScreenManager");
const { getObjectsByType } = require("../storage/generic-object-storage");

class GenericScene{
  updateListenerId = null;

  constructor(){
    // console.log('constructor generic scene');
    const screenManager = ScreenManager.getInstance()
    screenManager.resetScreen();

    const updateListeners = UpdateListeners.getInstance();
    this.updateListenerId = updateListeners.registerListener(this.onUpdate);
  }

  init(){
    
  }

  onUpdate = () => {
    // if(this.initiated){
      this.writeAside();
    // }
  }

  onRemove(){
    UpdateListeners.getInstance().removeListener(this.updateListenerId);
  }

  writeAside(){
    let personObject = getObjectsByType(objectTypes.PERSON);
    let personObjects = [];
    let currentLine = 1;
    const screenManager = ScreenManager.getInstance();
    screenManager.resetAside();
    
    if(personObject.length && personObject[0].data.pickableObjects && personObject[0].data.pickableObjects.length){
      screenManager.writeInAside('1. Objetos',currentLine);
      currentLine++;

      const additionalInfo0 = personObject[0].data.pickableObjects[0].data.units ? '(' + personObject[0].data.pickableObjects[0].data.units + 'gr)' : '';
      screenManager.writeInAside('- ' + personObject[0].data.pickableObjects[0].config.type + ' ' + additionalInfo0,currentLine);
      currentLine++;
      currentLine++;
    }

    if(personObject.length){
      screenManager.writeInAside('Efectivo: $' + personObject[0].data.cash,currentLine);
      currentLine++;
      currentLine++;
    }

    screenManager.writeInAside('Desplazarse:     ^      |',currentLine);
    currentLine++;

    screenManager.writeInAside('             <-  |  ->  v',currentLine);
    currentLine++;

    return currentLine;
  }
}

module.exports.GenericScene = GenericScene;