// Index file

import React from "react";
import ReactDOM from "react-dom";

import Releases from "./components/releases";

class App extends React.Component {
    constructor() {
        super();
        console.log('props: ', this)
    }	
    render() {
        return (
        	<div>
        		<Releases />
        	</div>
        )
    }
}



ReactDOM.render(<App/>, window.document.getElementById("app"));