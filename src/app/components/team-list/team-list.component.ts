import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Team } from '../../models/team';

@Component({
	selector: 'app-team-list',
	templateUrl: './team-list.component.html',
	styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

	teams: Team[] = [];
	displayedColumns: string[] = ['teamName', 'conference', 'division'];

	constructor(private dbService: DatabaseService) { }

	ngOnInit(): void {

		this.getTeams().then(teams => {
			this.teams = teams;
			console.warn(teams);
		});

	}

	getTeams(): Promise<Team[]> {
		return this.dbService.getTeams();
	}

}
