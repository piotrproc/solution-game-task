import { Application, Container, Text, Ticker } from "pixi.js";

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
    winText.y = app.screen.height * (1 / 9);

    container.addChild(winText);
    return winText;
}

export function addFpsInfo(ticker: Ticker, container: Container, position: {x:number, y:number}, name: string) {
    const fpsText = new Text({
        text: `${name} 0`,
        style: {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xffffff
        }
    });

    fpsText.x = position.x;
    fpsText.y = position.y;

    ticker.add(() => {
        fpsText.text = `${name} ${Math.round(ticker.FPS)}`;
    });

    container.addChild(fpsText);
}

