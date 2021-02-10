import React from 'react';
import './App.css';
import { HostManager } from './comp/host/Host';
import { Core } from './common/core';
import { Hint } from './comp/Hint';


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
