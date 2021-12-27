import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Player } from '../../models/player';
import { NhlApiService } from '../../services/nhl-api.service';

@Component({
	selector: 'app-team',
	templateUrl: './team.component.html',
	styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

	teamId: number;
	players: Player[] = [];
	displayedColumns: string[] = ['playerName', 'playerPos', 'playerJersey'];

	constructor(
		private route: ActivatedRoute,
		private nhlApi: NhlApiService
	) { }

	ngOnInit(): void {

		this.route.params.subscribe( data => {
			this.teamId = Number(data.id);
			this.loadPlayers();
		});

	}

	loadPlayers(): void {

		this.nhlApi.getRoster(this.teamId).subscribe(data => {
			this.players = data['roster'] || [];
			console.warn(this.players);
		});

	}

}
