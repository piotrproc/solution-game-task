import { Container, Sprite } from "pixi.js";


export function putMessage(container: Container) {

    const EMOJIS = {
        sad: Sprite.from("emoji-sad"),
        intrigued: Sprite.from('emoji-intrigued'),
        neutral: Sprite.from('emoji-neutral'),
        satisfied: Sprite.from('emoji-satisfied'),
        laughing: Sprite.from('emoji-laughing')
    };

    // container.addChild(EMOJIS.sad);




}