import { observable, action, async } from "mobx"

export default class ReleaseState {
  @observable releases = [];
  

	constructor() {
		this.getReleases()
	}

	@action async getReleases() {

		const response = await fetch('/restapi/public/api/releases');

			if(response.ok){
				response.json().then(data => {

					this.releases.slice(0, this.releases.length)

					  let result = {};
					  let months = 'January February March April May June July August September October November December'.split(' ');
					  
					  data.forEach(release => {
              let date = new Date(release.release_date);
              let month = date.getMonth();
              let monthName = months[month]
              if (!(monthName in result)) {
                result[monthName] = [];
              }
              
							result[monthName].push(release);
							
						});
	
					this.releases = result;			 
					  			  
				});
			}
			else{
				// error
			}	
	}		

}

const releaseState = new ReleaseState();

