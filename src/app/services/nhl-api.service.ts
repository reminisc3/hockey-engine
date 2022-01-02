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

  private apiUrl: string = 'https://statsapi.web.nhl.com/api/v1';

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get(this.apiUrl + '/teams').pipe(map(data => data['teams']));
  }

  getTeam(id: number): Observable<Team> {
    return this.http.get<Team>(this.apiUrl + '/team/' + id);
  }

  getRoster(teamId: number|string): Observable<Player[]> {
    return this.http.get<Player[]>(this.apiUrl + '/teams/' + teamId + '/roster').pipe(map(data => data['roster']));
  }

  getPlayer(personId: number|string): Observable<Player> {
    return this.http.get<Player>(this.apiUrl + '/people/' + personId).pipe(map(data => data['people'][0]));
  }

  getDivisions(): Observable<Division[]> {
    return this.http.get<Division[]>(this.apiUrl + '/divisions');
  }

}
