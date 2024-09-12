const { GenericScene } = require("../../core/scenes/GenericScene");
const { Exit } = require("../objects/Exit");
const { GoldOre } = require("../objects/GoldOre");
const { Person } = require("../objects/Person");

class InMine extends GenericScene{
  constructor(){
    super();
    
  }

  init(){
    const exit = new Exit({},1,1);
    const person = new Person(exit.size.x + 2,1);
    
    if(!person.data.visited_gold_mine){
      new GoldOre(exit.size.x + 3,1,person);
    }

    person.data.visited_gold_mine = true;
  }
}

module.exports.InMine = InMine;