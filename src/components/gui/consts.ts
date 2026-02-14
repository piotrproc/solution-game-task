import { isMobile } from "pixi.js";
import { isPortrait } from "../utils.ts";

export const TASK_TEXTS = [
    isMobile.any && isPortrait() ? "1st task" : "1st assignment",
    isMobile.any && isPortrait() ? "2nd task" : "2nd assignment",
    isMobile.any && isPortrait() ? "3rd task" : "3rd assignment"
];