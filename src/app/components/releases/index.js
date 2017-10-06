import React from "react";
import { observer } from "mobx-react";
import moment from "moment";
import 'moment/locale/de';
import '../../css/main.scss';

import ReleaseState from "./releases-state";

@observer
export default class Releases extends React.Component {
	constructor() {
		super();

		this.state = new ReleaseState();
		console.log('releases state: ', this.state)
	}
	render() {
		return (
			<div>
				<Albums state={this.state} releases={this.state.releases} />
			</div>
		)	
	}
}

const Albums = observer(({ state, releases }) => (

 <div className="wrapper">
    { Object.keys(state.releases).map((key, i) => { 
        return <div key={i}>
          <div><h1>{key}</h1></div>
            {state.releases[key].map((album, i) => {
                return <div key={i}><p>{album.band} - {album.release_title} - {moment(album.release_date).format('LL')}</p></div>;
            })}
           <div></div></div>
        })  
				
    } 

 </div>

))


