import { Application, Sprite, Ticker } from "pixi.js";
import { CARDS_IN_COLUMN } from "./card.ts";

export function animateCards(app:Application, cardsOnStacks: Sprite[][]) {
    moveAllCardsExceptOne(cardsOnStacks[0])
    moveAllCardsExceptOne(cardsOnStacks[1])
    moveAllCardsExceptOne(cardsOnStacks[2])

    createRotationAnimation(app, cardsOnStacks[0][CARDS_IN_COLUMN-1])
    createRotationAnimation(app, cardsOnStacks[1][CARDS_IN_COLUMN-1])
    createRotationAnimationLastColumn(app, cardsOnStacks[2][CARDS_IN_COLUMN-1])
}


export function moveAllCardsExceptOne(cards: Sprite[]) {
    cards.forEach((card) => {
        card.y += 10;
    })
}

export function createRotationAnimation(app:Application, sprite: Sprite) {
    sprite.zIndex = -1;

    let offsetX = 0;
    let offsetY = 0;

    const ticker = new Ticker();
    ticker.add(() => {
        if(offsetX < 300) {
            sprite.x += 10;
            offsetX += 10;
        }

        if(offsetY < 480) {
            sprite.y -= 15;
            offsetY += 15;
        }
    });
    ticker.start();

    setTimeout(function () {
        ticker.stop()
        sprite.rotation = 0;
    }, 2000)
}

export function createRotationAnimationLastColumn(app:Application, sprite: Sprite) {
    sprite.zIndex = -1;

    let offsetX = 0;
    let offsetY = 0;

    const ticker = new Ticker();
    ticker.add(() => {
        if(offsetX < 600) {
            sprite.x -= 10;
            offsetX += 10;
        }

        if(offsetY < 480) {
            sprite.y -= 8;
            offsetY += 8;
        }
    });
    ticker.start();

    setTimeout(function () {
        ticker.stop()
        sprite.rotation = 0;
    }, 2000)
}