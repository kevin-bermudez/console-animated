class ScenesManager{
  static prevSceneTag = 'ps';
  currentScene = null;
  currentSceneClass = null;
  history = [];
  
  prevSceneClass = null;

  static instance = null;
  static getInstance(){
    if(!ScenesManager.instance){
      ScenesManager.instance = new ScenesManager();
    }

    return ScenesManager.instance;
  }

  changeScene(newScene,noModifyHistory = false){
    // console.log('change',this.changeScene,newScene);
    this.prevSceneClass = this.currentSceneClass;

    if(newScene === ScenesManager.prevSceneTag){
      this.history.pop();
    }

    if(newScene !== ScenesManager.prevSceneTag){
      this.history.push(newScene)
    }
    
    if(this.currentScene && this.currentScene.onRemove){
      this.currentScene.onRemove();
    }

    const newSceneDef = this.history[ this.history.length - 1 ];
    this.currentSceneClass = newSceneDef;
    this.currentScene = new newSceneDef();
    // console.log('current scene',this.currentScene)
    this.currentScene.init();
    // console.log('idtest',ScreenManager.getInstance().idtest)
    // console.log(JSON.stringify(ScreenManager.getInstance().getScreen()[3]))
  }
}

module.exports.ScenesManager = ScenesManager;