
export interface Utility {
    id: string,
    name?: string,
    multi: number,
    type?: string | UtilityType,
    desc?: string,

    lvl?: number
}

export enum UtilityType {
    operation = "operation",
    defence = "defence",
    offence = "offence",
    special = "special"
}