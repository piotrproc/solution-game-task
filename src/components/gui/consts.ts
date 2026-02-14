import { isMobile } from "pixi.js";

export const TASK_TEXTS = [
    isMobile.any ? "1st task" : "1st assignment",
    isMobile.any ? "2st task" : "2st assignment",
    isMobile.any ? "3st task" : "3st assignment"
];