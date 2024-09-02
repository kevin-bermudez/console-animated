const { GenericScene } = require("../../core/scenes/GenericScene");
const { ScreenManager } = require("../../core/screen/ScreenManager");
const { CentralBank } = require("../objects/CentralBank");
const { Mine } = require("../objects/Mine");
const { Person } = require("../objects/Person");

class InitialScene extends GenericScene{
  constructor(){
    super();
    // console.log('constructor initial scene')
  }

  init(){
    const mine = new Mine({},1,1);
    new CentralBank({},1,mine.size.y+3);
    new Person({},mine.size.x+1,1);
  }
  
}

module.exports.InitialScene = InitialScene;