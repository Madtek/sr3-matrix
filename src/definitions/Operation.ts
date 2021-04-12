import {HostAttributes} from "./Host";

export default interface Operation {
    id: string,
    name: string,
    type: string | OpsType,
    test: string | HostAttributes,
    util: string,
    action: string | ActionDuration,
    desc: string
}

export enum OpsType {
    non= "non",
    monitored = "Monitored",
    ongoing = "Ongoing",
    interrogation = "Interrogation"
}

export enum ActionDuration {
    free = "Free",
    complex = "Complex",
    simple = "Simple"
}