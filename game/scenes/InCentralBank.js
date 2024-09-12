const { GenericScene } = require("../../core/scenes/GenericScene");
const { BankCashRegister } = require("../objects/BankCashRegister");
const { Exit } = require("../objects/Exit");
const { GoldOre } = require("../objects/GoldOre");
const { Person } = require("../objects/Person");

class InCentralBank extends GenericScene{
  constructor(){
    super();
  }

  init(){
    const exit = new Exit({},1,1);
  
    const centralBank = new BankCashRegister(1,exit.size.y + 3);

    new Person(centralBank.size.x + 1,centralBank.positionInScreen.y);
    // if(!person.data.visited_gold_mine){
    //   new GoldOre(exit.size.x + 3,1,person);
    // }

    // person.data.visited_gold_mine = true;
  }
}

module.exports.InCentralBank = InCentralBank;