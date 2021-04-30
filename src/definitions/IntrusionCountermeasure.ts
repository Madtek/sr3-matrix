export type AlertStates = "no" | "passive" | "active";

export interface IntrusionCountermeasure {
    name?: string;
    id: string;
    lvl?: number;
    desc?: string;
    category?: string | IcCategory;
    type?: string | IcType;
    suffixList?: Array<any | IcSuffix>; //which variants the ice have
    suffix?: any | IcSuffix; //which variants the ice have
    multi?:number; //to determin the system costs
    threshold?: number; //later use when IC triggers
    alertState?: AlertStates | any; //later use what alert state the system is
}

export enum IcCategory {
    white = "WHITE",
    grey = "GREY",
    black = "BLACK",
    other = "OTHER"
}

export enum IcType {
    active = "ACTIVE",
    reactive = "REACTIVE"
}

export interface IcSuffix {
    id: string,
    name: string
}