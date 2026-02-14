import { NUMBER_OF_TASKS } from "./consts.ts";
import { app } from "../main.ts";

function hideAllTabs() {
    for (let i = 0; i <= NUMBER_OF_TASKS; i++) {
        app.stage.children[i].visible = false;
    }
}

export function showTab(index: number) {
    hideAllTabs()
    app.stage.children[index].visible = true;
}