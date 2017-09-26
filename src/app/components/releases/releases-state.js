import { observable, action, async } from "mobx"

export default class ReleaseState {
	@observable releases = [];

	constructor() {
		this.getReleases()
	}

	@action async getReleases() {
		// let response = await fetch('/restapi/public/api/releases', {
		// 	method: 'get'
		// })
		// console.log('response: ', response)

		// this.releases.slice(0, this.releases.length)
		// this.releases = await response.json();
		// console.log('releases: ', this.releases)

		await fetch('/restapi/public/api/releases').then(response => {
			if(response.ok){
				response.json().then(data => {
					console.log('data: ', data)
					this.releases.slice(0, this.releases.length)
					this.releases = data;
				});
			}
			else{

			}
	});		
	}		

}

const releaseState = new ReleaseState();

