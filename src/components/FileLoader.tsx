import React, {ChangeEvent, Component} from 'react';

export class FileLoader<T> extends Component<{toSave?: T, name:string, onLoad?:(file: T) => void}>{

	constructor(props: {toSave?: T, name:string, onLoad?:(file: T) => void}) {
		super(props);
	}

	downloadFile(obj: T, name:string) {
		let a = document.createElement("a");
		let file = new Blob([JSON.stringify(obj)], {type: "application/json"});
		a.href = URL.createObjectURL(file);
		a.download = `${name}.mtx`;
		a.click();
		a.remove();
	}

	uploadFile(e: ChangeEvent<HTMLInputElement>) {
		const reader = new FileReader();
		reader.onload = (e:ProgressEvent) => {
			this.props.onLoad( JSON.parse(reader.result.toString().trim()) )
		}
		reader.readAsText( e.target.files[0]);
	}

	render() {
		
		return (
		<div className="json-expoter">
			{
				this.props.toSave &&
				<button onClick={() => this.downloadFile(this.props.toSave, this.props.name)}>Save</button>
			}
			<input type="file" onChange={(e) => this.uploadFile(e)} title="Load"></input>
		</div>
	);
	}
}


