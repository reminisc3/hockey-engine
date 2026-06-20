import { Division } from './division';
import { Player } from './player';
import { DatabaseService } from '../services/database.service';
import { GameStats } from './game-stats';
import { TeamLine } from './team-line';
import { inject } from '@angular/core';
import { Observable, of, Subject, switchMap } from 'rxjs';

export class Team {
  id: number;
	name: string;
  fullName: string;
  franchiseId: number;
  leagueId: number;
  rawTriCode: string;
  triCode: string;
	link?: string;
	venue: {
		name: string;
		link?: string;
		city: string;
		timeZone?: {
			id: string;
			offset: number;
			tz: string;
		};
	};
  abbreviation: string;
  teamName: string;
  locationName: string;
  firstYearOfPlay?: string|number;
  division: Division;
  conference: {
    id: number;
    name: string;
    link?: string;
  };
  franchise: {
    franchiseId: number;
    teamName: string;
    link?: string;
  };
  shortName: string;
  officialSiteUrl?: string;
  active?: boolean;
  roster?: Player[];
  gameStats?: GameStats;
  lines: TeamLine[];

  private dbService = inject(DatabaseService);

  constructor() {
    
  }

  getRoster(): Promise<Player[]> {
    return this.dbService.getRoster(this.id).then(players => this.roster = players);
  }

  private getBestAvailablePlayerForLine(targetPosition: string, targetLine: TeamLine, existingLines: TeamLine[], players: Player[], sort: boolean) {
    
    let targetPlayers = players;

    if(sort) {
      targetPlayers = [...players];
      targetPlayers.sort((playerA, playerB) => playerB.attributes.overall - playerA.attributes.overall);
    }

    let targetPlayer = targetPlayers.find(x => 
      existingLines.findIndex(y => y.players.findIndex(z => z.id == x.id)) == -1 &&
      targetLine.players.findIndex(y => y.id == x.id) == -1 && 
      x.positionCode == targetPosition
    );

    //If no target player is available, first try to find a player available with the same position who may be playing on another line
    if(!targetPlayer) {
      targetPlayer = targetPlayers.find(x => 
        targetLine.players.findIndex(y => y.id == x.id) == -1 && 
        x.positionCode == targetPosition
      );
    }

    //If still no target player is available, use an available player with any position who is not on the same line
    if(!targetPlayer) {
      targetPlayer = targetPlayers.find(x => 
        targetLine.players.findIndex(y => y.id == x.id) == -1 &&
        x.positionCode != 'G'
      );
    }

    return targetPlayer;

  }

  /**
   * Build lines from roster based on player attributes
   */
  autoBuildLines(): Observable<TeamLine[]> {

    let lines$ = new Subject<TeamLine[]>();

    const roster$ = this.roster ? of(this.roster) : of(this.getRoster()).pipe(switchMap(players => players));

    roster$.subscribe(players => {

      if(players.length == 0) {
        throw Error('Failed to build lines. Unable to retrieve roster');
      }

      let lines: TeamLine[] = [];
      const linePositions = [
        'C', 'LW', 'RW', 'D', 'D'
      ];
      const pkPositions = [
        'C', 'RW', 'D', 'D'
      ];

      const topOverallPlayers = [...players].sort((playerA, playerB) => playerB.attributes.overall - playerA.attributes.overall);

      //Build the 4 primary lines
      //The top rated players will be on higher lines
      for(let i=1; i <= 4; i++) {

        let line = new TeamLine();
        line.lineNumber = i;

        linePositions.forEach(position => {
          const targetPlayer = this.getBestAvailablePlayerForLine(position, line, lines, topOverallPlayers, false);
          if(targetPlayer) {
            line.players.push(targetPlayer);
          }
          else {
            console.debug('No player available for line', line);
          }
        });

        lines.push(line);

      }

      //Build the 2 Power Play lines
      //The top rated players will be on higher lines
      let ppLines = [];

      for(let i=1; i <= 2; i++) {

        let line = new TeamLine();
        line.lineNumber = i;
        line.powerPlay = true;

        pkPositions.forEach(position => {
          const targetPlayer = this.getBestAvailablePlayerForLine(position, line, ppLines, topOverallPlayers, false);
          if(targetPlayer) {
            line.players.push(targetPlayer);
          }
          else {
            console.debug('No player available for line', line);
          }
        });

        ppLines.push(line);
        lines.push(line);

      }

      //Build the 3 Penalty Kill lines
      //The top rated defensive players will be on higher lines
      let pkLines = [];
      const topDefensivePlayers = [...players].sort((playerA, playerB) => playerB.attributes.defense - playerA.attributes.defense);

      for(let i=1; i <= 3; i++) {

        let line = new TeamLine();
        line.lineNumber = i;
        line.penaltyKill = true;

        pkPositions.forEach(position => {
          const targetPlayer = this.getBestAvailablePlayerForLine(position, line, pkLines, topDefensivePlayers, false);
          if(targetPlayer) {
            line.players.push(targetPlayer);
          }
          else {
            console.debug('No player available for line', line);
          }
        });

        pkLines.push(line);
        lines.push(line);

      }

      lines$.next(lines);
      lines$.complete();

    });

    return lines$.asObservable();

  }

}
