const { KeyListeners } = require('./listeners/KeyListeners');
const { createBorder } = require('./screen/create-border');
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

  const screenManager = ScreenManager.getInstance();

  configGame.lastChange = time;
  configGame.currentFrame++;

  screenManager.printScreen();

  requestAnimationFrame(loop);
}

const requestAnimationFrame = (f) => {
  setImmediate(()=>f(Date.now()))
}

const main = (configGameP = {
  fps : 60,
  currentFrame : 1
}) => {
  let configGame = {
    ...configGameP,
    durationFrame : 1000 / configGameP.fps
  };

  cursor.hide();
  KeyListeners.getInstance();
  const screenManager = ScreenManager.getInstance();

  screenManager.screen = [...createBorder()];
  
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

  // screenManager.printScreen();
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
  //   // screenManager.printScreen();
  // }
}

module.exports.main = main;