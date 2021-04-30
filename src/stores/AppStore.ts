import RootStore from "./RootStore";
import {makeAutoObservable} from "mobx";

export enum ViewStates {
    editor,
    decker
}

export default class AppStore {
    root: RootStore;

    view: ViewStates;

    constructor(root: RootStore) {
        this.root = root;
        this.view = ViewStates.decker;
        makeAutoObservable(this, {root: false});
    }

    isEditorView():boolean {
        return this.view === ViewStates.editor;
    }
}
