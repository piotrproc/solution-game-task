import { Application, Container, Text, TextStyle } from "pixi.js";
import { AvatarsType, DialogueType, MagicType } from "./types.ts";
import { createChatLine } from "./parseChat.ts";

let isTextLoaded = false;

export function getDialogueFromUrl(app: Application, container: Container, url: string) {

    const loadingText = addLoadingText(app, container, "Loading...");
    loadingText.visible = !isTextLoaded;

    fetch(url)
        .then(res => res.json())
        .then((res: MagicType) => {
            if(!isTextLoaded) {
                isTextLoaded = true;
                loadingText.visible = false;

                insertDialogueToContainer(app, container, res.dialogue, res.avatars);
            }
        })

}

function addLoadingText(app: Application, container: Container, text: string) {
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

function insertDialogueToContainer(app:Application, container: Container, dialogue: DialogueType[], avatars: AvatarsType[]) {

    const style = new TextStyle({
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xffffff
    });

    dialogue.forEach((dialogueObject, index) => {
        const text = `{${dialogueObject.name}}  ${dialogueObject.text}`;

        const chatLine = createChatLine(
            text,
            style
        );

        const align = getAlignFromAvatar(avatars, dialogueObject)

        if (align === "right") {
            chatLine.pivot.x = chatLine.width - app.screen.width + 100;
            chatLine.x = container.width;
        }

        chatLine.position.set(50, 200 + index * 50);
        container.addChild(chatLine);
    })
}

function getAlignFromAvatar(avatars: AvatarsType[], dialogueObject: DialogueType) {
    return (avatars.find(avatar => {
        return avatar.name === dialogueObject.name;
    }) || {position: "right"}).position;
}