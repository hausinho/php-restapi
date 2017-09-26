// Index file

import React from "react";
import ReactDOM from "react-dom";

import Releases from "./components/releases";
import './img/bg.jpg';

class App extends React.Component {
    constructor() {
        super();
    }	
    render() {
        return (
        	<div className="container">
        		<Releases />
        	</div>
        )
    }
}



ReactDOM.render(<App/>, window.document.getElementById("app"));