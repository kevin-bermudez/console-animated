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
        '|1=Salir|',
        'x-------x'
      ],
      x,
      y,
      asociateScene: ScenesManager.getInstance().prevScene
    });
    
  }
}

module.exports.Exit = Exit;