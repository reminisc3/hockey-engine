import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../../models/player';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  playerId: string|number;

  constructor(private route: ActivatedRoute, private dbService: DatabaseService) {

  }

  ngOnInit(): void {

  		this.route.params.subscribe( data => {
  			this.playerId = Number(data.id);
  		});

  }

}
