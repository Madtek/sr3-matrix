import {Dice} from "./Dice";

export function clone(o:any): any {
    return {...o};
}

export function clone_oa(o:any): any {
    return Object.assign({}, o);
}

export function testroll() {
    console.log(Dice.d6Result())
}
(window as any).testroll = testroll;