import { Application, Container, Sprite, Text } from "pixi.js";
import { hideAllTabs } from "../utils.ts";

export function addTaskButtons(app: Application, container: Container, onClick: (() => void)[]) {

    const TEXTS = [
        "First assigment",
        "Second assigment",
        "Third assigment"
    ];

    for (let i = 0; i < 3; i++) {
        const button = new Text({
            text: TEXTS[i],
            style: {
                fontSize: 30,
                fill: 0xffffff
            }
        });

        styleButtons(app, button, i);

        button.addListener('pointerdown', () => {
            onClick[i]();
        });

        container.addChild(button);
    }
}

function styleButtons(app: Application, sprite: Text, index: number) {
    sprite.anchor.set(0.5);

    sprite.x = (app.screen.width / 5) + (index * 350);
    sprite.y = app.screen.height * (1 / 2);

    sprite.eventMode = 'static';
    sprite.cursor = 'pointer';
}

export function addBackButton(app: Application, container: Container) {
    const button = Sprite.from("button-back");

    styleBackButton(app, button);

    button.addListener('pointerdown', () => {
        hideAllTabs(app);
        app.stage.children[0].visible = true;
        app.renderer.background.color = "#06a159";
    });

    container.addChild(button);
}

function styleBackButton(app: Application, sprite: Sprite) {
    sprite.anchor.set(0.5);

    sprite.x = app.screen.width * 0.9;
    sprite.y = app.screen.height * (1 / 10);

    sprite.eventMode = 'static';
    sprite.cursor = 'pointer';
}