import { Container, TextStyle } from "pixi.js";
import { DialogueType, MagicType } from "../magicTypes.ts";
import { createChatLine } from "./emojies.ts";

export function getDialogueFromUrl(container: Container, url: string) {

    fetch(url)
        .then(res => res.json())
        .then((res: MagicType) => {
            console.log(res);
            insertDialogueToContainer(container, res.dialogue);
        })

}

function insertDialogueToContainer(container: Container, dialogue: DialogueType[]) {

    const style = new TextStyle({
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xffffff
    });

    dialogue.forEach((dialogueObject, index) => {
        const text = `${dialogueObject.name}:  ${dialogueObject.text}`;

        const chatLine = createChatLine(
            text,
            style,
            dialogueObject.name
        );

        if (dialogueObject.name !== "Sheldon") {
            chatLine.pivot.x = chatLine.width - 1050;
            chatLine.x = container.width;
        }

        chatLine.position.set(50, 200 + index * 50);
        container.addChild(chatLine);
    })
}