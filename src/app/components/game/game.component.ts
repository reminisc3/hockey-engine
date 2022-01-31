import { Component, OnInit } from '@angular/core';
import { Team } from '../../models/team';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  homeTeam: Team;
  awayTeam: Team;
  teams: Team[];

  constructor(private dbService: DatabaseService) {
    this.dbService.getTeams().then((teams) => {
      this.teams = teams;
    });
  }

  ngOnInit(): void {
  }

  canSimulate(): boolean {
    if(!this.homeTeam || !this.awayTeam) return false;
    return true;
  }

  async simulate() {
    alert('Simulate');
  }

}
