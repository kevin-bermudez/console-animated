const { EnterableObject } = require('../../core/objects/EnterableObject');
const { ScenesManager } = require('../../core/scenes/ScenesManager');

class Exit extends EnterableObject{
  constructor(config = {},x,y){
    super(config,{
      closeGraphic:  [
        'x-------x',
        '|Salida |',
        'x-------x'
      ],
      openGraphic: [
        'x-------x',
        '|'+EnterableObject.enterKey+'=Salir|',
        'x-------x'
      ],
      x,
      y,
      asociateScene: ScenesManager.getInstance().prevSceneClass
    });
    
  }
}

module.exports.Exit = Exit;