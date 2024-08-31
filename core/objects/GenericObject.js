class GenericObject{
  lines = [];
  size = { x:0,y:0 }
  positionInScreen = {x:0,y:0}
  inScreen = false;
  config = {
    name : ''
  }

  constructor(config = {}){
    this.config = config;
  }

  setGraphic(content){
    this.lines.push(content.split(''));
    this.size.y++;
    
    if(content.length > this.size.x){
      this.size.x = content.length;
    }
  }
}

module.exports.GenericObject = GenericObject;