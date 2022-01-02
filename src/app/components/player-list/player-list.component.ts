import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { NhlApiService } from '../../services/nhl-api.service';
import { Player } from '../../models/player';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {

  constructor(private dbService: DatabaseService, private nhlService: NhlApiService) { }

  ngOnInit(): void {
    
  }

}
