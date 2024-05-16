import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject, combineLatest, of, combineLatestAll, ObservableInput } from 'rxjs';
import { concatAll, map, take } from 'rxjs/operators';
import { liveQuery } from 'dexie';
import "dexie-export-import";
import { NhlApiService } from './nhl-api.service';
import { HockeyEngineDB } from '../../db/db';
import * as dataModel from '../models/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private db: HockeyEngineDB = new HockeyEngineDB();
  teams$ = liveQuery<dataModel.Team[]>(() => this.db.teams.toArray());

  constructor(private http: HttpClient, private nhlService: NhlApiService) {
    
  }

  //TODO
  private progressIOCallback({ totalRows, completedRows }): boolean {
    console.warn('Total Rows: ${totalRows}, Completed Rows: ${completedRows}');
    return true;
  }

  public export(): Promise<Blob> {
    return this.db.export({ prettyJson: true, progressCallback: this.progressIOCallback });
  }

  async import(file: File) {
    await this.db.delete();
    this.db = await HockeyEngineDB.import(file, {
      progressCallback: this.progressIOCallback
    }) as HockeyEngineDB;
  }

  getDatabase(): HockeyEngineDB {
    return this.db;
  }

  rebuildDatabase() {

  }

  seedTeams(): Observable<dataModel.Team[]> {
    let dbSubject = new Subject<dataModel.Team[]>();
    this.nhlService.getTeams().subscribe(teams => {
      this.db.teams.bulkPut(teams).then(result => {
        dbSubject.next(teams); 
      });
    });
    return dbSubject.asObservable();
  }

  seedTeamPlayers(id: number|string): Observable<dataModel.Player[]> {

    let dbSubject = new Subject<dataModel.Player[]>();
    let playerHttpReqs: Observable<dataModel.Player>[] = [];

    this.nhlService.getRoster(id).pipe(take(1)).subscribe(players => {

      players.forEach((player,index) => {

        player.teamId = id;

        //MASSAGE PLAYER ATTRIBUTES AND ELIMINATE NESTED OBJECTS
        Object.keys(player).forEach(fieldName => {
          let field = player[fieldName];
          if(typeof field === 'object' && field.default) {
            field = field.default || field || '';
          }
          players[index][fieldName] = field;
        });

        playerHttpReqs.push(this.nhlService.getPlayer(player.id));

      });

      //GET MORE ADVANCED DATA FOR EACH PLAYER
      const players$ = of(...playerHttpReqs).pipe(concatAll()).pipe(map(playerResponse => {

        const playerId = playerResponse.playerId || playerResponse.id;

        let targetPlayer = players.find(x => x.id == playerId);
        if(targetPlayer) {
          targetPlayer.draftDetails = playerResponse.draftDetails || targetPlayer.draftDetails || null;
        }
        else {
          console.warn('Unable to process player draft details');
          console.warn(playerResponse);
        }

        //STORE SEASON STATS
        if(playerResponse.seasonTotals instanceof Array) {

          //ADD PLAYER ID TO STATS PRIOR TO INSERT
          playerResponse.seasonTotals.forEach(stat => {
            stat.playerId = playerId;
          });

          this.db.seasonStats.bulkPut(playerResponse.seasonTotals);
        }

        return playerResponse;
        
      }));

      combineLatestAll(players$.forEach).subscribe(() => {
        console.warn('Processing complete');

        this.db.players.bulkPut(players).then(result => {
          dbSubject.next(players); 
        });
      });

    });

    return dbSubject.asObservable();

  }

  seedAll(): Observable<any> {

    let seedAll$ = new Subject<void>();

    this.seedTeams().pipe(take(1)).subscribe(teams => {

      //FILTER TO CURRENT TEAMS BASED ON ENV SETTINGS
      const currentTeams = teams.filter(x => environment.currentTeams.findIndex(y => y.id == x.id) >= 0);
      currentTeams.sort((a,b) => a.fullName.localeCompare(b.fullName));

      console.warn(currentTeams);

      let teams$: Array<Observable<dataModel.Player[]>> = [];
      currentTeams.slice(0,1).forEach(team => {

        if(!team.triCode) {
          console.warn('Failed to import roster: triCode is missing')
          console.warn(team);
          return;
        }

        teams$.push(this.seedTeamPlayers(team.triCode));

      });

      combineLatest(teams$).pipe(take(1)).subscribe(response => {
        console.warn('Requests completed');
        console.warn(response);
      });

    });

    return seedAll$.asObservable();

  }

  getTeams(): Promise<dataModel.Team[]> {
    return this.db.teams.orderBy('fullName').toArray();
  }

  getTeam(teamId: number|string): Promise<dataModel.Team> {
    return this.db.teams.where({id: teamId}).first();
  }

  getRoster(teamId: number|string): Promise<dataModel.Player[]> {
    return this.db.players.where({teamId: teamId}).sortBy('lastName');
  }

}
