import { Container, Sprite, Text } from "pixi.js";
import { EMOJIS } from "./consts.ts";

function parseMessage(text: string) {
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

export function createChatLine(message, style) {
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
            const sprite = Sprite.from(EMOJIS[part.value]);
            sprite.anchor.set(0, 0.3);

            sprite.width = lineHeight * 1.5;
            sprite.height = lineHeight * 1.5;
            sprite.x = x;
            sprite.y = 0;

            x += sprite.width;
            container.addChild(sprite);
        }
    }

    return container;
}

