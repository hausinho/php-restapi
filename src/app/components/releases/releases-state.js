import { observable, action, async } from "mobx"

export default class ReleaseState {
	@observable releases = [];

	constructor() {
		this.getReleases()
	}

	// @action async getReleases() {
	// 	return await fetch('/restapi/public/api/releases').then((data) => {
	// 		console.log('releases data: ', data)
	// 		this.releases.slice(0, this.releases.length)
	// 	})
	// }

	@action async getReleases() {
    let response = await fetch('/restapi/public/api/releases', {
        method: 'get'
    })

    this.releases.slice(0, this.releases.length)
    this.releases = await response.json();
	}		

}

const releaseState = new ReleaseState();

