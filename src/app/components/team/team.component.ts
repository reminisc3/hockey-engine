import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../../models/player';
import { DatabaseService } from '../../services/database.service';

@Component({
	selector: 'app-team',
	templateUrl: './team.component.html',
	styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

	teamId: number;
	players: Player[] = [];
	displayedColumns: string[] = ['playerName', 'playerPos', 'playerJersey', 'playerAge', 'playerShoots'];

	constructor(
		private route: ActivatedRoute,
		private dbService: DatabaseService
	) { }

	ngOnInit(): void {

		this.route.params.subscribe( data => {
			this.teamId = Number(data.id);
			this.loadPlayers();
		});

	}

	loadPlayers(): void {

		this.dbService.getRoster(this.teamId).then(players => {
			this.players = players;
		});

	}

}
