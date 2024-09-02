const { GenericScene } = require("../../core/scenes/GenericScene");
const { Exit } = require("../objects/Exit");
const { GoldOre } = require("../objects/GoldOre");
const { Person } = require("../objects/Person");

class InMine extends GenericScene{
  constructor(){
    super();
    // console.log('constwructor InMine')
  }

  init(){
    const exit = new Exit({},1,1);
    Person.getInstance({},exit.size.x + 2,1);

    new GoldOre({},exit.size.x + 3,1);
  }
}

module.exports.InMine = InMine;