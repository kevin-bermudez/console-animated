const { EnterableObject } = require('../../core/objects/EnterableObject');
const { InMine } = require('../scenes/InMine');

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
        '|'+EnterableObject.enterKey+' = entrar |',
        'x-----------x'
      ],
      x,
      y,
      asociateScene: InMine
    });
    
  }
}

module.exports.Mine = Mine;