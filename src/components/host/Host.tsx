import React, { Component } from 'react';
import { EntryClasses, getEntryClass } from '../../services/EntryClass';
import './Host.css';
import { createTriggerList, getSecurityColor, SecurityColors } from '../../services/SecurityColor';
import { FileLoader } from '../FileLoader';
import HostView from './HostView';
import { sizePerLvl, IntrusionCountermeasure } from './IntrusionCountermeasure';
import { costPerMpByLvl } from './IntrusionCountermeasure';


export class HostManager extends Component<any, {host:Host, settings?:any}> {
	constructor(props:any) {
		super(props);
		this.state =
		{
			host: this.createHost(EntryClasses.average, SecurityColors.green),
			settings: {
				secColor: SecurityColors.green,
				entry: EntryClasses.average
			}
		}
	}

	createHost(entryClass: EntryClasses, color: SecurityColors):Host {
	 	let host: Host = {};
	 	const ecRule = getEntryClass(entryClass);
	 	const secRule = getSecurityColor(color);

	 	host.entryClass = entryClass;
	 	host.color = color;

	 	host.security = ecRule.securityLevel();

	 	host.entry = ecRule.subsystemLevel();
	 	host.control = ecRule.subsystemLevel();
	 	host.index = ecRule.subsystemLevel();
	 	host.file = ecRule.subsystemLevel();
	 	host.slave = ecRule.subsystemLevel();

	 	host.triggerList = createTriggerList(secRule, ecRule);

		host.costs = host.triggerList.reduce((prev: number, ic: IntrusionCountermeasure, i) => {
			console.log(prev, ic, sizePerLvl[ic.lvl], costPerMpByLvl[ic.lvl]);
			return prev + sizePerLvl[ic.lvl] * ic.multiplier * costPerMpByLvl[ic.lvl];
		}, hostCosts[host.security]);

		return host
	 }

	createNewHost() {
		this.setHost(this.createHost(this.state.settings.entry, this.state.settings.secColor));
	}

	setSecColor(secColor: SecurityColors) {
		this.state.settings.secColor = secColor;
		this.setState(this.state);
	}
	
	setEntry(entry: EntryClasses) {
		this.state.settings.entry = entry;
		this.setState(this.state);
	}
	
	setHost(host: Host) {
		let state: any = this.state;
		state.host = host;
		this.setState(state);
	}

	
	render() {
		return (
		<div className="Host">
			Color: {this.state.settings.secColor}
			<button onClick={() => this.setSecColor(SecurityColors.blue)}>Blue</button>
			<button onClick={() => this.setSecColor(SecurityColors.green)}>Green</button>
			<button onClick={() => this.setSecColor(SecurityColors.orange)}>Orange</button>
			<button onClick={() => this.setSecColor(SecurityColors.red)}>Red</button>
			<br/>
			
			Entry: {this.state.settings.entry}
			<button onClick={() => this.setEntry(EntryClasses.easy)}>Easy</button>
			<button onClick={() => this.setEntry(EntryClasses.average)}>Average</button>
			<button onClick={() => this.setEntry(EntryClasses.hard)}>Hard</button>
			<br/>
			
			<button onClick={() => this.createNewHost()}>Generate</button>
			<br/>
			<br/>
			<FileLoader<Host> toSave={this.state.host} name={"host"} onLoad={(resp) => this.setHost(resp)}/>
			<br/>
			
			<HostView host={this.state.host} />
		</div>
	  );
	}
}

export const hostCosts:Array<number> = //secValue == costs analog cyberdeck
[
	2500,
	5000,
	8000,
	14000,
	32000,
	70000,
	125000,
	250000,
	400000,
	600000,
	960000,
	1150000,
	1500000
];



