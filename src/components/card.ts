import { Application, Container, Sprite } from "pixi.js";

export function createCards(app: Application, mainPage: Container) {
    for (let i = 0; i < 12; i++) {
        createCard(app, mainPage, i)
    }
}

function createCard(app: Application, mainPage:Container, index: number) {
    const card = Sprite.from("card");
    styleCard(app, card, index);

    mainPage.addChild(card);
    return card;
}

function styleCard(app: Application, card: Sprite, index: number) {
    card.anchor.set(0.5);

    card.x = app.screen.width / 5 + (7 * index);
    card.y = app.screen.height * (2 / 6) + (10 * index);

    card.width = 140;
    card.height = 200;

    card.eventMode = 'static';
    card.cursor = 'pointer';
}