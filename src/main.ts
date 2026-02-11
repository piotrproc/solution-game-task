import { Application, Assets, Container } from 'pixi.js';
import { addPlayButtons } from "./components/gui/playButton.ts";
import { addMainPageTitle } from "./components/gui/texts.ts";
import { gameState } from "./components/globalVariables/states.ts";

(async () => {
    const app = new Application();

    globalThis.__PIXI_APP__ = app;

    await app.init({
        background: "#06a159",
        height: 1050,
        width: 1200,
    });

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);

    // Load the textures
    await Assets.load([
        {alias: "playButton", src: "assets/play-button-on.png"},
        {alias: "playButtonOff", src: "assets/play-button-off.png"},
        {alias: "chest", src: "assets/treasure-chest.png"},
        {alias: "chestOff", src: "assets/treasure-chest-off.png"},
        {alias: "chestWin", src: "assets/treasure-chest-win.png"},
        {alias: "chestBonus", src: "assets/treasure-chest-bonus.png"},
        {alias: "heart", src: "assets/heart.png"}
    ]);

    gameState.value = "Initial";

    const mainPage = new Container();

    addMainPageTitle(app, mainPage, "Main game Screen");
    const {playButton} = addPlayButtons(app, mainPage);

    mainPage.visible = true;

    app.stage.addChild(mainPage);

    playButton.addListener('pointerdown', () => {
        console.log("Hello World")
    });
})();
