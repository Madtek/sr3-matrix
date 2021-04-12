import { Core } from "./Core";
import { Dmg } from "../definitions/Enums";
import { EntryClass } from "./EntryClass";
import { IntrusionCountermeasure } from "../components/host/IntrusionCountermeasure";
import { ics } from "../components/host/IntrusionCountermeasure";
import { IntrusionCountermeasure } from "../components/host/IntrusionCountermeasure";


// Sicherheitsmassnahmen, Paranoia, sehr grosse öffentliche Aufmerksamkeit
export enum SecurityColors {
	blue = "blue", //sec ist egal oder zu teuer: privates, kiosk an der ecke, startUp
	green = "green", //sec ist basic oder wurde eingespart: mediamarkt-, amazon-shop,
	orange = "orange", //solides system was der öffentlichkeit stand hält, facebook-, google-, amazon-service,
	red = "red", //high security system, keiner darf unrechtmässig rein, sehr hohes budget, paypal, bank, google-, amazon-data
	blackUltraViolet = "uv" //gibts nicht, experimentel, übertrieben, Drachen oder KI-Labors
}

//use map, single instance ... or redux actions ... like service in angular
export function getSecurityColor(secColor: SecurityColors): SecurityColor {
	switch (secColor) {
		case SecurityColors.blue:
			return new SecurityColorBlue();
		case SecurityColors.green:
			return new SecurityColorGreen();
		case SecurityColors.orange:
			return new SecurityColorOrange();
		case SecurityColors.red:
			return new SecurityColorRed();
		case SecurityColors.blackUltraViolet:
			return new SecurityColorBlack();
	}
}

export interface SecurityColor {
	triggerThreshold(): number;
	icIni(icLvl: number): number;
	icDmg: Dmg;
	illegalTN: number;
	legalTN: number;
	shockDmg: Dmg;

	icRndmOffset: number;
	icLvlDice: number;
	minIcLvl: number; //min IC lvl -1 (addition)
}

export class SecurityColorBlue implements SecurityColor {
	triggerThreshold = (): number => {
		return Core.rollDice(3) + 4;
	}

	icIni(icLvl: number): number {
		return Core.rollDice(6) + icLvl;
	}

	icDmg = Dmg.M;
	illegalTN = 6;
	legalTN = 3;
	shockDmg = Dmg.L;

	icRndmOffset = -0.1;
	icLvlDice = 4;
	minIcLvl = 0;
}

export class SecurityColorGreen implements SecurityColor {
	triggerThreshold(): number {
		return Core.rollDice(3) + 3;
	}

	icIni(icLvl: number): number {
		return Core.rollDice(6, 2) + icLvl;
	}

	icDmg: Dmg = Dmg.M;
	illegalTN = 5;
	legalTN = 4;
	shockDmg: Dmg = Dmg.M;

	icRndmOffset = 0;
	icLvlDice = 5; //respect min lvl
	minIcLvl = 1;
}

export class SecurityColorOrange implements SecurityColor {
	triggerThreshold(): number {
		return Core.rollDice(3) + 2;
	}

	icIni(icLvl: number): number {
		return Core.rollDice(6, 3) + icLvl;
	}

	icDmg = Dmg.S;
	illegalTN = 4;
	legalTN = 5;
	shockDmg = Dmg.S;

	icRndmOffset = 0.1;
	icLvlDice = 6; //8-2 respect min lvl
	minIcLvl = 2;
}

export class SecurityColorRed implements SecurityColor {
	triggerThreshold(): number {
		return Core.rollDice(3) + 1;
	}

	icIni(icLvl: number): number {
		return Core.rollDice(6, 4) + icLvl;
	}

	icDmg = Dmg.S;
	illegalTN = 3;
	legalTN = 6;
	shockDmg = Dmg.D;

	icRndmOffset = 0.15;
	icLvlDice = 7; //10-3 respect minLvl
	minIcLvl = 3;
}

export class SecurityColorBlack implements SecurityColor {
	triggerThreshold(): number {
		return Core.rollDice(3);
	}

	icIni(icLvl: number): number {
		return Core.rollDice(6, 4) + icLvl;
	}

	icDmg = Dmg.D;
	illegalTN = 3;
	legalTN = 6;
	shockDmg = Dmg.D;

	icRndmOffset = 0.25;
	icLvlDice = 12;
	minIcLvl = 4;
}

