export interface IntrusionCountermeasure {
    name: string;
    lvl?: number;
    desc: string;
    category?: string | IcCategory;
    type?: string | IcType;
    suffix?: Array<any | IcSuffix>; //which variants the ice have
    multiplier?:number; //to determin the system costs
    threshold?: number; //later use when IC triggers
    alertState?: number; //lster use what alert state the system is
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