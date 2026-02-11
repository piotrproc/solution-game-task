import { Application, Sprite, Ticker } from "pixi.js";
import { SHIFT_ANIMATION_TIME, CARDS_IN_COLUMN, DECK_HEIGHT, ROUND_TIME } from "./globalVariables/consts.ts";

export function animateCardsInLoop(app: Application, cardsOnStacks: Sprite[][]) {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            animateCards(app, cardsOnStacks);
        }, i * ROUND_TIME);
    }
}

export function animateCards(app: Application, cardsOnStacks: Sprite[][]) {
    moveAllCardsExceptOne(cardsOnStacks[0], 0)
    moveAllCardsExceptOne(cardsOnStacks[1], 1)
    moveAllCardsExceptOne(cardsOnStacks[2], 2)

    const lastElement1 = cardsOnStacks[0].pop() as Sprite;
    const lastElement2 = cardsOnStacks[1].pop() as Sprite;
    const lastElement3 = cardsOnStacks[2].pop() as Sprite;

    createRotationAnimation(app, lastElement1, 0);
    createRotationAnimation(app, lastElement2, 1);
    createRotationAnimationLastColumn(app, lastElement3);

    cardsOnStacks[0].unshift(lastElement3);
    cardsOnStacks[1].unshift(lastElement1);
    cardsOnStacks[2].unshift(lastElement2);
}


export function moveAllCardsExceptOne(cards: Sprite[], stackIndex: number) {
    cards.forEach((card) => {
        card.y += 10;
        card.zIndex = stackIndex * 2;
    })
}

export function createRotationAnimation(app: Application, sprite: Sprite, stackIndex:number) {
    sprite.zIndex = stackIndex * 2 + 1;

    let offsetX = 0;
    let offsetY = 0;

    const ticker = new Ticker();

    ticker.add(() => {
        if (offsetX < app.screen.width / 4) {
            sprite.x += app.screen.width / 400;
            offsetX += app.screen.width / 400;
        }

        if (offsetY < DECK_HEIGHT) {
            sprite.y -= DECK_HEIGHT / CARDS_IN_COLUMN / 2;
            offsetY += DECK_HEIGHT / CARDS_IN_COLUMN / 2;
        }
    });
    ticker.start();

    setTimeout(function () {
        ticker.stop()
    }, SHIFT_ANIMATION_TIME)
}

export function createRotationAnimationLastColumn(app: Application, sprite: Sprite) {
    sprite.zIndex = -1;

    let offsetX = 0;
    let offsetY = 0;

    const ticker = new Ticker();
    ticker.add(() => {
        if (offsetX < app.screen.width / 2) {
            sprite.x -= app.screen.width / 400 * 2;
            offsetX += app.screen.width / 400 * 2;
        }

        if (offsetY < DECK_HEIGHT) {
            sprite.y -= DECK_HEIGHT / CARDS_IN_COLUMN / 2;
            offsetY += DECK_HEIGHT / CARDS_IN_COLUMN / 2;
        }
    });
    ticker.start();

    setTimeout(function () {
        ticker.stop()
    }, SHIFT_ANIMATION_TIME)
}