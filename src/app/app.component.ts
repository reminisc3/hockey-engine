import { Component } from '@angular/core';
import { NhlApiService } from './services/nhl-api.service';
import { DatabaseService } from './services/database.service';
import { Team } from './classes/team';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	teams: Team[] = [];
	title = 'Hockey Engine';

	constructor(private nhlApi: NhlApiService, private db: DatabaseService) {

		this.nhlApi.getTeams().subscribe(data => {
			this.teams = data['teams'] || [];
			this.teams.sort((a,b) => {
				return (a.name < b.name) ? -1 : 1;
			});
		});

	}

	ngOnInit() {

	}

}
