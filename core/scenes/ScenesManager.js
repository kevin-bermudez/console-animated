class ScenesManager{
  currentScene = null;
  currentSceneClass = null;
  prevScene = null;

  static instance = null;
  static getInstance(){
    if(!ScenesManager.instance){
      ScenesManager.instance = new ScenesManager();
    }

    return ScenesManager.instance;
  }

  changeScene(newScene){
    // console.log('change',this.changeScene,newScene);
    this.prevScene = this.currentSceneClass;
    this.currentSceneClass = newScene;
    this.currentScene = new newScene();
    // console.log('current scene',this.currentScene)
    this.currentScene.init();
    // console.log('idtest',ScreenManager.getInstance().idtest)
    // console.log(JSON.stringify(ScreenManager.getInstance().getScreen()[3]))
  }
}

module.exports.ScenesManager = ScenesManager;