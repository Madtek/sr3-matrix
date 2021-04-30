import RootStore from "./RootStore";
import {makeAutoObservable} from "mobx";
import {MatrixConfig} from "../definitions/MatrixConfig";
import JsonConfig from "./matrix_config.json";

export default class ConfigStore {
    root: RootStore;
    config: MatrixConfig;

    constructor(root: RootStore) {
        this.root = root;
        makeAutoObservable(this, {root: false});
        this.config = JsonConfig;
    }

}