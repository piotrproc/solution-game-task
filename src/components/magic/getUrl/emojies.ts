import { Container, Sprite, Text, TextStyle } from "pixi.js";

const EMOJIS = {
    sad: "emoji-sad",
    intrigued: 'emoji-intrigued',
    neutral: 'emoji-neutral',
    satisfied: 'emoji-satisfied',
    laughing: 'emoji-laughing'
};

export function putMessage(container: Container) {
    const style = new TextStyle({
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xffffff
    });

    const chatLine = createChatLine(
        "Hello {sad} how are you {intrigued}",
        style
    );

    chatLine.position.set(50, 100);
    container.addChild(chatLine);
}

function parseMessage(text) {
    const regex = /{(.*?)}/g;
    const parts: { type: string, value: string }[] = [];

    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push({
                type: 'text',
                value: text.substring(lastIndex, match.index)
            });
        }

        parts.push({
            type: 'emoji',
            value: match[1]
        });

        lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
        parts.push({
            type: 'text',
            value: text.substring(lastIndex)
        });
    }

    return parts;
}

function createChatLine(message, style) {
    const container = new Container();
    const parts = parseMessage(message);

    let x = 0;
    const lineHeight = style.fontSize || 24;

    for (const part of parts) {

        if (part.type === 'text') {
            const text = new Text({
                text: part.value,
                style
            });


            text.x = x;
            text.y = 0;

            x += text.width;
            container.addChild(text);
        }

        if (part.type === 'emoji' && EMOJIS[part.value]) {
            const sprite = Sprite.from(EMOJIS[part.value]);;

            sprite.width = lineHeight;
            sprite.height = lineHeight;
            sprite.x = x;
            sprite.y = 0;

            x += sprite.width;
            container.addChild(sprite);
        }
    }

    return container;
}

