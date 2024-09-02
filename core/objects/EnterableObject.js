const { GenericObject } = require('../objects/GenericObject');
const { UpdateListeners } = require("../listeners/UpdateListeners");
const { ScreenManager } = require("../screen/ScreenManager");
const { KeyListeners } = require('../listeners/KeyListeners');
const { ScenesManager } = require('../scenes/ScenesManager');

class EnterableObject extends GenericObject{
  enterKey = '1';
  asociateScene = null;
  static statusesList = Object.freeze({
    CLOSED : 'closed',
    OPENED : 'opened'
  });

  graphicsByStatus = {};

  status = EnterableObject.statusesList.CLOSED;
  updateListenerId = null;

  constructor(config = {},{openGraphic,closeGraphic,x,y,asociateScene}){
    super(config,x,y);
    this.graphicsByStatus[EnterableObject.statusesList.CLOSED] = closeGraphic;
    this.graphicsByStatus[EnterableObject.statusesList.OPENED] = openGraphic;

    this.asociateScene = asociateScene;

    this.graphicByStatus();

    const updateListeners = UpdateListeners.getInstance();
    this.updateListenerId = updateListeners.registerListener(this.onUpdate);

    // this.manageEnterToObject = this.manageEnterToObject.bind(this);
    const keyListeners = KeyListeners.getInstance();
    keyListeners.registerListener(this.manageEnterToObject);

  }

  onRemove(){
    const updateListeners = UpdateListeners.getInstance();
    updateListeners.removeListener(this.updateListenerId);
  }

  manageEnterToObject = (key) => {
    if(key.name === this.enterKey && this.status === EnterableObject.statusesList.OPENED){
      // console.log('holis trinis',this)
      const sceneManager = ScenesManager.getInstance();
      sceneManager.changeScene(this.asociateScene,true);
    }
  }

  graphicByStatus(){
    const screenManager = ScreenManager.getInstance();
    
    if(screenManager.getObject(this)){
      // console.log('hey si está');
      screenManager.removeObject(this);
    }
    
    this.resetGraphics();
    this.graphicsByStatus[this.status].forEach(line => this.setGraphic(line));
    // console.log('serán los draw raros');
    this.draw();
  }

  onUpdate = () => {
    const screenManager = ScreenManager.getInstance();
    const areObjectsNear = screenManager.objectsNear(this);

    if(areObjectsNear.length){
      this.status = EnterableObject.statusesList.OPENED;
      this.graphicByStatus();
      return ;
    }

    this.status = EnterableObject.statusesList.CLOSED;
    this.graphicByStatus();
  }
}

module.exports.EnterableObject = EnterableObject;