import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from '../models/team';
import { Player } from '../models/player';
import { Division } from '../models/division';

@Injectable({
  providedIn: 'root'
})
export class NhlApiService {

  private apiUrl: string = '/api/nhl';
  private apiWebUrl: string = '/api-web/nhl';

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get(this.apiUrl + '/stats/rest/en/team').pipe(map((data: any) => data.data));
  }

  getFranchises(): Observable<Team[]> {
    return this.http.get(this.apiUrl + '/stats/rest/en/franchise').pipe(map((data: any) => data.data));
  }

  getTeam(id: number): Observable<Team> {
    return this.http.get<Team>(this.apiUrl + '/team/' + id);
  }

  getRoster(teamId: number|string): Observable<Player[]> {
    return this.http.get<Player[]>(this.apiWebUrl + '/roster/' + teamId + '/20232024').pipe(map((data: any) => [data.forwards,data.defensemen,data.goalies].flatMap(x => x) as Player[]));
  }

  getPlayer(personId: number|string): Observable<Player> {
    return this.http.get<Player>(`${this.apiWebUrl}/player/${personId}/landing`).pipe(map(data => data));
  }

  getDivisions(): Observable<Division[]> {
    return this.http.get<Division[]>(this.apiUrl + '/divisions');
  }

}
