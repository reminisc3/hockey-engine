import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { from, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { liveQuery } from 'dexie';
import "dexie-export-import";
import { NhlApiService } from './nhl-api.service';
import { HockeyEngineDB } from '../../db/db';
import * as dataModel from '../models/models';

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

  seedTeams() {
    this.nhlService.getTeams().subscribe(teams => {
      this.db.teams.bulkPut(teams);
    });
  }

  seedTeamPlayers(id: string) {
    this.nhlService.getRoster(id).subscribe(players => {

    });
  }

  seedPlayers() {
    from(this.getTeams()).pipe(
      mergeMap(teams => teams.filter(x => x.triCode)),
      mergeMap(team => this.nhlService.getRoster(team.triCode)),
      mergeMap(players => {

        console.warn(players);

        let ids = of(players.map(player => player.id));

        return ids.pipe(
          mergeMap(id => id),
          mergeMap(async (id) => {
            let missingIds: (string | number)[] = [];
            let count = await this.db.players.where({ id: id }).count();
            if (count == 0) {
              missingIds.push(id);
            }

            return missingIds;
          })
        );
      }),
      mergeMap(ids => ids),
      mergeMap(personId => {
        return this.nhlService.getPlayer(personId)
      })
    ).subscribe(player => {
      player.teamId = player.teamId || player.currentTeam.id;
      player.imageUrl = 'https://cms.nhl.bamgrid.com/images/headshots/current/168x168/' + player.id + '.jpg';
      player.actionImageUrl = 'https://cms.nhl.bamgrid.com/images/actionshots/' + player.id + '.jpg';
      this.db.players.put(player).then(result => {
        console.log('Added ' + player.fullName + ' to database');
      })
    });
  }

  seedAll() {

  }

  getTeams(): Promise<dataModel.Team[]> {
    return this.db.teams.orderBy('fullName').toArray();
  }

  getTeam(teamId: number|string): Promise<dataModel.Team> {
    return this.db.teams.where({id: teamId}).first();
  }

  getRoster(teamId: number|string): Promise<dataModel.Player[]> {
    return this.db.players.where({franchiseId: teamId}).sortBy('lastName');
  }

}
