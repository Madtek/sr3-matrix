import { Core } from "./Core";

// Nutzbarkeits Lvl, wie oft oder umständlich
export enum EntryClasses { //usabilty
	easy = "easy", //häufig genuzt, öffentlich: google maps, foren, youtube,
	average = "average", //gelegentlich genuzt, mit anmeldung: amazon shop, facebook, paypal
	hard = "hard"//selten genutzt, zuverlässigkeit erwartet: offizielle Polizei daten, Bank server
}

//use map, single instance ... or redux actions ... like service in angular
export function getEntryClass(entryClass:EntryClasses): EntryClass {
	switch(entryClass) {
		case EntryClasses.easy :
		return new EntryClassEasy();
		case EntryClasses.average :
		return new EntryClassAverage();
		case EntryClasses.hard :
		return new EntryClassHard();
	}
}

export interface EntryClass {
	securityLevel():number;
	subsystemLevel():number;

	icLvlDiceMod: number; //addition to IC lvl dice
}

export class EntryClassEasy implements EntryClass {
	securityLevel():number {
		return Core.rollDice(3) + 3; //1w3+3
	}

	subsystemLevel():number {
		return Core.rollDice(3) + 7;
	}

	icLvlDiceMod = 0;
}


export class EntryClassAverage implements EntryClass {
	securityLevel():number {
		return Core.rollDice(3) + 6;
	}
	
	subsystemLevel():number {
		return Core.rollDice(3, 2) + 9;
	}

	icLvlDiceMod = 2;
}


export class EntryClassHard implements EntryClass {
	securityLevel():number  {
		return Core.rollDice(3, 2) + 6; //2w3 + 6
	}

	subsystemLevel():number  {
		 return Core.rollDice(6) + 12;
	}

	icLvlDiceMod = 4;
}
