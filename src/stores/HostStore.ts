import {extendObservable, makeAutoObservable} from "mobx";
import RootStore from "./RootStore";
import {Dice} from "../services/Dice";
import {EntryClasses} from "../services/EntryClass";
import {SecurityColors} from "../services/SecurityColor";
import Host from "../definitions/Host";
import HostCreator from "../services/HostCreator";

export default class HostStore {
    root: RootStore;

    host: Host;
    entry: EntryClasses;
    color: SecurityColors;
    maxIcCount

    securityTally: number;

    constructor(root: RootStore) {
        makeAutoObservable(this, {root: false});
        this.root = root;
        this.host = {};
        this.entry = EntryClasses.average;
        this.color = SecurityColors.green;
        this.maxIcCount = 20;
        this.securityTally = 0;
    }

    setEntry(entry:EntryClasses) {
        this.entry = entry;
    }

    setColor(color:SecurityColors) {
        this.color = color;
    }

    setHost(host:Host) {
        // this.host = host;
        extendObservable(this.host, host);
    }

    createHost(): Host {
        this.host = new HostCreator(this.root).createHost();
        console.debug("generated host", this.host);
        return this.host;
    }

    raiseSecurityTally() {
        this.securityTally += Dice.d6(this.host.security, this.root.deck.detectionFactor)
    }

}
