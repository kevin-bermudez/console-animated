const { ScreenManager } = require("../screen/ScreenManager");

class GenericScene{
  constructor(){
    // console.log('constructor generic scene');
    const screenManager = ScreenManager.getInstance()
    screenManager.resetScreen();
  }

  init(){}
}

module.exports.GenericScene = GenericScene;