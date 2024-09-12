const { EnterableObject } = require('../../core/objects/EnterableObject');
const { InCentralBank } = require('../scenes/InCentralBank');

class CentralBank extends EnterableObject{
  constructor(config = {},x,y){
    super(config,{
      closeGraphic:  [
        'x---------x',
        '|B.Central|',
        'x---------x'
      ],
      openGraphic: [
        'x---------x',
        '|'+EnterableObject.enterKey+' =entrar|',
        'x---------x'
      ],
      x,
      y,
      asociateScene: InCentralBank
    });
  }
}

module.exports.CentralBank = CentralBank;