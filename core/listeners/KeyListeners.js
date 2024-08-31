class KeyListeners{
  static instance = null;
  listeners = [];

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
        keyListeners.listeners.forEach((listener) => {
          listener(key);
        })
      });

      KeyListeners.instance = new KeyListeners();
    }

    return KeyListeners.instance;
  }

  registerListener(listener){
    this.listeners.push(listener);
  }
}

module.exports.KeyListeners = KeyListeners;