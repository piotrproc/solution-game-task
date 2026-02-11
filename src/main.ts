import { Application, Assets, Container } from 'pixi.js';
import { addMainPageTitle } from "./components/gui/texts.ts";
import { gameState } from "./components/globalVariables/states.ts";
import { createCards } from "./components/card.ts";
import { animateCards } from "./components/animate.ts";

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
        {alias: "card", src: "assets/card-reverse.png"}
    ]);

    gameState.value = "Initial";

    const mainPage = new Container();

    addMainPageTitle(app, mainPage, "Main game Screen");
    const cards = createCards(app, mainPage);

    animateCards(app, cards);


    mainPage.visible = true;
    app.stage.addChild(mainPage);

    console.log(mainPage);
    // playButton.addListener('pointerdown', () => {
    //     console.log("Hello World")
    // });
})();
