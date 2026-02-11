import { Application, Sprite, Ticker } from "pixi.js";
import { ACE_ANIMATION_TIME, DECK_HEIGHT } from "./globalVariables/consts.ts";

export function animateCardsInLoop(app: Application, cardsOnStacks: Sprite[][]) {
    for(let i = 0; i < 5; i++) {
        animateCards(app, cardsOnStacks);
    }
}

export function animateCards(app: Application, cardsOnStacks: Sprite[][]) {
    moveAllCardsExceptOne(cardsOnStacks[0])
    moveAllCardsExceptOne(cardsOnStacks[1])
    moveAllCardsExceptOne(cardsOnStacks[2])

    const lastElement1 = cardsOnStacks[0].pop() as Sprite;
    const lastElement2 = cardsOnStacks[1].pop() as Sprite;
    const lastElement3 = cardsOnStacks[2].pop() as Sprite;

    createRotationAnimation(app, lastElement1);
    createRotationAnimation(app, lastElement2);
    createRotationAnimationLastColumn(app, lastElement3);

    // console.log(lastElement3)
    // lastElement3.visible = false
    // cardsOnStacks[0].pop();
    cardsOnStacks[0].unshift(lastElement3);
    // cardsOnStacks[1].pop();
    cardsOnStacks[1].unshift(lastElement1);
    // cardsOnStacks[2].pop();
    cardsOnStacks[2].unshift(lastElement2);
}


export function moveAllCardsExceptOne(cards: Sprite[]) {
    cards.forEach((card) => {
        card.y += 10;
    })
}

export function createRotationAnimation(app: Application, sprite: Sprite) {
    sprite.zIndex = -1;

    let offsetX = 0;
    let offsetY = 0;

    const ticker = new Ticker();
    ticker.add(() => {
        if (offsetX < app.screen.width / 4) {
            sprite.x += 10;
            offsetX += 10;
        }

        if (offsetY < DECK_HEIGHT) {
            sprite.y -= 15;
            offsetY += 15;
        }
    });
    ticker.start();

    setTimeout(function () {
        ticker.stop()
    }, ACE_ANIMATION_TIME)
}

export function createRotationAnimationLastColumn(app: Application, sprite: Sprite) {
    sprite.zIndex = -1;

    let offsetX = 0;
    let offsetY = 0;

    const ticker = new Ticker();
    ticker.add(() => {
        if (offsetX < app.screen.width / 2) {
            sprite.x -= 10;
            offsetX += 10;
        }

        if (offsetY < DECK_HEIGHT) {
            sprite.y -= 8;
            offsetY += 8;
        }
    });
    ticker.start();

    setTimeout(function () {
        ticker.stop()
    }, ACE_ANIMATION_TIME)
}