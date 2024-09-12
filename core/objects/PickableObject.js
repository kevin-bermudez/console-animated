const { GenericObject } = require('../objects/GenericObject');
const { KeyListeners } = require('../listeners/KeyListeners');
const { ScreenManager } = require('../screen/ScreenManager');
const { UpdateListeners } = require("../listeners/UpdateListeners");

class PickableObject extends GenericObject{
  static takeKey = '2';
  pickerObject = null;
  static statusesList = Object.freeze({
    AWAY : 'away',
    NEARBY : 'nearby'
  });
  canTake = false;
  graphicsByStatus = {};

  status = PickableObject.statusesList.AWAY;
  updateListenerId = null;
  keyListenersId = null;
  preListeners = [];

  constructor(config = {},data = {},{awayGraphic,nearbyGraphic,x,y,pickerObject,canTake = false}){
    super(config,x,y,data);
    this.graphicsByStatus[PickableObject.statusesList.AWAY] = awayGraphic;
    this.graphicsByStatus[PickableObject.statusesList.NEARBY] = nearbyGraphic;
    this.canTake = canTake;

    this.pickerObject = pickerObject;

    this.graphicByStatus();

    const updateListeners = UpdateListeners.getInstance();
    this.updateListenerId = updateListeners.registerListener(this.onUpdate);

    const keyListeners = KeyListeners.getInstance();
    this.keyListenersId = keyListeners.registerListener(this.manageToPickToObject);
  }

  registerPrevPickListener(listener){
    this.preListeners.push(listener);
  }

  manageToPickToObject = (key) => {
    if(this.preListeners.length){
      this.preListeners.forEach(listener => listener(key));
    }

    if(
      key.name === PickableObject.takeKey && 
      this.status === PickableObject.statusesList.NEARBY &&
      this.canTake
    ){
      this.pickerObject.setPickableObject(this);
      ScreenManager.getInstance().removeObject(this);
      // console.log(this.onRemove)
      this.onRemove();

      // if(this.transformBeforeTake){
      //   this.transformBeforeTake();
      // }
    }
  }

  graphicByStatus(){
    const screenManager = ScreenManager.getInstance();
    
    if(screenManager.getObject(this)){
      screenManager.removeObject(this);
    }
    
    this.resetGraphics();
    
    this.graphicsByStatus[this.status].forEach(line => this.setGraphic(line));
    this.draw();
  }

  onRemove = () => {
    const updateListeners = UpdateListeners.getInstance();
    updateListeners.removeListener(this.updateListenerId);

    const keyListeners = KeyListeners.getInstance();
    keyListeners.removeListener(this.keyListenersId);
  }

  onUpdate = () => {
    const screenManager = ScreenManager.getInstance();
    const areObjectsNear = screenManager.objectsNear(this);
    // console.log('on upd',areObjectsNear.length)
    if(areObjectsNear.length){
      this.status = PickableObject.statusesList.NEARBY;
      this.graphicByStatus();

      return ;
    }

    this.status = PickableObject.statusesList.AWAY;
    this.graphicByStatus();
  }
}

module.exports.PickableObject = PickableObject;