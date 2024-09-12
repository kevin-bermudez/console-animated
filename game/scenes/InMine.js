const { UpdateListeners } = require("../../core/listeners/UpdateListeners");
const { GenericScene } = require("../../core/scenes/GenericScene");
const { ScreenManager } = require("../../core/screen/ScreenManager");
const { Exit } = require("../objects/Exit");
const { GoldOre } = require("../objects/GoldOre");
const { Person } = require("../objects/Person");

class InMine extends GenericScene{
  
  // initiated = false;

  constructor(){
    super();
    // console.log('constwructor InMine')
    
  }

  init(){
    const exit = new Exit({},1,1);
    const person = new Person(exit.size.x + 2,1);
    
    if(!person.data.visited_gold_mine){
      new GoldOre(exit.size.x + 3,1,person);
    }
    
    person.data.visited_gold_mine = true;

    // this.initiated = true;
    // super.init();
  }
}

module.exports.InMine = InMine;