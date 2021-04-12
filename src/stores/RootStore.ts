import HostStore from "./HostStore";
import DeckStore from "./DeckStore";
import ChronicStore from "./ChronicStore";

export default class RootStore {
    host: HostStore;
    deck: DeckStore;
    chronic: ChronicStore;

    constructor() {
        this.host = new HostStore(this);
        this.deck = new DeckStore(this);
        this.chronic = new ChronicStore(this);
    }

}