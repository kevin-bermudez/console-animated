const { getScreenSize } = require("../../utils/screen");

class ScreenManager{
  screen = [];
  objectsInScreen = [];
  movementDirections = {
    UP : 'UP',
    DOWN : 'DOWN',
    RIGHT : 'RIGHT',
    LEFT : 'LEFT'
  }

  static instance = null;
  static getInstance(){
    if(!ScreenManager.instance){
      ScreenManager.instance = new ScreenManager();
    }

    return ScreenManager.instance;
  }

  isDirKey(key){
    return Object.values(this.movementDirections).includes(key.toUpperCase())
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
    const screenSize = getScreenSize();

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
      delete this.objectsInScreen[index];
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

  drawObject(object,originP){
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
      this.objectsInScreen.push(object);
    }

    let indexYInObject = 0;
    let indexXInObject = 0;

    for(let indexy = realOrigin.y; indexy <= realSize.y; indexy++){
      indexXInObject = 0;
      
      for(let indexx = realOrigin.x; indexx <= realSize.x; indexx++){
        
        this.screen[indexy - 1][indexx - 1] = object.lines[indexYInObject][indexXInObject];

        indexXInObject++;
      }

      indexYInObject++;
    }
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
    return this.objectsInScreen.find(objectInt => objectInt.id === object.id);
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
    // this.printScreen();
  }

  printScreen(){
    // process.stdout.clearLine(1);// <<--here
    // process.stdout.cursorTo(0,);

    const screenSize = getScreenSize();

    for(let y=1;y <= screenSize.rows;y++){
      let line = '';
      for(let x=1;x<=screenSize.columns;x++){
        line += this.screen[y-1] && this.screen[y-1][x-1] ? this.screen[y-1][x-1] : ' ';
      }

      process.stdout.cursorTo(0,y-1);
      process.stdout.write(line);
    
    }
  }
}

module.exports.ScreenManager = ScreenManager;