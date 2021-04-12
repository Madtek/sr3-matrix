import React from "react";
import { SecurityColor } from "../../services/SecurityColor";
import {IntrusionCountermeasure} from "../../definitions/IntrusionCountermeasure";

function IniRoll(props: {ic: IntrusionCountermeasure, secRule: SecurityColor}) {
	if(props.ic.type == "ACTIVE") {
		return <button onClick={ () => {
			window.alert(props.ic.lvl + "-" + props.ic.name + " Ini: " + props.secRule.icIni(props.ic.lvl));
		}}>
		Ini
		</button>
	}

	return null;
}


export default function IC(props: {ic: IntrusionCountermeasure, secRule: SecurityColor}) {
	return(
		<a title={props.ic.desc} className={"alert-" + props.ic.alertState}>
		{props.ic.lvl}-{props.ic.name}
		<IniRoll ic={props.ic} secRule={props.secRule} />
		</a>
	)
}


export const ics: Array<IntrusionCountermeasure> =
	[
		{
			name: "Krüppler-", type: "ACTIVE", suffix: ["Säure(Bod)", "Binder(Ausweich)", "Störer(Sensor)", "Marker(Maske)"], category: "WHITE", multiplier: 3,
			desc: "Attack: IC(IconMW) vs. Attribut(IcLvl) -> =< nix, > 2Erfolge=1 Atrib Punkt loss. Nie unter 1. Härte&Panzerung nutzlos."
		},
		{
			name: "Killer", type: "ACTIVE", category: "WHITE", multiplier: 2,
			desc: "Attack vs. Icon. IcLvl=Power Dmg=HostSecDmg(M/S). Standart attack. siehe rules."
		},
		{
			name: "Sonde", type: "REACTIVE", category: "WHITE", multiplier: 3,
			desc: "Extra Entdeckungswurf pro systemprobe"
		},
		{
			name: "Wirbel-", type: "REACTIVE", suffix: ["entry", "control", "index", "file", "periphery"], category: "WHITE", multiplier: 1,
			desc: "Verschlüsselt das subsystem. Blockiert Subsystem oder Objekt. Entweder entschlüsseln(kein entdeckungswurf, on fail: daten zerstör probe IcLvl(computer) ) oder killen"
		},
		{
			name: "Teerbaby-", type: "REACTIVE", suffix: ["operation", "offence", "defence", "special"], category: "WHITE",  multiplier: 2,
			desc: "Pasive attack on UtilityType use. IcLvl(UtilLvl) VS. UtilLvl(IcLvl) =< nix & Entedeckungs SensorProbe(IcLvl), > Util UND IC stürzt ab. erhöht SecKonto."
		},

		{
			name: "Blaster", type: "ACTIVE", category: "GREY", multiplier: 3,
			desc: "Wie Killer + On IconDeath IcLvl(MPCP+Härte) 2 Erf. = MPCP-1. Muss repariert/ersetzt werden."
		},
		{
			name: "Ripper-", type: "ACTIVE", suffix: ["Säure(Bod)", "Binder(Ausweich)", "Störer(Sensor)", "Marker(Maske)"], category: "GREY",  multiplier: 4,
			desc: "Wie Krüpler + On IconDeath IcLvl(MPCP+Härte) 2 Erf = Persona/Attrib-1. Muss repariert/ersetzt werden."
		},
		{
			name: "Funke", type: "ACTIVE", category: "GREY",  multiplier: 4,
			desc: "Wie Killer + On IconDeath IcLvl(MPCP+2+Härte) 2 Erf = MPCP-1 & (IcLvl-Härte)M Körper Dmg am Decker. "
		},
		{
			name: "Teergrube-", type: "REACTIVE", suffix: ["operation", "offence", "defence", "special"], category: "GREY", multiplier: 3,
			desc: "Wie Teerbaby + On UtilCrash IcLvl(MPCP+Härte) Erf= Lösche ALLE Kopien im erreichbaren Speicher. "
		},

		{
			name: "BlackIC Letal", type: "ACTIVE", category: "BLACK", multiplier: 20,
			desc: "Standart Attack. Dmg= (IcLvl-Härte)M/S on Icon(Bod) & Körper(KON),  Ausloggen=Komplex & WillenskraftProbe(IcLvl)"
		},
		{
			name: "BlackIC NonLetal", type: "ACTIVE", category: "BLACK", multiplier: 10,
			desc: "Standart Attack. Dmg= (IcLvl-Härte)M/S on Icon(Bod) & Geistig(KON),  Ausloggen=Komplex & WillenskraftProbe(IcLvl)"
		},

		{
			name: "Shutdown/Decker", category: "OTHER", multiplier: 0,
			desc: "Host wird neu gestartet. Alle aktiven Verbindunge werden gekickt. Systemschock"
		},

		{
			name: "Decker/Shutdown", category: "OTHER", multiplier: 0,
			desc: "Decker Sicherheits- oder Polizei- kommt ins system und checkt die Situation. Make a Decker..."
		}
	];

export const sizePerLvl:Array<number> = //for lvl 1 software
[
	0,
	1,
	4,
	9,
	16,
	25,
	36,
	49,
	64,
	81,
	100,
	121,
	144,
	169,
	225,
	252,
	280,
	309
];

export const costPerMpByLvl:Array<number> = 
[
	0,
	100,
	100,
	100,
	200,
	200,
	200,
	500,
	500,
	500,
	1000,
	1000,
	1000,
	1000,
	1000,
	1000,
	1000,
	1000,
	1000,
	1000
]