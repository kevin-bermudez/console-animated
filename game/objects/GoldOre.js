const { PickableObject } = require('../../core/objects/PickableObject');
const { generateRandomInt } = require('../../utils/random-data');
const { Person } = require('./Person');

class GoldOre extends PickableObject{
  completedPercentage = 100;
  weight = generateRandomInt(1,1000);

  constructor(config = {},x,y){
    super({...config,name:'Mena oro'},{
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
      pickerObject : Person.getInstance({},0,0,true)
    });

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
      this.completedPercentage -= 20;
      this.canTake = this.completedPercentage <= 0 ? true : false;
      // console.log('info after picaso',this.completedPercentage,this.canTake)
    }
  }
}

module.exports.GoldOre = GoldOre;