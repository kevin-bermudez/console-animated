const { KeyListeners } = require("../../core/listeners/KeyListeners");
const { GenericScene } = require("../../core/scenes/GenericScene");
const { ScenesManager } = require("../../core/scenes/ScenesManager");
const { ScreenManager } = require("../../core/screen/ScreenManager");
const { getObjectsByType, saveObject } = require("../../core/storage/generic-object-storage");
const { salableObjects, generatePricesList, currencySymbol, getSalableObjectTypes } = require("../objects/central-bank/central-bank-utils");
const { Exit } = require("../objects/Exit");
const { GoldOre } = require("../objects/GoldOre");
const { objectTypes } = require("../objects/object-contants");
const { Person } = require("../objects/Person");

class InBankCashRegister extends GenericScene{
  keyListenersId = null;
  pricesList = null;
  context = null;
  contextData = {};

  contextList = Object.freeze({
    MAIN_MENU : 'main menu',
    SELLABLE_OBJECTS_LIST : 'sellable objects list'
  })

  constructor(){
    super();

    this.context = this.contextList.MAIN_MENU;
    this.pricesList = generatePricesList();

    this.keyListenersId = KeyListeners.getInstance().registerListener(this.manageMovementKeys);
  }

  options = {
    1 : 'Vender',
    'e' : 'Salir'
  }

  printSellScreen(){
    this.contextData = {};
    this.context = this.contextList.SELLABLE_OBJECTS_LIST;
    ScreenManager.getInstance().resetScreen();
    const screenSize = ScreenManager.getInstance().getScreenSize();

    const personInScreen = ScreenManager.getInstance().objectsInScreen.find(object => object.config.type === objectTypes.PERSON);
    let personObjects = [];
    const salableObjects = getSalableObjectTypes();

    if(personInScreen){
      personObjects = personInScreen.data.pickableObjects.filter(object => salableObjects.includes(object.config.type));
    }

    const personInDb = getObjectsByType(objectTypes.PERSON);
    if(personInDb.length){
      personObjects = personInDb[0].data.pickableObjects.filter(object => salableObjects.includes(object.config.type));
    }
    
    this.contextData.personObjects = personObjects;

    let y = 1;

    if(personObjects.length){
      let x = 1;
      'Objetos'.split('').forEach(char => {
        ScreenManager.getInstance().screen[screenSize.forRealY(1) - 1][screenSize.forRealX(x) - 1] = char;
        x++;
      })
  
      x = 1;
      '-------'.split('').forEach(char => {
        ScreenManager.getInstance().screen[screenSize.forRealY(2) - 1][screenSize.forRealX(x) - 1] = char;
        x++;
      })

      y = 4;
      // const additionalInfo0 = personObjects[0].data.weight ? '(' + personObjects[0].data.weight + 'gr)' : '';
      // screenManager.writeInAside('- ' + personObjects[0].config.name + additionalInfo0,currentLine);
      // currentLine++;
      // console.log('person objects',personObjects)
      
      personObjects.forEach((object,index) => {
        const realY = screenSize.forRealY(y) - 1;
        const additionalInfo0 = object.data.units ? '(' + object.data.units + 'gr)' : '';
        const message = (index+1) + ' - ' + object.config.name + ' ' + additionalInfo0;
        
        let x = 1;
        message.split('').forEach(char => {
          ScreenManager.getInstance().screen[realY][x] = char;
          x++;
        })
        
        y++;
      })

      y++;
    }

    let x = 1;
    's - Menú principal'.split('').forEach(char => {
      ScreenManager.getInstance().screen[screenSize.forRealY(y) - 1][screenSize.forRealX(x) - 1] = char;
      x++;
    })
  }

  writeAside(){
    let currentLine = super.writeAside();
    const screenManager = ScreenManager.getInstance();

    currentLine++;
    screenManager.writeInAside('Precios',currentLine);
    currentLine++;

    Object.values(this.pricesList).forEach(price => {
      screenManager.writeInAside(`${price.type}: $${price.priceByUnit} x ${price.unit}`,currentLine);
    })
  }

  writeMenu(){
    this.context = this.contextList.MAIN_MENU;
    ScreenManager.getInstance().resetScreen();
    const screenSize = ScreenManager.getInstance().getScreenSize();

    let x = 1;
    'Menú de opciones caja'.split('').forEach(char => {
      ScreenManager.getInstance().screen[screenSize.forRealY(1) - 1][screenSize.forRealX(x) - 1] = char;
      x++;
    })


    x = 1;
    '---------------------'.split('').forEach(char => {
      ScreenManager.getInstance().screen[screenSize.forRealY(2) - 1][screenSize.forRealX(x) - 1] = char;
      x++;
    })

    let y = 4;
    
    Object.keys(this.options).forEach(optionKey => {
      const realY = screenSize.forRealY(y) - 1;
      let x = 1;

      `${optionKey} - ${this.options[optionKey]}`.split('').forEach(char => {
        ScreenManager.getInstance().screen[realY][x] = char;
        x++;
      })

      y++;
    })
  }

  init(){
    // const exit = new Exit({},1,1);
  
    // const centralBank = new BankCashRegister(1,exit.size.y + 3);

    // new Person(centralBank.size.x + 1,centralBank.positionInScreen.y);

    this.writeMenu();

    // if(!person.data.visited_gold_mine){
    //   new GoldOre(exit.size.x + 3,1,person);
    // }

    // person.data.visited_gold_mine = true;
  }

  sellObject(objectB){
    let personObject = getObjectsByType(objectTypes.PERSON);
    let centralBankObject = getObjectsByType(objectTypes.CENTRAL_BANK);

    if(!personObject.length || !centralBankObject.length){
      return;
    }

    personObject = personObject[0];
    centralBankObject = centralBankObject[0];

    const priceByUnit = this.pricesList[objectB.config.type].priceByUnit;
    const cashForSell = objectB.data.units * priceByUnit;

    let cash = personObject.data.cash ? personObject.data.cash : 0;
    cash += cashForSell;

    personObject.data.cash = cash;

    const indexObject = personObject.data.pickableObjects.findIndex(object => object.id === objectB.id);
    personObject.data.pickableObjects.splice(indexObject,1);

    saveObject(personObject.id,personObject.config,personObject.data);

    if(!centralBankObject.data.vault[objectB.config.type]){
      centralBankObject.data.vault[objectB.config.type]  = 0;
    }

    centralBankObject.data.vault[objectB.config.type]  += objectB.data.units;
    saveObject(centralBankObject.id,centralBankObject.config,centralBankObject.data);
  }

  manageMovementKeys = (key) => {
    if(key.name === '1' && this.context === this.contextList.MAIN_MENU){
      this.printSellScreen();
      return;
    }

    if(key.name === 'e' && this.context === this.contextList.MAIN_MENU){
      const scenesManager = ScenesManager.getInstance();
      scenesManager.changeScene(ScenesManager.prevSceneTag);
      return;
    }

    if(this.context === this.contextList.SELLABLE_OBJECTS_LIST && !isNaN(parseInt(key.name))){
      this.sellObject(this.contextData.personObjects[parseInt(key.name) - 1]);
      return;
    }

    if(this.context === this.contextList.SELLABLE_OBJECTS_LIST && key.name === 's'){
      this.writeMenu();
      return;
    }
  }

  onRemove(){
    KeyListeners.getInstance().removeListener(this.keyListenersId);    
  }
}

module.exports.InBankCashRegister = InBankCashRegister;