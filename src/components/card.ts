import { Application, Container, Sprite } from "pixi.js";

export const CARDS_IN_COLUMN = 48;

export function createCards(app: Application, mainPage: Container) {
    const cards:Sprite[][] = [[], [], []];

    for (let i = 0; i < 144; i++) {
        const cardIndex = Math.floor(i / CARDS_IN_COLUMN);
        cards[cardIndex].push(createCard(app, mainPage, i));
    }

    return cards;
}

function createCard(app: Application, mainPage:Container, index: number) {
    const card = Sprite.from("card");
    styleCard(app, card, index);

    mainPage.addChild(card);
    return card;
}

function styleCard(app: Application, card: Sprite, index: number) {
    card.anchor.set(0.5);

    const columnIndex = Math.floor(index / CARDS_IN_COLUMN);
    const columnOffset = columnIndex * 300;

    card.x = app.screen.width / 4 + columnOffset;
    card.y = app.screen.height * (2 / 6) + (10 * (index % CARDS_IN_COLUMN));

    card.width = 140;
    card.height = 200;

    card.eventMode = 'static';
    card.cursor = 'pointer';
}