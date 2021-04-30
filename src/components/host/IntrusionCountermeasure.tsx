import React from "react";
import {SecurityColor} from "../../services/SecurityColor";
import {IntrusionCountermeasure} from "../../definitions/IntrusionCountermeasure";

function IniRoll(props: { ic: IntrusionCountermeasure, secRule: SecurityColor }) {
    if (props.ic.type === "ACTIVE") {
        return <button onClick={() => {
            window.alert(props.ic.lvl + "-" + props.ic.name + " Ini: " + props.secRule.icIni(props.ic.lvl));
        }}>
            Ini
        </button>
    }

    return null;
}

export default function IC(props: { ic: IntrusionCountermeasure, secRule: SecurityColor }) {
    return (
        <span title={props.ic.desc} className={"alert-" + props.ic.alertState}>
            {props.ic.lvl}-{props.ic.name}
            <IniRoll ic={props.ic} secRule={props.secRule}/>
		</span>
    )
}
