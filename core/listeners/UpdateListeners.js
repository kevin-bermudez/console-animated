const {v4 : uuidv4} = require('uuid');

class UpdateListeners{
  static instance = null;
  listeners = {};

  static getInstance(){
    if(!UpdateListeners.instance){
      UpdateListeners.instance = new UpdateListeners();
    }

    return UpdateListeners.instance;
  }

  registerListener(listener){
    const newId = uuidv4();
    this.listeners[newId] = listener;
    return newId;
  }

  removeListener(listenerId){
    delete this.listeners[listenerId];
  }

  emitUpdate = () => {
    Object.values(this.listeners).forEach(listener => listener());
  }
}

module.exports.UpdateListeners = UpdateListeners;