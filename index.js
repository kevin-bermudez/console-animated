const { main } = require("./core/main");

const { ScreenManager } = require("./core/screen/ScreenManager");
const { CentralBank } = require("./game/objects/CentralBank");
const { Person } = require("./game/objects/Person");

main();

const centralBank = new CentralBank();

const person = new Person();
person.setGraphic('o');

const screenManager = ScreenManager.getInstance();
screenManager.drawObject(person,{x:12,y:1});

