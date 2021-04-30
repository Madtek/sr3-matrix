import HostStore from "./HostStore";
import DeckStore from "./DeckStore";
import ChronicStore from "./ChronicStore";
import {MatrixConfig} from "../definitions/MatrixConfig";
import config_json from "./matrix_config.json"
import AppStore from "./AppStore";

export default class RootStore {
    app: AppStore;
    host: HostStore;
    deck: DeckStore;
    chronic: ChronicStore;

    config: MatrixConfig = config_json;

    constructor() {
        this.app = new AppStore(this);
        this.host = new HostStore(this);
        this.deck = new DeckStore(this);
        this.chronic = new ChronicStore(this);
    }

}