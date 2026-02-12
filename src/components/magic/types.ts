export type DialogueType = {
    name: string;
    text: string;
}

export type EmojiesType = {
    name: string;
    url: string;
}

export type AvatarsType = {
    name: string;
    url: string;
    position: "left" | "right";
}

export type MagicType = {
    dialogue: DialogueType[],
    emojies: EmojiesType[],
    avatars: AvatarsType[]
}