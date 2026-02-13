import { Application, Assets, Container } from 'pixi.js';
import { addFpsInfo, addMainPageTitle } from "./components/gui/texts.ts";
import { createCards } from "./components/ace/card.ts";
import { animateCardsInLoop } from "./components/ace/animate.ts";
import { addBackButton, addTaskButtons } from "./components/gui/lobby.ts";
import { getDialogueFromUrl } from "./components/magic/getDialogue.ts";
import { MAGIC_DIALOGUE_URL } from "./components/magic/consts.ts";
import { createParticles } from "./components/phoenix/particles.ts";
import { hideAllTabs } from "./components/utils.ts";

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
        {alias: "button-back", src: "assets/button-back.png"},
        {alias: "card", src: "assets/card-reverse.png"},
        {alias: "fire", src: "assets/fire.png"},
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

    const mainPage = new Container();
    const acePage = new Container();
    const magicPage = new Container();
    const phoenixPage = new Container();

    addMainPageTitle(app, mainPage, "Game Development Assignment");
    addMainPageTitle(app, acePage, "Ace of Shadows");
    addMainPageTitle(app, magicPage, "Magic Words");
    addMainPageTitle(app, phoenixPage, "Phoenix Flame");

    addTaskButtons(app, mainPage, [() => {
            hideAllTabs(app);
            app.stage.children[1].visible = true;

            const cards = createCards(app, acePage);
            animateCardsInLoop(app, cards);
        },
        () => {
            hideAllTabs(app);
            app.stage.children[2].visible = true;

            getDialogueFromUrl(app, magicPage, MAGIC_DIALOGUE_URL)
        },
        () => {
            hideAllTabs(app);
            app.stage.children[3].visible = true;
            app.renderer.background.color = "#40cbde";

            createParticles(app, phoenixPage);
        }
    ])

    acePage.visible = false;
    mainPage.visible = true;

    app.stage.addChild(mainPage);
    app.stage.addChild(acePage);
    app.stage.addChild(magicPage);
    app.stage.addChild(phoenixPage);

    hideAllTabs(app);
    app.stage.children[0].visible = true;

    addBackButton(app, app.stage);
    addFpsInfo(app, app.stage);
})();
