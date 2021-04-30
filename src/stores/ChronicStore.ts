import RootStore from "./RootStore";
import {makeAutoObservable} from "mobx";
import {Duration} from "../definitions/Enums";

export default class ChronicStore {
    root: RootStore;
    chronic: Array<ChronicItem>;

    spendRounds: number = 0;
    freeAvailable: boolean = true;

    constructor(root: RootStore) {
        makeAutoObservable(this, {root: false});
        this.root = root;

        this.chronic = [];
    }

    add(action:string, actor:any) {
        this.chronic.push({action: action, actor: actor, time: new Date()})
    }

    spentTime(duration: Duration = Duration.Free) {
        this.spendRounds += duration;


        if(duration === Duration.Free) {
            this.freeAvailable = false;
        }
    }

    get isFreeActionAvailable(): boolean {
        return this.freeAvailable;
    }

    get isComplexActionAvailable(): boolean {
        return this.spendRounds % 1 === 0;
    }
}

interface ChronicItem {
    action: string,
    actor: string,
    time: Date
}