const { EnterableObject } = require('../../core/objects/EnterableObject');

class Mine extends EnterableObject{
  constructor(config = {},x,y){
    super(config,{
      closeGraphic:  [
        'x-----------x',
        '|Mina de oro|',
        'x-----------x'
      ],
      openGraphic: [
        'x-----------x',
        '|1 = entrar |',
        'x-----------x'
      ],
      x,
      y
    });
  }
}

module.exports.Mine = Mine;