const { EnterableObject } = require('../../core/objects/EnterableObject');
const { ScenesManager } = require('../../core/scenes/ScenesManager');
const { objectTypes } = require('./object-contants');

class BankCashRegister extends EnterableObject{
  constructor(x,y){
    super({ type:objectTypes.BANK_CASH_REGISTER },{
      closeGraphic:  [
        'x------x',
        '| Caja |',
        'x------x'
      ],
      openGraphic: [
        'x------x',
        '|'+EnterableObject.enterKey+'=usar|',
        'x------x'
      ],
      x,
      y,
      asociateScene: ScenesManager.getInstance().prevSceneClass
    });
    
  }
}

module.exports.BankCashRegister = BankCashRegister;