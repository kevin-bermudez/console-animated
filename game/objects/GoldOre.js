const { PickableObject } = require('../../core/objects/PickableObject');

class GoldOre extends PickableObject{
  completedPercentage = 100;

  constructor(config = {},x,y){
    super(config,{
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