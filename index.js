const { main } = require("./core/main");
const { ScenesManager } = require("./core/scenes/ScenesManager");
const { ScreenManager } = require("./core/screen/ScreenManager");
const { InitialScene } = require("./game/scenes/InitialScene");
const { InMine } = require("./game/scenes/InMine");

main();

// const initialScene = new InitialScene();
// initialScene.init();

ScenesManager.getInstance().changeScene(InitialScene);

/*
 ---
| o |
 ---
*/