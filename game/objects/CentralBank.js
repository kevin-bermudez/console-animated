const { EnterableObject } = require('../../core/objects/EnterableObject');

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
        '|1 =entrar|',
        'x---------x'
      ],
      x,
      y
    });
  }
}

module.exports.CentralBank = CentralBank;