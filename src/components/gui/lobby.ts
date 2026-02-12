import { Application, Container, Text } from "pixi.js";

export function addButtons(app: Application, container: Container, onClick: (() => void)[]) {

    const TEXTS = [
        "First assigment",
        "Second assigment",
        "Third assigment"
    ];

    for (let i = 0; i < 3; i++) {
        const button = new Text({
            text: TEXTS[i],
            style: {
                fontSize: 30
            }
        });

        styleButtons(app, button, i);

        button.addListener('pointerdown', () => {
            onClick[i]();
        });

        container.addChild(button);
    }
}


export function styleButtons(app: Application, sprite: Text, index: number) {
    sprite.anchor.set(0.5);

    sprite.x = (app.screen.width / 5) + (index * 300);
    sprite.y = app.screen.height * (5 / 6);

    sprite.eventMode = 'static';
    sprite.cursor = 'pointer';
}