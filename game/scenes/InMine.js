const { GenericScene } = require("../../core/scenes/GenericScene");
const { Person } = require("../objects/Person");

class InMine extends GenericScene{
  constructor(){
    super();
    // console.log('constwructor InMine')
  }

  init(){
    new Person({},50,3)
  }
}

module.exports.InMine = InMine;