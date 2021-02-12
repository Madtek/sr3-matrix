import React from 'react';
import './App.css';
import { HostManager } from './components/host/Host';
import { Hint } from './components/hint/Hint';


function App() {
	let tmpNr: number = 0;

	return (
	<div className="App">
		
		<div style={{width: "50%"}}>
			<HostManager />
		</div>
		
		<div style={{width: "50%"}}>
			<Hint />
		</div>
	
		<div>
		</div>
	</div>
  );
}

export default App;
