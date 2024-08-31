const { main } = require("./core/main");

const { ScreenManager } = require("./core/screen/ScreenManager");
const { CentralBank } = require("./game/objects/CentralBank");
const { Mine } = require("./game/objects/Mine");
const { Person } = require("./game/objects/Person");

main();

const mine = new Mine({},1,1);
new CentralBank({},1,mine.size.y+2);
new Person({},mine.size.x+1,1);

const screenManager = ScreenManager.getInstance();

