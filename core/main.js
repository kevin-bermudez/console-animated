const { debugJson } = require('../debugjson');
const { KeyListeners } = require('./listeners/KeyListeners');
const { UpdateListeners } = require('./listeners/UpdateListeners');
const { ScreenManager } = require('./screen/ScreenManager');
const cursor = require('../ansi/ansi')(process.stdout)

const readline = require('readline');

readline.emitKeypressEvents(process.stdin);

let configGame = {};

if (process.stdin.isTTY)
    process.stdin.setRawMode(true);

const loop = (time) => {
  const delta = time - configGame.lastChange;
  
  if(delta <= configGame.durationFrame && configGame.lastChange !== null){
    requestAnimationFrame(loop);
    return;
  }

  const updateListeners = UpdateListeners.getInstance();
  updateListeners.emitUpdate();

  const screenManager = ScreenManager.getInstance();

  configGame.lastChange = time;
  configGame.currentFrame++;

  // console.log(screenManager.screen)
  // const fs = require('fs');
  // fs.writeFileSync('pruebascreen.json',JSON.stringify(screenManager.screen,null,2))
  // console.log('screen',screenManager.screen)
  
  screenManager.printScreen();

  requestAnimationFrame(loop);
}

const requestAnimationFrame = (f) => {
  setImmediate(()=>f(Date.now()))
}

const main = (configGameP = {
  fps : 1,
  currentFrame : 1
}) => {
  configGame = {
    ...configGameP,
    durationFrame : 1000 / configGameP.fps,
    lastChange : null
  };

  cursor.hide();
  // KeyListeners.getInstance();
  
  // const screenManager = ScreenManager.getInstance();
  // screenManager.resetScreen();
  // var lines = process.stdout.getWindowSize()[1];
  // for(var i = 0; i < lines; i++) {
  //     console.log('\r\n');
  // }
  requestAnimationFrame(loop);


  // const centralBank = new GenericObject();
  // centralBank.setGraphic('x---------x');
  // centralBank.setGraphic('|B.Central|');
  // centralBank.setGraphic('x---------x');
  // screenManager.drawObject( centralBank,{x:1,y:1} );

  // process.stdin.on('keypress', (chunk, key) => {
  //     if(key.name === 'c'){
  //       process.exit();
  //     }
  //     screenManager.moveFocusObject(key.name);
  //   });

  // const person = new MovingObject({name:'person',focus:true});
  // person.setGraphic('o');
  // screenManager.drawObject(person,{x:12,y:2});

  // loop();
  // const fps = 1;
  // const initialDate = new Date();

  
  // let lastChange = initialDate.getTime();
  // let currentFrame = 1;
  // const durationFrame = 1000 / fps;
  // let firstTime = true;

  // while(true){
  //   const currentDate = new Date();
  //   const currentTime = currentDate.getTime();
  //   const delta = currentTime - lastChange;

  //   if(delta <= durationFrame || firstTime){
  //     continue;
  //   }

  //   firstTime = false;

  //   // process.stdin.on('keypress', (chunk, key) => {
  //   //   console.log('holis aquí')
  //   //   if(key.name === 'c'){
  //   //     process.exit();
  //   //   }
  //   //   screenManager.moveFocusObject(key.name);
  //   // });
  //   waitForUserInput();
    
  //   lastChange = currentTime;
  // }
}

module.exports.main = main;