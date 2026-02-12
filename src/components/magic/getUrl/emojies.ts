import { Container, Sprite, Text } from "pixi.js";
import { EMOJIS } from "../globalVariables/consts.ts";

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

export function createChatLine(message, style, sender: string) {
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
            // text.anchor.set(sender ==="Sheldon" ? 0: -1);
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

