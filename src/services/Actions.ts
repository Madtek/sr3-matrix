import {Duration} from "../definitions/Enums";
import {Core} from "./Core";
import RootStore from "../stores/RootStore";

export default class Actions {
    root: RootStore;

    constructor(root:RootStore) {
        this.root = root
    }

    /**
     * @return Amount of successes
     * @param actionName
     * @param duration
     * @param dices
     * @param tn
     */
    decking(actionName: string = "Decking", duration: Duration = Duration.Simple, dices: number = 1, tn: number = 1):number {
        if(duration == Duration.Free && !this.root.chronic.isFreeActionAvailable) {
            window.alert("No Free action available " + actionName);
        }
        else if(duration == Duration.Complex && !this.root.chronic.isComplexActionAvailable) {
            window.alert("No Complex action available " + actionName);
        }

        return Core.d6(dices, tn);
    }

    maneuver() {

    }


}