import React, {Component} from 'react';
import {EntryClasses} from '../../services/EntryClass';
import './HostManager.css';
import {SecurityColors} from '../../services/SecurityColor';
import {FileLoader} from '../FileLoader';
import Host from "../../definitions/Host";
import {HostView} from "./HostView";
import {observer} from "mobx-react";
import {Props} from "../../definitions/Probs";
import {HostEdit} from "./HostEdit";

class HostManager extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    createNewHost() {
        this.props.root.host.createHost();
    }

    setSecColor(secColor: SecurityColors) {
        this.props.root.host.setColor(secColor);
        // this.setState(this.state);
    }

    setEntry(entry: EntryClasses) {
        this.props.root.host.setEntry(entry);
        // this.setState(this.state);
    }

    setHost(host: Host) {
        this.props.root.host.setHost(host);
    }


    render() {
        if (this.props.root.app.isEditorView()) {
            return (
                <div className="Host">
                    Color: {this.props.root.host.color}
                    <button onClick={() => this.setSecColor(SecurityColors.blue)}>Blue</button>
                    <button onClick={() => this.setSecColor(SecurityColors.green)}>Green</button>
                    <button onClick={() => this.setSecColor(SecurityColors.orange)}>Orange</button>
                    <button onClick={() => this.setSecColor(SecurityColors.red)}>Red</button>
                    <br/>

                    Entry: {this.props.root.host.entry}
                    <button onClick={() => this.setEntry(EntryClasses.easy)}>Easy</button>
                    <button onClick={() => this.setEntry(EntryClasses.average)}>Average</button>
                    <button onClick={() => this.setEntry(EntryClasses.hard)}>Hard</button>
                    <br/>

                    Max IC before shutdown:<input type="number"
                        value={this.props.root.host.maxIcCount}
                        onChange={(e) => {this.props.root.host.maxIcCount = +e.target.value}}/>
                    <button onClick={() => this.createNewHost()}>Generate</button>
                    <br/>
                    <br/>

                    <FileLoader<Host> toSave={this.props.root.host.host} name={"host"}
                                      onLoad={(resp) => this.setHost(resp)}/>
                    <br/>

                    <HostEdit root={this.props.root} />
                </div>
            )
        }

        return (
            <div>
                <FileLoader<Host> name={"host"}
                                  onLoad={(resp) => this.setHost(resp)}/>

                <HostView root={this.props.root}/>
            </div>
        );
    }
}

export default observer(HostManager);