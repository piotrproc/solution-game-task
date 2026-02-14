import { Container, Text, TextStyle } from "pixi.js";
import { AvatarsType, DialogueType, MagicType } from "./types.ts";
import { createChatLine } from "./parseChat.ts";
import { SCREEN_SIZE_Y } from "../states.ts";
import { HEIGHT_OF_ONE_MESSAGE } from "./consts.ts";
import { app } from "../../main.ts";

let isTextLoaded = false;

export function getDialogueFromUrl(container: Container, url: string) {

    const loadingText = addLoadingText(container, "Loading...");
    loadingText.visible = !isTextLoaded;

    app.renderer.resize(app.screen.width, SCREEN_SIZE_Y.value);

    fetch(url)
        .then(res => res.json())
        .then((res: MagicType) => {
            if(!isTextLoaded) {
                isTextLoaded = true;
                loadingText.visible = false;

                insertDialogueToContainer(container, res.dialogue, res.avatars);
                SCREEN_SIZE_Y.value = res.dialogue.length * HEIGHT_OF_ONE_MESSAGE;
                app.renderer.resize(app.screen.width, SCREEN_SIZE_Y.value);
            }
        })

}

function addLoadingText(container: Container, text: string) {
    const loadingText = new Text({
        text: text,
        style: {
            fontSize: 30,
            fill: 0xffffff
        }
    });

    loadingText.anchor.set(0.5);
    loadingText.x = app.screen.width / 2;
    loadingText.y = app.screen.height * (2 / 10);

    container.addChild(loadingText);
    return loadingText;
}

function insertDialogueToContainer(container: Container, dialogue: DialogueType[], avatars: AvatarsType[]) {

    const style = new TextStyle({
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xffffff,
        wordWrap: true,
        wordWrapWidth: 1500
    });

    dialogue.forEach((dialogueObject, index) => {
        const text = `{${dialogueObject.name}}  ${dialogueObject.text}`;

        const chatLine = createChatLine(text, style);

        const align = getAlignFromAvatar(avatars, dialogueObject)

        if (align === "right") {
            chatLine.pivot.x = chatLine.width - app.screen.width + 100;
            chatLine.x = container.width;
        }

        chatLine.position.set(50, 200 + index * 70);
        container.addChild(chatLine);
    })
}

function getAlignFromAvatar(avatars: AvatarsType[], dialogueObject: DialogueType) {
    return (avatars.find(avatar => {
        return avatar.name === dialogueObject.name;
    }) || {position: "right"}).position;
}