import {EntryClasses} from "../services/EntryClass";
import {SecurityColors} from "../services/SecurityColor";
import {IntrusionCountermeasure} from "./IntrusionCountermeasure";

export default interface Host {
    id?: string;
    name?: string;

    entryClass?: EntryClasses;
    color?: SecurityColors;
    security?: number;

    entry?: number;
    control?: number;
    index?: number;
    file?: number;
    slave?: number;

    triggerList?:Array<IntrusionCountermeasure>;

    costs?:number;
}

export enum HostAttributes {
    entry = "Entry",
    control = "Control",
    index = "Index",
    file = "File",
    slave = "Slave"
}