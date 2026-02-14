import { Application, Assets, Container, isMobile } from 'pixi.js';
import { addFpsInfo, addMainPageTitle } from "./components/gui/texts.ts";
import { createCards } from "./components/ace/card.ts";
import { animateCardsInLoop } from "./components/ace/animate.ts";
import { addBackButton, addTaskButtons } from "./components/gui/lobby.ts";
import { getDialogueFromUrl } from "./components/magic/getDialogue.ts";
import { MAGIC_DIALOGUE_URL } from "./components/magic/consts.ts";
import { createParticles } from "./components/phoenix/particles.ts";
import { showTab } from "./components/utils.ts";
import { INITIAL_SCREEN_SIZE_Y } from "./components/states.ts";
import { resize } from "./components/gui/resize.ts";

export const app = new Application();

(async () => {
    globalThis.__PIXI_APP__ = app;

    await app.init({
        background: "#06a159",
        width: window.innerWidth,
        height: window.innerHeight,
    });

    INITIAL_SCREEN_SIZE_Y.value = window.innerHeight;

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);

    window.addEventListener('resize', resize);

    resize();

    if (isMobile.any) {
        window.screen.orientation['lock']('portrait');
    }

    window.addEventListener("orientationchange", () => {
        window.location.reload();
        window.screen.orientation['lock']('portrait');
    });

    // Load the textures
    await Assets.load([
        {alias: "button-back", src: "assets/button-back.png"},
        {alias: "card", src: "assets/card-reverse.png"},
        {alias: "fire", src: "assets/fire.png"},
        {alias: "emoji-sad", src: 'https://api.dicebear.com/9.x/fun-emoji/png?seed=Sad', parser: 'loadTextures'},
        {alias: "emoji-intrigued", src: 'https://api.dicebear.com/9.x/fun-emoji/png?seed=Sawyer', parser: 'loadTextures'},
        {alias: "emoji-neutral", src: 'https://api.dicebear.com/9.x/fun-emoji/png?seed=Destiny', parser: 'loadTextures'},
        {alias: "emoji-satisfied", src: 'https://api.dicebear.com/9.x/fun-emoji/png?seed=Jocelyn', parser: 'loadTextures'},
        {alias: "emoji-laughing", src: 'https://api.dicebear.com/9.x/fun-emoji/png?seed=Sophia', parser: 'loadTextures'},
        {alias: "user-sheldon", src: 'https://api.dicebear.com/9.x/personas/png?body=squared&clothingColor=6dbb58&eyes=open&hair=buzzcut&hairColor=6c4545&mouth=smirk&nose=smallRound&skinColor=e5a07e', parser: 'loadTextures'},
        {alias: "user-leonard", src: 'https://api.dicebear.com/9.x/personas/png?body=checkered&clothingColor=f3b63a&eyes=glasses&hair=shortCombover&hairColor=362c47&mouth=surprise&nose=mediumRound&skinColor=d78774', parser: 'loadTextures'},
        {alias: "user-penny", src: 'https://api.dicebear.com/9.x/personas/png?body=squared&clothingColor=f55d81&eyes=happy&hair=extraLong&hairColor=f29c65&mouth=smile&nose=smallRound&skinColor=e5a07e', parser: 'loadTextures'},
        {alias: "user-neighbour", src: 'https://api.dicebear.com/9.x/personas/png', parser: 'loadTextures'},
    ]);

    const mainPage = new Container();
    const acePage = new Container();
    const magicPage = new Container();
    const phoenixPage = new Container();

    addMainPageTitle(mainPage, "Assignment");
    addMainPageTitle(acePage, "Ace of Shadows");
    addMainPageTitle(magicPage, "Magic Words");
    addMainPageTitle(phoenixPage, "Phoenix Flame");

    addTaskButtons(mainPage, [() => {
            showTab(1);

            const cards = createCards(acePage);
            animateCardsInLoop(cards);
        },
        () => {
            showTab(2);

            getDialogueFromUrl(magicPage, MAGIC_DIALOGUE_URL)
        },
        () => {
            showTab(3);
            app.renderer.background.color = "#40cbde";

            createParticles(phoenixPage);
        }
    ])

    acePage.visible = false;
    mainPage.visible = true;

    app.stage.addChild(mainPage);
    app.stage.addChild(acePage);
    app.stage.addChild(magicPage);
    app.stage.addChild(phoenixPage);

    showTab(0);

    addBackButton(app.stage);
    addFpsInfo(app.ticker, app.stage, {x:10, y:10}, "FPS:");
})();
