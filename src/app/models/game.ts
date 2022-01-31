import { Team } from './team';

export class Game {
  date: Date = new Date();
  homeTeam: Team;
  awayTeam: Team;
  shots: number = 0;
  goals: number = 0;
  powerPlays: number = 0;
  penaltyMinutes: number = 0;
  hits: number = 0;
  blocks: number = 0;
  faceoffs: number = 0;

  constructor(homeTeam: Team, awayTeam: Team) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
  }

  simulate() {

  }

}
