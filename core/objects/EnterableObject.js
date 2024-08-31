const { GenericObject } = require('../objects/GenericObject');
const { UpdateListeners } = require("../listeners/UpdateListeners");
const { ScreenManager } = require("../screen/ScreenManager");

class EnterableObject extends GenericObject{
  static statusesList = Object.freeze({
    CLOSED : 'closed',
    OPENED : 'opened'
  });

  graphicsByStatus = {};

  status = EnterableObject.statusesList.CLOSED;

  constructor(config = {},{openGraphic,closeGraphic,x,y}){
    super(config,x,y);
    this.graphicsByStatus[EnterableObject.statusesList.CLOSED] = closeGraphic;
    this.graphicsByStatus[EnterableObject.statusesList.OPENED] = openGraphic;

    this.graphicByStatus();

    const updateListeners = UpdateListeners.getInstance();
    updateListeners.registerListener(this.onUpdate);
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