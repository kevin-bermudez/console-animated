const { Person } = require("../../game/objects/Person");
const { UpdateListeners } = require("../listeners/UpdateListeners");
const { ScreenManager } = require("../screen/ScreenManager");

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
    const personObjects = Person.getInstance({},0,0,true).pickableObjects;
    let currentLine = 1;
    const screenManager = ScreenManager.getInstance();
    screenManager.resetAside();

    screenManager.writeInAside('1. Objetos',currentLine);
    currentLine++;

    
    if(personObjects.length){
      const additionalInfo0 = personObjects[0].weight ? '(' + personObjects[0].weight + 'gr)' : '';
      screenManager.writeInAside('- ' + personObjects[0].config.name + additionalInfo0,currentLine);
      currentLine++;
    }

    currentLine++;

    screenManager.writeInAside('Desplazarse:     ^      |',currentLine);
    currentLine++;

    screenManager.writeInAside('             <-  |  ->  v',currentLine);
    currentLine++;
  }
}

module.exports.GenericScene = GenericScene;