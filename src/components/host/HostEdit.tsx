import {getSecurityColor, SecurityColor} from "../../services/SecurityColor";
import React from "react";
import IC from "./IntrusionCountermeasure";
import Host from "../../definitions/Host";
import RootStore from "../../stores/RootStore";
import {observer} from "mobx-react";
import {IcEdit} from "./IntrusionCountermeasureEdit";

export const HostEdit = observer(
    function HostEdit(props: { root: RootStore }) {
        const host: Host = props.root.host.host;
        if (!host || !host.security) {
            return <div>No host</div>;
        }

        const secRule: SecurityColor = getSecurityColor(host.color);
        let threshold: number = 0;

        return (
            <div className="HostEdit">
                {host.color}-{host.security} ({host.costs.toLocaleString()} nuyen)<br/>
                <br/><br/>
                Security: <input type="number"
                                   value={host.security}
                                   onChange={(e) => {host.security = +e.target.value}}/>
                <br/>Zugang: <input type="number"
                        value={host.entry}
                        onChange={(e) => {host.entry = +e.target.value}}/> <br/>
                Kontrolle: <input type="number"
                        value={host.control}
                        onChange={(e) => {host.control = +e.target.value}}/> <br/>
                Index: <input type="number"
                    value={host.index}
                    onChange={(e) => {host.index = +e.target.value}}/> <br/>
                Datei: <input type="number"
                    value={host.file}
                    onChange={(e) => {host.file = +e.target.value}}/> <br/>
                Periphery: <input type="number"
                    value={host.slave}
                    onChange={(e) => {host.slave = +e.target.value}}/> <br/>
                <br/>
                <br/>

                Illegal MW (vs. Decker): {secRule.illegalTN}<br/>
                Legal MW (vs. IC): {secRule.legalTN}<br/>
                IC-Dmg: {secRule.icDmg}<br/>
                Schock-Dmg: {secRule.shockDmg}<br/>
                <br/>

                {
                    host.triggerList.map((ic, index) => {
                        threshold += ic.threshold;

                        return <span key={index.toString()}>
                                <button onClick={(e) => {
                                        host.triggerList.splice(index, 0, {id:"Probe"});
                                }}>+</button>
                                <button onClick={(e) => {
                                        host.triggerList.splice(index, 1);
                                }}>-</button>
                                <br/>
                                {threshold}:<br/>
                                <IcEdit ic={ic} root={props.root}/>

                                <br/>
                        </span>;
                    })
                }

            </div>
        );
    })
