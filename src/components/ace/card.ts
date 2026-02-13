import { Application, Container, Sprite } from "pixi.js";
import { CARD_HEIGHT, CARD_WIDTH, CARDS_IN_COLUMN, NUMBER_OF_CARDS } from "./consts.ts";

export function createCards(app: Application, mainPage: Container) {
    const cards:Sprite[][] = [[], [], []];

    for (let i = 0; i < NUMBER_OF_CARDS; i++) {
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

    card.x =  (app.screen.width / 4) * (columnIndex + 1);
    card.y = app.screen.height * (1 / 3) + (10 * (index % CARDS_IN_COLUMN));

    card.width = CARD_WIDTH;
    card.height = CARD_HEIGHT;

    card.eventMode = 'static';
    card.cursor = 'pointer';
}