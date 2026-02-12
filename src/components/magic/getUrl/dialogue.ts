import { Container, Text } from "pixi.js";
import { DialogueType, MagicType } from "../magicTypes.ts";

export function dialogue(container: Container, url: string) {

    fetch(url)
        .then(res => res.json())
        .then((res: MagicType) => {
            console.log(res);
            insertDialogue(container, res.dialogue);
        })

}

function insertDialogue(container: Container, dialogue: DialogueType[]) {

    dialogue.forEach((dialogueObject, index) => {
        const textObject = new Text({
            text: `${dialogueObject.name}:  ${dialogueObject.text}`,
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