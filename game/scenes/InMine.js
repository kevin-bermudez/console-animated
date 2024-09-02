const { GenericScene } = require("../../core/scenes/GenericScene");
const { Exit } = require("../objects/Exit");
const { Person } = require("../objects/Person");

class InMine extends GenericScene{
  constructor(){
    super();
    // console.log('constwructor InMine')
  }

  init(){
    const exit = new Exit({},1,1);
    new Person({},exit.size.x + 1,1)
  }
}

module.exports.InMine = InMine;