import {observer} from "mobx-react";
import React from "react";

export const DropDown = observer(
    function DropDown<T>(props: {selection: Array<T>, nameField: keyof T, onChange: (selected:T)=>void}) {
        // console.log("dropdown:", props.nameField, props.selection);
        return (
            <select onChange={(e) => {
                e.stopPropagation();
                props.onChange(props.selection.find((itm:T) => {
                    return itm[props.nameField].toString() === e.target.value;
                }));
            }}>
                <option disabled selected> - </option>
                {
                    props.selection.map((itm:T, index:number) => {
                        return <option key={itm[props.nameField].toString()}>
                            {itm[props.nameField]}
                        </option>;
                    })
                }
            </select>
        )
    })

