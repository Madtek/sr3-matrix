import { SecurityColor, getSecurityColor } from "../../services/SecurityColor";
import React from "react";
import { Host } from "./Host";
import IC from "./IntrusionCountermeasure";


function HostView(props:{host: Host}) {
	const secRule: SecurityColor = getSecurityColor(props.host.secColor);
	let threshold: number = 0;
	
	return (
	<div className="HostView">
{props.host.secColor}-{props.host.secValue} ({props.host.costs.toLocaleString()} nuyen)<br/>
		<br/><br/>
		SecValue:{props.host.secValue} <br/>
		Zugang:{props.host.entry} <br/>
		Kontrolle:{props.host.control} <br/>
		Index:{props.host.index} <br/>
		Datei:{props.host.file} <br/>
		Periphery:{props.host.periphery} <br/>
		<br/>
		<br/>
		
		Illegal MW (vs. Decker): {secRule.illegalTN}<br />
		Legal MW (vs. IC): {secRule.legalTN}<br />
		IC-Dmg: {secRule.icDmg}<br />
		Schock-Dmg: {secRule.shockDmg}<br />
		
		
		<br/>
		
		{
			props.host.triggerList.map((ic, index) => {
				threshold += ic.threshold;
				let editMode = true;
				if(editMode) {
					return <input key={index.toString()} type="number" value={ic.lvl}></input>;
				}
				
				return <span  key={index.toString()}>
					{threshold}: <IC ic={ic} secRule={secRule}/><br/>
				</span>;
			})
		}

	</div>
	);
}

export default HostView;
