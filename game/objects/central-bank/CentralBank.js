const { EnterableObject } = require('../../../core/objects/EnterableObject');
const { getObjectsByType } = require('../../../core/storage/generic-object-storage');
const { InCentralBank } = require('../../scenes/InCentralBank');
const { objectTypes } = require('../object-contants');

class CentralBank extends EnterableObject{
  constructor(x,y){
    let configTmp = {
      type:objectTypes.CENTRAL_BANK
    }
    let dataTmp = {vault : {}};
    let idTmp = null;

    const preSavedCentralBank = getObjectsByType(objectTypes.CENTRAL_BANK);
    
    if(preSavedCentralBank.length){
      configTmp = preSavedCentralBank[0].config;
      dataTmp = preSavedCentralBank[0].data;
      idTmp = preSavedCentralBank[0].id;
    }

    super(configTmp,{
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
      },
      dataTmp,
      idTmp
    );

    if(!preSavedCentralBank.length){
      this.saveObject();
    }
  }
}

module.exports.CentralBank = CentralBank;