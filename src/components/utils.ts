import { Application } from "pixi.js";
import { NUMBER_OF_TASKS } from "./consts.ts";

export function hideAllTabs(app: Application) {
    for (let i = 0; i <= NUMBER_OF_TASKS; i++) {
        app.stage.children[i].visible = false;
    }
}