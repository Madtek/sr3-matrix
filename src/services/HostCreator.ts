import Host, {AlertStates} from "../definitions/Host";
import {IntrusionCountermeasure} from "../definitions/IntrusionCountermeasure";
import RootStore from "../stores/RootStore";
import {MatrixConfig} from "../definitions/MatrixConfig";
import {Dice} from "./Dice";
import {getSecurityColor, SecurityColors} from "./SecurityColor";
import {getEntryClass} from "./EntryClass";
import {clone} from "./Utils";
import {debuglog} from "util";

export default class HostCreator {
    root: RootStore;
    config: MatrixConfig;

    host: Host;
    colorMod: number;
    icLvl: Array<number>;
    alert: AlertStates;

    constructor(root: RootStore) {
        this.root = root;
        this.config = root.config;
        this.host = {};
        this.alert = AlertStates.no;
    }

    createHost() {
        console.debug("create with config:", this.config);
        this.host = {};

        this.host.entryClass = this.root.host.entry;
        this.host.color = this.root.host.color;
        const ecRule = getEntryClass(this.host.entryClass);
        const secRule = getSecurityColor(this.host.color);

        this.host.security = ecRule.securityLevel();

        this.host.entry = ecRule.subsystemLevel();
        this.host.control = ecRule.subsystemLevel();
        this.host.index = ecRule.subsystemLevel();
        this.host.file = ecRule.subsystemLevel();
        this.host.slave = ecRule.subsystemLevel();

        if (this.host.color === SecurityColors.blue) {
            this.colorMod = 4;
        } else if (this.host.color === SecurityColors.green) {
            this.colorMod = 3;
        } else if (this.host.color === SecurityColors.orange) {
            this.colorMod = 2;
        } else if (this.host.color === SecurityColors.red) {
            this.colorMod = 1;
        }

        if (this.host.security <= 4) {
            this.icLvl = [4, 4, 4, 4, 4, 4, 5, 5, 5, 6, 6, 6, 8];
        } else if (this.host.security <= 7) {
            this.icLvl = [5, 5, 5, 5, 5, 5, 7, 7, 7, 8, 8, 8, 10];
        } else if (this.host.security <= 10) {
            this.icLvl = [6, 6, 6, 6, 6, 6, 9, 9, 9, 10, 10, 10, 11];
        } else {
            this.icLvl = [7, 7, 7, 7, 7, 7, 10, 10, 10, 12, 12, 12, 12];
        }

        this.host.triggerList = this.createTriggerList();

        this.host.costs = this.host.triggerList.reduce((prev: number, ic: IntrusionCountermeasure, i) => {
            console.debug(prev, ic, ic.multi, this.sizePerLvl[ic.lvl], this.costPerMpByLvl[ic.lvl]);
            return prev + this.sizePerLvl[ic.lvl] * ic.multi * this.costPerMpByLvl[ic.lvl];
        }, this.hostCosts[this.host.security]);

        return this.host;
    }

    createTriggerList(): Array<IntrusionCountermeasure> {
        let triggerList: Array<IntrusionCountermeasure> = [];
        let roll: number = Dice.d6Result();

        //At least one No-Alert IC
        if (roll <= 3) {
            triggerList.push(this.reactiveWhite());
        } else if (roll <= 5) {
            triggerList.push(this.proactiveWhite());
        } else {
            triggerList.push(this.reactiveGrey());
        }

        do {
            roll = Dice.d6Result();

            if (this.alert === AlertStates.no) {
                if (roll <= 3) {
                    triggerList.push(this.reactiveWhite());
                } else if (roll <= 5) {
                    triggerList.push(this.proactiveWhite());
                } else if (roll <= 7) {
                    triggerList.push(this.reactiveGrey());
                } else {
                    this.alert = AlertStates.passive;
                    if (this.host.color === SecurityColors.orange || this.host.color === SecurityColors.red) {
                        triggerList.push(this.proactiveWhite());
                    }
                }
            } else if (this.alert === AlertStates.passive) {
                if (roll <= 3) {
                    triggerList.push(this.proactiveWhite());
                } else if (roll <= 5) {
                    triggerList.push(this.reactiveGrey());
                } else if (roll <= 7) {
                    triggerList.push(this.proactiveGrey());
                } else {
                    this.alert = AlertStates.active;
                    if (this.host.color === SecurityColors.orange || this.host.color === SecurityColors.red) {
                        triggerList.push(this.proactiveGrey());
                    }
                }
            } else if (this.alert === AlertStates.active) {
                if (roll <= 3) {
                    triggerList.push(this.proactiveGrey());
                } else if (roll <= 5) {
                    triggerList.push(this.proactiveWhite());
                } else if (roll <= 7) {
                    triggerList.push(this.black());
                } else {
                    triggerList.push(this.createIc("Shutdown"))
                }
            }

            if (triggerList.length === this.root.host.maxIcCount - 1) {
                triggerList.push(this.createIc("Shutdown"));
            }

            console.debug("TriggerList IC created:", triggerList.length, triggerList.length, this.alert)
        } while (triggerList[triggerList.length - 1].id !== "Shutdown");

        return triggerList;
    }

    reactiveWhite(): IntrusionCountermeasure {
        const roll: number = Dice.roll(6);

        console.debug("reactiveWhite", roll);

        if (roll <= 2) {
            return this.createIc("Probe");
        } else if (roll <= 5) {
            return this.createIc("Trace");
        } else {
            return this.createIc("Tar baby");
        }
    }

    proactiveWhite(): IntrusionCountermeasure {
        const roll: number = Dice.roll(6, 2);

        console.debug("proactiveWhite", roll);

        if (roll <= 5) {
            return this.createIc("Crippler");
        } else if (roll <= 8) {
            return this.createIc("Killer");
        } else if (roll <= 11) {
            return this.createIc("Scout");
        } else {
            // return this.createIc("Construct");
            return this.createIc("Scout");
        }
    }

    reactiveGrey(): IntrusionCountermeasure {
        const roll: number = Dice.roll(6);

        console.debug("reactiveGrey", roll);

        if (roll <= 2) {
            return this.createIc("Tar pit");
        } else if (roll === 3) {
            return this.createIc("Trace", true);
        } else if (roll === 4) {
            return this.createIc("Probe", true);
        } else if (roll === 5) {
            return this.createIc("Scout", true);
        } else {
            // return this.createIc("Construct");
            return this.createIc("Scout", true);
        }
    }

    proactiveGrey(): IntrusionCountermeasure {
        let roll: number = Dice.roll(6, 2);

        console.debug("proactiveGrey", roll);

        if (roll <= 5) {
            return this.createIc("Ripper");
        } else if (roll <= 8) {
            return this.createIc("Blaster");
        } else if (roll <= 11) {
            return this.createIc("Sparky");
        } else {
            // return this.createIc("Construct");
            return this.createIc("Sparky");
        }
    }

    black(): IntrusionCountermeasure {
        let roll: number = Dice.roll(6, 2);

        console.debug("black", roll);

        if (roll <= 4) {
            return this.createIc("Psychotropic");
        } else if (roll <= 7) {
            return this.createIc("Lethal");
        } else if (roll <= 10) {
            return this.createIc("Non-Lethal");
        } else if (roll <= 11) {
            return this.createIc("Cerebropathic");
        } else {
            // return this.createIc("Construct");
            return this.createIc("Cerebropathic");
        }
    }

    createIc(id: string, withTrap:boolean = false): IntrusionCountermeasure {
        const ic: IntrusionCountermeasure =
            clone(
            this.config.ic.find((ic: IntrusionCountermeasure) => {
                return ic.id === id;
            })
        );

        if(ic.suffixList) {
            ic.suffix = ic.suffixList[Dice.roll(ic.suffixList.length) - 1];
            ic.name = ic.name + ic.suffix.name
        }

        ic.lvl = this.icLvl[Dice.roll(6, 2)];
        ic.alertState = this.alert;
        ic.threshold = Dice.roll(3) + this.colorMod;

        return ic;
    }

    hostCosts: Array<number> = //secValue === costs analog cyberdeck
        [
            2500,
            5000,
            8000,
            14000,
            32000,
            70000,
            125000,
            250000,
            400000,
            600000,
            960000,
            1150000,
            1500000
        ];

    sizePerLvl: Array<number> = //for lvl 1 software
        [
            0,
            1,
            4,
            9,
            16,
            25,
            36,
            49,
            64,
            81,
            100,
            121,
            144,
            169,
            225,
            252,
            280,
            309
        ];

    costPerMpByLvl: Array<number> =
        [
            0,
            100,
            100,
            100,
            200,
            200,
            200,
            500,
            500,
            500,
            1000,
            1000,
            1000,
            1000,
            1000,
            1000,
            1000,
            1000,
            1000,
            1000
        ]
}