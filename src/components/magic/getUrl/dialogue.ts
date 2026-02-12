import { Container, Text } from "pixi.js";
import { DialogueType, EmojiesType, MagicType } from "../magicTypes.ts";

export function getDialogueFromUrl(container: Container, url: string) {

    fetch(url)
        .then(res => res.json())
        .then((res: MagicType) => {
            console.log(res);
            insertDialogueToContainer(container, res.dialogue, res.emojies);
        })

}

function insertDialogueToContainer(container: Container, dialogue: DialogueType[], emojies: EmojiesType[]) {

    dialogue.forEach((dialogueObject, index) => {
        const text = `${dialogueObject.name}:  ${dialogueObject.text}`;

        const textObject = new Text({
            text,
            style: {
                fontSize: 25,
                wordWrap: true,
                wordWrapWidth: 1150
            },
            x: 50,
            y: 200 + index * 50
        });

        container.addChild(textObject);
    })
}