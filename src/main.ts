import { Application, Assets, Container } from 'pixi.js';
import { addMainPageTitle } from "./components/gui/texts.ts";
import { gameState } from "./components/globalVariables/states.ts";
import { createCards } from "./components/card.ts";
import { animateCardsInLoop } from "./components/animate.ts";
import { addButtons } from "./components/gui/lobby.ts";

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
    const acePage = new Container();

    addMainPageTitle(app, mainPage, "Game Development Assignment");
    addMainPageTitle(app, acePage, "Ace of Shadows");

    const cards = createCards(app, acePage);
    animateCardsInLoop(app, cards);

    addButtons(app, mainPage)

    acePage.visible = false;
    mainPage.visible = true;

    app.stage.addChild(acePage);
    app.stage.addChild(mainPage);

    // playButton.addListener('pointerdown', () => {
    //     console.log("Hello World")
    // });
})();
