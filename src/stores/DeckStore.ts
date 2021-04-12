import RootStore from "./RootStore";
import {makeAutoObservable} from "mobx";
import Statics from "../definitions/Statics";
import {Utility} from "../definitions/Utility";
import {Deck} from "../definitions/Deck";

export default class DeckStore {
    root: RootStore;

    deck: Deck;
    activeUtils: Map<string, Utility>;

    constructor(root: RootStore) {
        makeAutoObservable(this, {root: false, getActiveUtility: false});
        this.root = root;

        this.deck = {
            mpcp: 1,
            bod: 1,
            mask: 1,
            sensor: 1,
            evade: 1,
            hardening: 0,
            ioSpeed: 100,
            reactionBoost: 1,
            storedUtils: []
        };
        this.activeUtils = new Map<string, Utility>();
    }

    get detectionFactor(): number {
        return Math.ceil(this.deck.mask + this.getActiveUtility(Statics.SLEAZE).lvl);
    }

    private readonly emptyUtility:Utility = {lvl:0, id:"NONE", multi:0};
    getActiveUtility(id:string): Utility {
        if( this.activeUtils.has(id) ) {
            return this.activeUtils.get(id);
        }
        return this.emptyUtility;
    }
}

