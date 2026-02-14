import { Container, Sprite } from "pixi.js";
import { CARD_HEIGHT, CARD_WIDTH, CARDS_IN_COLUMN, NUMBER_OF_CARDS } from "./consts.ts";
import { app } from "../../main.ts";

export function createCards(mainPage: Container) {
    const cards:Sprite[][] = [[], [], []];

    for (let i = 0; i < NUMBER_OF_CARDS; i++) {
        const cardIndex = Math.floor(i / CARDS_IN_COLUMN);
        cards[cardIndex].push(createCard(mainPage, i));
    }

    return cards;
}

function createCard(mainPage:Container, index: number) {
    const card = Sprite.from("card");
    styleCard(card, index);

    mainPage.addChild(card);
    return card;
}

function styleCard(card: Sprite, index: number) {
    card.anchor.set(0.5);

    const columnIndex = Math.floor(index / CARDS_IN_COLUMN);

    card.x =  (app.screen.width / 4) * (columnIndex + 1);
    card.y = app.screen.height * (1 / 3) + (10 * (index % CARDS_IN_COLUMN));

    card.width = CARD_WIDTH;
    card.height = CARD_HEIGHT;

    card.eventMode = 'static';
    card.cursor = 'pointer';
}