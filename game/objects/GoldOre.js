const { PickableObject } = require('../../core/objects/PickableObject');
const { generateRandomInt } = require('../../utils/random-data');
const { Person } = require('./Person');

class GoldOre extends PickableObject{
  constructor(x,y){
    super({
      type:'GoldOre',name:'Mena oro'
      },
      {
        weight: generateRandomInt(1,1000),
        completed_percentage : 100
      }  
      ,
      {
      x,
      y,
      awayGraphic : [
        'x---x',
        '| o |',
        'x---x',
        '====='
      ],
      nearbyGraphic : [
        'x---x',
        '| 2 |',
        'x---x',
        'Picar'
      ],
      pickerObject : new Person(1,1),
    }
  );

    this.setGraphic(' ---');
    this.setGraphic('| o |');
    this.setGraphic(' ---');

    this.draw();

    this.registerPrevPickListener(this.chop);
  }

  chop = (key) =>{
    // console.log('try to pick')
    if(
      key.name === PickableObject.takeKey && 
      this.status === PickableObject.statusesList.NEARBY
    ){
      // console.log('picaso')
      this.data.completed_percentage -= 20;
      this.canTake = this.data.completed_percentage <= 0 ? true : false;
      // console.log('info after picaso',this.data.completed_percentage,this.canTake)
    }
  }
}

module.exports.GoldOre = GoldOre;