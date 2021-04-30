import React from "react";
import {SecurityColor} from "../../services/SecurityColor";
import {IcSuffix, IntrusionCountermeasure} from "../../definitions/IntrusionCountermeasure";
import {DropDown} from "../common/DropDown";
import RootStore from "../../stores/RootStore";
import {AlertStates} from "../../definitions/Host";
import {observer} from "mobx-react";

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

export const IcEdit = observer(
    function ICEdit(props: { ic: IntrusionCountermeasure, root: RootStore }) {
    return (
        <span title={props.ic.desc} className={"alert-" + props.ic.alertState}>
            IC: {props.ic.name + " -> "}
            <DropDown<IntrusionCountermeasure>
                selection={props.root.config.ic}
                nameField="name"
                onChange={(e) => {
                    Object.assign(props.ic, e);
                }}
            ></DropDown> <br/>

            {!!props.ic.suffixList ?
                <span> Suffix: {props.ic.suffix?.name + " -> "}
                    <DropDown<IcSuffix>
                        selection={props.ic.suffixList}
                        nameField="name"
                        onChange={(e) => {
                            props.ic.suffix = e;
                        }}
                    ></DropDown> <br/>
                </span> :
                ""
            }

            Lvl: <input type="number" value={props.ic.lvl}
                        onChange={(e) => {
                            props.ic.lvl = +e.target.value; props.ic.threshold = props.ic.threshold;
                        }}/> <br/>

            Trigger: <input type="number" value={props.ic.threshold}
                            onChange={(e) => {
                                props.ic.threshold = +e.target.value;
                            }}/> <br/>
            Alert: {props.ic.alertState}
            <button className={props.ic.alertState === AlertStates.no ? "active" : ""}
                    onClick={(e) => {
                        props.ic.alertState = AlertStates.no
                    }}>No</button>
            <button className={props.ic.alertState === AlertStates.no ? "active" : ""}
                    onClick={(e) => {
                        props.ic.alertState = AlertStates.passive
                    }}>Passive</button>
            <button className={props.ic.alertState === AlertStates.no ? "active" : ""}
                    onClick={(e) => {
                        props.ic.alertState = AlertStates.active
                    }}>Active</button>
            <br/>

            Type: {props.ic.type} <br/>
            Desc: {props.ic.desc} <br/>

		</span>
    )
})

