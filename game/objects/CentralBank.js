const { GenericObject } = require('../../core/objects/GenericObject');
const { UpdateListeners } = require("../../core/listeners/UpdateListeners");
const { ScreenManager } = require("../../core/screen/ScreenManager");
const { Person } = require('./Person');

class CentralBank extends GenericObject{
  static statusesList = Object.freeze({
    CLOSED : 'closed',
    OPENED : 'opened'
  });

  graphicsByStatus = Object.freeze({
    [CentralBank.statusesList.CLOSED] :  [
      'x---------x',
      '|B.Central|',
      'x---------x'
    ],
    [CentralBank.statusesList.OPENED] : [
      'x---------x',
      '|1 =entrar|',
      'x---------x'
    ]
  })

  status = CentralBank.statusesList.CLOSED;

  constructor(config = {}){
    super(config);
    this.graphicByStatus();

    // console.log('this',this.onUpdate)
    const updateListeners = UpdateListeners.getInstance();
    updateListeners.registerListener(this.onUpdate);
  }

  graphicByStatus(){
    const screenManager = ScreenManager.getInstance();
    
    if(screenManager.getObject(this)){
      screenManager.removeObject(this);
    }
    
    this.resetGraphics();
    this.graphicsByStatus[this.status].forEach((line,index) => this.setGraphic(line));
    screenManager.drawObject(this,{x:1,y:1})
  }

  onUpdate = () => {
    const screenManager = ScreenManager.getInstance();
    const areObjectsNear = screenManager.objectsNear(this);

    if(areObjectsNear.length){
      this.status = CentralBank.statusesList.OPENED;
      this.graphicByStatus();
      return ;
    }

    this.status = CentralBank.statusesList.CLOSED;
    this.graphicByStatus();
  }
}

module.exports.CentralBank = CentralBank;