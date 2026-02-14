import { isMobile } from "pixi.js";

export const ROUND_TIME = 1000;

export const CARD_WIDTH = isMobile.any ? 70 : 140;
export const CARD_HEIGHT = isMobile.any ? 100 : 200;

export const DECK_HEIGHT = 480;
export const NUMBER_OF_CARDS = 144;
export const CARDS_IN_COLUMN = 48;