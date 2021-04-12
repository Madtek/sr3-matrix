import "./Hint.css";
import { ics, IntrusionCountermeasure } from "../host/IntrusionCountermeasure";
import React from "react";

export function Hint() {
	return (
		<div>
		Hints:<br/>
		{
			ics.map((ic:IntrusionCountermeasure, index:number) => {
				return <small key={index} className="item"><a>{ic.name} :</a> {ic.desc}[{ic.type}]<br/><br/></small>;
			})
		}
		</div>
	)
}

