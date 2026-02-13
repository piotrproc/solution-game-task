import { Application, Sprite, Ticker } from "pixi.js";
import { CARDS_IN_COLUMN, DECK_HEIGHT, ROUND_TIME } from "./consts.ts";

export function animateCardsInLoop(app: Application, cardsOnStacks: Sprite[][]) {
    for (let i = 0; i < 10; i++) {
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

    createShuffleAnimation(app, lastElement1, 0);
    createShuffleAnimation(app, lastElement2, 1);
    createShuffleAnimation(app, lastElement3, 2);

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

export function createShuffleAnimation(app: Application, sprite: Sprite, stackIndex: number) {
    const moveOneColumn = stackIndex === 0 || stackIndex === 1;
    sprite.zIndex = moveOneColumn ? (stackIndex * 2 + 1) : -1;

    let offsetX = 0;
    let offsetY = 0;

    const ticker = new Ticker();
    ticker.maxFPS = 50; // ensures the animation runs for 2 seconds

    let flagX = false;
    let flagY = false;

    ticker.add(() => {
        const numberOfColumns = moveOneColumn ? 1 : 2;

        if (offsetX < app.screen.width / 4 * numberOfColumns) {
            const animationOffset = app.screen.width / 400 * numberOfColumns;
            sprite.x = moveOneColumn ? (sprite.x + animationOffset) : (sprite.x - animationOffset);
            offsetX += animationOffset;
        } else {
            flagX = true;
        }

        if (offsetY < DECK_HEIGHT) {
            sprite.y -= DECK_HEIGHT / CARDS_IN_COLUMN / 2;
            offsetY += DECK_HEIGHT / CARDS_IN_COLUMN / 2;
        } else {
            flagY = true;
        }

        if (flagX && flagY) {
            ticker.stop();
        }
    });
    ticker.start();
}