import RootStore from "./RootStore";
import {makeAutoObservable} from "mobx";
import {Config} from "../definitions/Config";
import JsonConfig from "./matrix_config.json";

export default class ConfigStore {
    root: RootStore;
    config: Config;

    constructor(root: RootStore) {
        makeAutoObservable(this, {root: false});
        this.root = root;
        this.config = JsonConfig;
    }

}