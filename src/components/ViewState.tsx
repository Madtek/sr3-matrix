import RootStore from "../stores/RootStore";
import {ViewStates} from "../stores/AppStore";
import {observer} from "mobx-react";

export const ViewState = observer(
    function ViewState(props: {root: RootStore}) {
    const isEditor:boolean = props.root.app.isEditorView();
    return (
        <div>
            <button className={isEditor ? "" : "active"}
                    disabled={!isEditor}
                    onClick={() => {props.root.app.view = ViewStates.decker}}
            >Decker View</button>
            <button className={isEditor ? "active" : ""}
                    disabled={isEditor}
                    onClick={() => {props.root.app.view = ViewStates.editor}}
            >Editor View</button>
        </div>
    )
})

