const { debugJson } = require("../../debugjson");

class ScreenManager{
  screen = [];
  objectsInScreen = [];
  movementDirections = {
    UP : 'UP',
    DOWN : 'DOWN',
    RIGHT : 'RIGHT',
    LEFT : 'LEFT'
  }
  idtest = Date.now();

  static instance = null;
  static getInstance(){
    if(!ScreenManager.instance){
      ScreenManager.instance = new ScreenManager();
      ScreenManager.instance.screen = [...ScreenManager.instance.createBorder()]
    }

    return ScreenManager.instance;
  }

  isDirKey(key){
    return !key.toUpperCase ? false : Object.values(this.movementDirections).includes(key.toUpperCase())
  }

  spaceIsEmpty(from,to){
    
    const {x:realOriginX,y:realOriginY} = this.getRealCoordinates(from); 
    const {x:endX,y:endY} = this.getRealCoordinates(to); 
    
    let spaceIsEmpty = true;
    for(let indexy = realOriginY; indexy <= endY; indexy++){
      for(let indexx = realOriginX; indexx <= endX; indexx++){
        if(this.screen[indexy - 1][indexx - 1] !== undefined && this.screen[indexy - 1][indexx - 1] !== ' '){
          spaceIsEmpty = false;
        }
      }
    }

    return spaceIsEmpty;
  }

  getRealCoordinates(coordinates){
    const screenSize = this.getScreenSize();

    return {
      x : screenSize.forRealX(coordinates.x),
      y : screenSize.forRealY(coordinates.y)
    }
  }

  getBorderObject(object){
    return{
      x1 : object.positionInScreen.x - 1,
      y1 : object.positionInScreen.y - 1,
      x2 : object.positionInScreen.x + object.size.x + 1,
      y2 : object.positionInScreen.y + object.size.y + 1
    }
  }

  objectsNear(referenceObject){
    const referenceObjectBorders = this.getBorderObject(referenceObject);
    // console.log('objects',this.objectsInScreen);
    return this.objectsInScreen.filter(obIS => {
      return ![
        obIS.positionInScreen.x >= referenceObjectBorders.x1,
        obIS.positionInScreen.y >= referenceObjectBorders.y1,
        obIS.positionInScreen.x + obIS.size.x <= referenceObjectBorders.x2,
        obIS.positionInScreen.y + obIS.size.y <= referenceObjectBorders.y2
        && obIS.id !== referenceObject.id
      ].includes(false)
    })
  }

  removeObject(object){
    const {index} = this.getObjectInScreen(object.id);
    const realOrigin = this.getRealCoordinates(object.positionInScreen);
    
    const toCoordinates = {
      x : object.positionInScreen.x + object.size.x - 1,
      y : object.positionInScreen.y + object.size.y - 1
    }
    const realSize = this.getRealCoordinates(toCoordinates);

    object.positionInScreen = {x:0,y:0};

    if(object.inScreen){
      object.inScreen = false;
      this.objectsInScreen.splice(index,1);
      // delete this.objectsInScreen[index];
    }

    for(let indexy = realOrigin.y; indexy <= realSize.y; indexy++){
      for(let indexx = realOrigin.x; indexx <= realSize.x; indexx++){
        this.screen[indexy - 1][indexx - 1] = ' ';
      }
    }
  } 

  getFinalPosition(object,origin){
    return {
      x : origin.x + object.size.x - 1,
      y : origin.y + object.size.y - 1
    }
  }

  resetScreen(){
    // console.log('reset screen',this.objectsInScreen);
    this.screen = [...this.createBorder()];
    this.objectsInScreen.forEach(object => {
      if(object.onRemove){
        // console.log('remove in foreach',object.config.type)
        object.onRemove();
      }
    });
    this.objectsInScreen = [];
  }

  drawObject(object,originP){
    // console.log('draw object');
    const originInitial = originP || object.originalPosition;
    const realOrigin = this.getRealCoordinates(originInitial);
    
    const toCoordinates = this.getFinalPosition(object,originInitial);
    const realSize = this.getRealCoordinates(toCoordinates);

    const spaceIsEmpty = this.spaceIsEmpty(originInitial,toCoordinates)

    if(!spaceIsEmpty){
      return;
    }

    object.positionInScreen = originInitial;
    
    if(!object.inScreen){
      const tmpObjects = [...this.objectsInScreen]
      // console.log('push on objects')
      tmpObjects.push(object);
      this.objectsInScreen = [...tmpObjects];
    }

    let indexYInObject = 0;
    let indexXInObject = 0;

    const tmpScreen = [...this.screen];

    for(let indexy = realOrigin.y; indexy <= realSize.y; indexy++){
      indexXInObject = 0;
      
      for(let indexx = realOrigin.x; indexx <= realSize.x; indexx++){
        
        tmpScreen[indexy - 1][indexx - 1] = object.lines[indexYInObject][indexXInObject];

        indexXInObject++;
      }

      indexYInObject++;
    }

    this.screen = tmpScreen;
  }  

  getFocusObject(){
    let indexObject = -1;
    const object = this.objectsInScreen.find((objetcInt,index) => {
      if(objetcInt.config.focus){
        indexObject = index;
        return true;
      }
    });
    return {
      index : indexObject,
      object
    }
  }

  getObject(object){
    return !this.objectsInScreen.length ? false : this.objectsInScreen.find(objectInt => objectInt.id === object.id);
  }

  getObjectInScreen(objectId){
    const index = this.objectsInScreen.findIndex(objectInt => objectInt.id === objectId);

    return{
      object : this.objectsInScreen[index],
      index
    }
  }

  moveObject(object,direction,distance = 1){
    const directionDef = direction.toUpperCase();
    
    const nextPosition = {...object.positionInScreen};

    if(directionDef === this.movementDirections.RIGHT){
      nextPosition.x += distance;
    }

    if(directionDef === this.movementDirections.LEFT){
      nextPosition.x -= distance;
    }

    if(directionDef === this.movementDirections.UP){
      nextPosition.y -= distance;
    }

    if(directionDef === this.movementDirections.DOWN){
      nextPosition.y += distance;
    }
    // console.log('info',object,directionDef,nextPosition,distance)
    const spaceIsEmpty = this.spaceIsEmpty(nextPosition,this.getFinalPosition(object,nextPosition));

    if(!spaceIsEmpty){
      return ;
    }

    this.removeObject(object);
    this.drawObject(object,nextPosition,false);
  }

  moveFocusObject(direction,distance = 1){
    const {object:focusedObject,index:indexFocusedObject} = this.getFocusObject();
    const directionDef = direction.toUpperCase();
    
    const nextPosition = {...focusedObject.positionInScreen}
    if(directionDef === this.movementDirections.RIGHT){
      nextPosition.x += distance;
    }

    if(directionDef === this.movementDirections.LEFT){
      nextPosition.x -= distance;
    }

    if(directionDef === this.movementDirections.UP){
      nextPosition.y -= distance;
    }

    if(directionDef === this.movementDirections.DOWN){
      nextPosition.y += distance;
    }
    
    const spaceIsEmpty = this.spaceIsEmpty(nextPosition,this.getFinalPosition(focusedObject,nextPosition));

    if(!spaceIsEmpty){
      return ;
    }

    this.removeObject(focusedObject,focusedObject.positionInScreen,indexFocusedObject,false);
    this.drawObject(focusedObject,nextPosition,false);
  }

  getScreen(){
    return this.screen;
  }

  createBorder = () => {
    const screenSize = this.getScreenSize();
    // console.log('screen size',screenSize)
    const borderGraphics = [];
    
    borderGraphics.push(['']);
    borderGraphics.push([
      '',
      ...'-'.repeat(screenSize.width).split('')
    ])
  
    for(let i=1; i<=screenSize.height; i++){
      borderGraphics.push([
        '|',
        ...' '.repeat(screenSize.main).split(''),
        '|',
        ...' '.repeat((screenSize.width - screenSize.main) - 1).split(''),
        '|']
      )
    }
  
    // console.log(screenSize)
    
    borderGraphics.push([
      '',
      ...'-'.repeat(screenSize.width).split('')
    ])
  
    return borderGraphics
  }

  getScreenSize = (config = { 
    widthBorder:2,
    heightBorder:3,
    forRealY : (y) => y+2 ,
    forRealX : (x) => x+1,
    mainPercentage : 70
  }) => {
      const consoleColumns = process.stdout.columns;
      const consoleRows = process.stdout.rows;
      const width = consoleColumns - config.widthBorder;
      const height = consoleRows - config.heightBorder;
      const main = Math.floor( ( width * config.mainPercentage ) / 100 );
      const aside = width -  main;

      return {
          columns : consoleColumns,
          rows : consoleRows,
          width,
          height,
          forRealY : config.forRealY,
          forRealX : config.forRealX,
          main,
          aside
      }
  }

  resetAside(){
    const screenSize = this.getScreenSize();

    const distanceAside = screenSize.width - screenSize.main - 1;
    for(let y=screenSize.forRealY(1);y <= screenSize.height;y++){
      this.screen[y-1].splice(screenSize.main + 2,distanceAside,...' '.repeat(distanceAside).split(''));
    }
  }

  writeInAside(message,y){
    const screenSize = this.getScreenSize();
    let x = screenSize.forRealX(screenSize.main + 3) - 1;
    const realY = screenSize.forRealY(y) - 1;

    message.split('').slice(0,screenSize.aside - 3).forEach(char => {
      this.screen[realY][x] = char;
      x++;
    })
    // this.screen[screenSize.forRealY(y) - 1][screenSize.forRealX(screenSize.main + 2) - 1] = '1'
    //message.split('').slice(0,screenSize.aside));
  }
  
  printScreen(){
    const screenSize = this.getScreenSize();
    const tmpScreen = this.getScreen();
    // console.log('screen',tmpScreen)
    for(let y=1;y <= screenSize.rows;y++){
      let line = '';
      for(let x=1;x<=screenSize.columns;x++){
        line += tmpScreen[y-1] && tmpScreen[y-1][x-1] ? tmpScreen[y-1][x-1] : ' ';
      }
      
      process.stdout.cursorTo(0,y-1);
      process.stdout.write(line);
      
    }
    
    this.screen = tmpScreen;
  }
}

module.exports.ScreenManager = ScreenManager;