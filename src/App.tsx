import React from 'react';
import './App.css';
import {Hint} from './components/hint/Hint';
import RootStore from "./stores/RootStore";
import HostManager from "./components/host/HostManager";
import {ViewState} from "./components/ViewState";


function App() {
	const root: RootStore = new RootStore();

	return (
	<div className="App">
		<ViewState root={root} /><br/>
		<HostManager root={root} />
		{/*<Hint />*/}
	</div>
  );
}

export default App;
