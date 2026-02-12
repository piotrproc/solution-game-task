import { Container, TextStyle } from "pixi.js";
import { AvatarsType, DialogueType, MagicType } from "../magicTypes.ts";
import { createChatLine } from "./emojies.ts";

export function getDialogueFromUrl(container: Container, url: string) {

    fetch(url)
        .then(res => res.json())
        .then((res: MagicType) => {
            insertDialogueToContainer(container, res.dialogue, res.avatars);
        })

}

function insertDialogueToContainer(container: Container, dialogue: DialogueType[], avatars: AvatarsType[]) {

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
            chatLine.pivot.x = chatLine.width - 1050;
            chatLine.x = container.width;
        }

        chatLine.position.set(50, 200 + index * 50);
        container.addChild(chatLine);
    })
}

function getAlignFromAvatar(avatars: AvatarsType[], dialogueObject:DialogueType) {
    return (avatars.find(avatar => {
        return avatar.name === dialogueObject.name;
    }) || {position: "right"}).position;
}