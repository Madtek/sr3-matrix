import {Utility} from "./Utility";
import {IntrusionCountermeasure} from "./IntrusionCountermeasure";
import Operation from "./Operation";
import Host from "./Host";

export interface MatrixConfig {
    utils: Array<Utility> | any,
    operations: Array<Operation> | any,
    ic: Array<IntrusionCountermeasure> | any,
    rtg: Array<Host> | any
}