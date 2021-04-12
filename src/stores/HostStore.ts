import {makeAutoObservable} from "mobx";
import RootStore from "./RootStore";
import {Core} from "../services/Core";
import {EntryClass} from "../services/EntryClass";
import {IntrusionCountermeasure} from "../definitions/IntrusionCountermeasure";
import {ics} from "../components/host/IntrusionCountermeasure";
import {SecurityColor} from "../services/SecurityColor";
import Host from "../definitions/Host";

export default class HostStore {
    root: RootStore;

    host: Host;
    securityTally: number;

    constructor(root: RootStore) {
        makeAutoObservable(this, {root: false});
        this.root = root;

        this.host = {};
        this.securityTally = 0;
    }

    raiseSecurityTally() {
        this.securityTally += Core.d6(this.host.security, this.root.deck.detectionFactor)
    }

    createTriggerList(sec: SecurityColor, entry: EntryClass): Array<IntrusionCountermeasure> {
        const nonAlert: Array<number> = [2, 3, 3, 4, 2, 3, 4, 8]; //nur Reactiv
        const pasiveAlert: Array<number> = [2, 3, 4, 0, 1, 8, 0, 1, 5, 6, 7]; //nach 3 oder 4 Trigger, nur weis&grau
        const activeAlert: Array<number> = [0, 1, 5, 6, 7, 10, 10, 9, 11, 9, 12]; //nach 2 oder 3 Trigger nach Passiv

        const pasiveAlertIndex = Math.floor(Math.random() * 2) + 3;
        const activeAlertIndex = Math.floor(Math.random() * 2) + 2 + pasiveAlertIndex;

        let hostIc: Array<IntrusionCountermeasure> = [];
        let rnd: number;
        let alertState: number = 0;
        let tmpIc: IntrusionCountermeasure = null;
        for (let i = 0; i < 10; i++) {
            rnd = Math.random() + sec.icRndmOffset;

            if (i >= activeAlertIndex) {
                alertState = 2;
            }
            else if (i >= pasiveAlertIndex) {
                alertState = 1;
            }

            let idx: number;
            switch (alertState) {
                case 0: //non alert
                    idx = nonAlert[Math.max(0, Math.min(Math.floor(rnd * nonAlert.length), nonAlert.length - 1))];
                    break;
                case 1: //pasiv alert
                    idx = pasiveAlert[Math.max(0, Math.min(Math.floor(rnd * pasiveAlert.length), pasiveAlert.length - 1))];
                    break;
                case 2: //active alert
                    idx = activeAlert[Math.max(0, Math.min(Math.floor(rnd * activeAlert.length), activeAlert.length - 1))];
                    break;
            }
            tmpIc = ics[idx];
            tmpIc = JSON.parse(JSON.stringify(tmpIc))

            tmpIc.lvl = Core.rollDice(sec.icLvlDice + entry.icLvlDiceMod) + sec.minIcLvl;
            tmpIc.threshold = sec.triggerThreshold();
            tmpIc.alertState = alertState;

            if (tmpIc.suffix) {
                tmpIc.name += tmpIc.suffix[Math.ceil(Math.random() * tmpIc.suffix.length - 1)];
            }

            hostIc.push(tmpIc);
        }


        return hostIc;
    }



    createTriggerListByBook(sec: SecurityColor, entry: EntryClass): Array<IntrusionCountermeasure> {
        const reactWhiteIc: Array<number> = [2, 3, 3, 4, 2, 3, 4, 8]; //nur Reactiv
        const noAlert: Array<any> = [2, 3, 3, 4, 2, 3, 4, 8]; //nur Reactiv

        let hostIc: Array<IntrusionCountermeasure> = [];


        return hostIc;
    }

    reactWhiteIc(): IntrusionCountermeasure {
        const ic: Array<number> = [2, 3, 3, 4, 2, 3]; //nur Reactiv

        return
    }
}
