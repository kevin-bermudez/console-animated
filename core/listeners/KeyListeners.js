const {v4 : uuidv4} = require('uuid');

class KeyListeners{
  static instance = null;
  listeners = {};

  static getInstance(){
    if(!KeyListeners.instance){
      if (process.stdin.isTTY){
        process.stdin.setRawMode(true);
      }

      process.stdin.on('keypress', (chunk, key) => {
        if(key.name === 'c'){
          process.exit();
        }

        const keyListeners = KeyListeners.getInstance();
        Object.values(keyListeners.listeners).forEach((listener) => {
          listener(key);
        })
      });

      KeyListeners.instance = new KeyListeners();
    }

    return KeyListeners.instance;
  }

  registerListener(listener){
    const newId = uuidv4();
    this.listeners[newId] = listener;
    return newId;
  }

  removeListener(listenerId){
    delete this.listeners[listenerId];
  }
}

module.exports.KeyListeners = KeyListeners;