import { Application, Assets, Container } from 'pixi.js';
import { addMainPageTitle } from "./components/gui/texts.ts";
import { gameState } from "./components/ace/globalVariables/states.ts";
import { createCards } from "./components/ace/card.ts";
import { animateCardsInLoop } from "./components/ace/animate.ts";
import { addButtons } from "./components/gui/lobby.ts";
import { getDialogueFromUrl } from "./components/magic/getUrl/dialogue.ts";
import { MAGIC_DIALOGUE_URL } from "./components/magic/globalVariables/consts.ts";

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
        {alias: "card", src: "assets/card-reverse.png"},
        {alias: "emoji-sad", src: 'https://api.dicebear.com/9.x/fun-emoji/png?seed=Sad', loadParser: 'loadTextures'},
        {alias: "emoji-intrigued", src: 'https://api.dicebear.com/9.x/fun-emoji/png?seed=Sawyer', loadParser: 'loadTextures'},
        {alias: "emoji-neutral", src: 'https://api.dicebear.com/9.x/fun-emoji/png?seed=Destiny', loadParser: 'loadTextures'},
        {alias: "emoji-satisfied", src: 'https://api.dicebear.com/9.x/fun-emoji/png?seed=Jocelyn', loadParser: 'loadTextures'},
        {alias: "emoji-laughing", src: 'https://api.dicebear.com/9.x/fun-emoji/png?seed=Sophia', loadParser: 'loadTextures'},
        {alias: "user-sheldon", src: 'https://api.dicebear.com/9.x/personas/png?body=squared&clothingColor=6dbb58&eyes=open&hair=buzzcut&hairColor=6c4545&mouth=smirk&nose=smallRound&skinColor=e5a07e', loadParser: 'loadTextures'},
        {alias: "user-leonard", src: 'https://api.dicebear.com/9.x/personas/png?body=checkered&clothingColor=f3b63a&eyes=glasses&hair=shortCombover&hairColor=362c47&mouth=surprise&nose=mediumRound&skinColor=d78774', loadParser: 'loadTextures'},
        {alias: "user-penny", src: 'https://api.dicebear.com/9.x/personas/png?body=squared&clothingColor=f55d81&eyes=happy&hair=extraLong&hairColor=f29c65&mouth=smile&nose=smallRound&skinColor=e5a07e', loadParser: 'loadTextures'},
        {alias: "user-neighbour", src: 'https://api.dicebear.com/9.x/personas/png', loadParser: 'loadTextures'},
    ]);

    gameState.value = "Initial";

    const mainPage = new Container();
    const acePage = new Container();
    const magicPage = new Container();

    addMainPageTitle(app, mainPage, "Game Development Assignment");
    addMainPageTitle(app, acePage, "Ace of Shadows");
    addMainPageTitle(app, magicPage, "Magic Words");

    addButtons(app, mainPage, [() => {
            app.stage.children[0].visible = false;
            app.stage.children[1].visible = true;
            app.stage.children[2].visible = false;

            const cards = createCards(app, acePage);
            animateCardsInLoop(app, cards);
        },
        () => {
            app.stage.children[0].visible = false;
            app.stage.children[1].visible = false;
            app.stage.children[2].visible = true;

            getDialogueFromUrl(magicPage, MAGIC_DIALOGUE_URL)
        },
        () => {
            app.stage.children[0].visible = !app.stage.children[0].visible;
            app.stage.children[1].visible = !app.stage.children[1].visible;
            app.stage.children[2].visible = !app.stage.children[2].visible;

            const cards = createCards(app, acePage);
            animateCardsInLoop(app, cards);
        }
    ])

    acePage.visible = false;
    mainPage.visible = true;

    app.stage.addChild(mainPage);
    app.stage.addChild(acePage);
    app.stage.addChild(magicPage);

    app.stage.children[0].visible = true;
    app.stage.children[1].visible = false;
    app.stage.children[2].visible = false;
})();
