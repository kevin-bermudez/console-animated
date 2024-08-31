class UpdateListeners{
  static instance = null;
  listeners = [];

  static getInstance(){
    if(!UpdateListeners.instance){
      if (process.stdin.isTTY){
        process.stdin.setRawMode(true);
      }

      UpdateListeners.instance = new UpdateListeners();
    }

    return UpdateListeners.instance;
  }

  registerListener(listener){
    this.listeners.push(listener);
  }

  emitUpdate = () => {
    this.listeners.forEach(listener => listener());
  }
}

module.exports.UpdateListeners = UpdateListeners;