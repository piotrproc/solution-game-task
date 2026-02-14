import { Container, Sprite, Text } from "pixi.js";
import { showTab } from "../utils.ts";
import { TASK_TEXTS } from "./consts.ts";
import { app } from "../../main.ts";

export function addTaskButtons(container: Container, onClick: (() => void)[]) {

    for (let i = 0; i < 3; i++) {
        const button = new Text({
            text: TASK_TEXTS[i],
            style: {
                fontSize: 30,
                fill: 0xffffff
            }
        });

        styleButtons(button, i);

        button.addListener('pointerdown', () => {
            onClick[i]();
        });

        container.addChild(button);
    }
}

function styleButtons(sprite: Text, index: number) {
    sprite.anchor.set(0.5);

    sprite.x = (app.screen.width / 4) * (index + 1);
    sprite.y = app.screen.height * (1 / 2);

    sprite.eventMode = 'static';
    sprite.cursor = 'pointer';
}

export function addBackButton(container: Container) {
    const button = Sprite.from("button-back");

    styleBackButton(button);

    button.addListener('pointerdown', () => {
        showTab(0);
        app.renderer.background.color = "#06a159";
    });

    container.addChild(button);
}

function styleBackButton(sprite: Sprite) {
    sprite.anchor.set(0.5);

    sprite.x = app.screen.width * 0.9;
    sprite.y = app.screen.height * (1 / 10);

    sprite.eventMode = 'static';
    sprite.cursor = 'pointer';
}