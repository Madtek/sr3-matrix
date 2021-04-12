import {Utility} from "./Utility";
import {IntrusionCountermeasure} from "./IntrusionCountermeasure";
import {Host} from "./Host";
import Operation from "./Operation";

export interface Config {
    utils: Array<Utility>,
    operations: Array<Operation>,
    ic: Array<IntrusionCountermeasure>,
    rtg: Array<Host>
}