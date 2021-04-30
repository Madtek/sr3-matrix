import {getSecurityColor, SecurityColor} from "../../services/SecurityColor";
import React from "react";
import IC from "./IntrusionCountermeasure";
import Host from "../../definitions/Host";
import RootStore from "../../stores/RootStore";
import {observer} from "mobx-react";

export const HostView = observer(
    function HostView(props: { root: RootStore }) {
        const host: Host = props.root.host.host;
        if (!host || !host.security) {
            return <div>No host</div>;
        }

        const secRule: SecurityColor = getSecurityColor(host.color);
        let threshold: number = 0;

        return (
            <div className="HostView">
                {host.color}-{host.security} ({host.costs.toLocaleString()} nuyen)<br/>
                <br/><br/>
                Security: {host.security}<br/>

                <br/>Zugang:{host.entry} <br/>
                Kontrolle: {host.control} <br/>
                Index: {host.index} <br/>
                Datei: {host.file} <br/>
                Periphery: {host.slave} <br/>
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
                                {threshold}:
                                <IC ic={ic} secRule={secRule}/>
                                <br/>
                        </span>;
                    })
                }

            </div>
        );
    })
