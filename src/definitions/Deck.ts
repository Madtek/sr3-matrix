import {Utility} from "./Utility";

export interface Deck {
    mpcp: number, //Persona rating

    bod: number,
    mask: number,
    sensor: number,
    evade: number,

    hardening: number,
    ioSpeed: number,
    reactionBoost: number,

    storedUtils: Array<Utility>
}
