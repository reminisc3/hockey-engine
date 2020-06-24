import { Component, OnInit } from '@angular/core';
import { NhlApiService } from '../../services/nhl-api.service';
import { Team } from '../../classes/team';

@Component({
	selector: 'app-team-list',
	templateUrl: './team-list.component.html',
	styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

	teams: Team[] = [];
	displayedColumns: string[] = ['teamName'];

	constructor(private nhlApi: NhlApiService) { }

	ngOnInit(): void {

		this.nhlApi.getTeams().subscribe(data => {
			this.teams = data['teams'] || [];
			this.teams.sort((a,b) => {
				return (a.name < b.name) ? -1 : 1;
			});
		});

	}

}
