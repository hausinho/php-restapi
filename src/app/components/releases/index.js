import React from "react";
import { observer } from "mobx-react";

import ReleaseState from "./releases-state";

@observer
export default class Releases extends React.Component {
	constructor() {
		super();

		this.state = new ReleaseState();
	}
	render() {
		return (
			<div>
				<Albums state={this.state} releases={this.state.releases} />
			</div>
		)	
	}
}

const Albums = observer(({ state, releases, release }) => (
   <div className="wrapper">
   	{state.releases.map((release, i) => <Albumdetails state={state} release={release} key={i}/>)}
   </div>
))

const Albumdetails = observer(({ state, release }) => (
   <div className="albumWrapper">
   		<p>{release.band} - {release.album}</p>
   		<div>
   			<img src={release.album_cover} width="150" height="150" />
   		</div>
   		
 </div>
))
