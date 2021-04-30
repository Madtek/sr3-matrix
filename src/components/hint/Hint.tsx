import "./Hint.css";
import React from "react";
import {IntrusionCountermeasure} from "../../definitions/IntrusionCountermeasure";
import RootStore from "../../stores/RootStore";

export function Hint(props: {root: RootStore}) {
	return (
		<div>
		Hints:<br/>
		{
			props.root.config.ic.map((ic:IntrusionCountermeasure, index:number) => {
				return <small key={index} className="item"><a>{ic.name} :</a> {ic.desc}[{ic.type}]<br/><br/></small>;
			})
		}
		</div>
	)
}

