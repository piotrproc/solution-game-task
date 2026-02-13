import { Application, Container, Text } from "pixi.js";

export function addMainPageTitle(app: Application, container: Container, text: string): Text {
    const winText = new Text({
        text: text,
        style: {
            fontSize: 40,
            fill: 0xffffff
        }
    });

    winText.anchor.set(0.5);
    winText.x = app.screen.width / 2;
    winText.y = app.screen.height * (1 / 7);

    container.addChild(winText);
    return winText;
}

export function addFpsInfo(app: Application, container: Container) {
    const fpsText = new Text('FPS: 0', {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xffffff,
    });

    fpsText.x = 10;
    fpsText.y = 10;

    app.ticker.add(() => {
        fpsText.text = `FPS: ${Math.round(app.ticker.FPS)}`;
    });

    container.addChild(fpsText);
}

