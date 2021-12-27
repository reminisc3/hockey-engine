import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
		return this.http.get<Team[]>(this.apiUrl + '/teams');
	}

	getTeam(id: number): Observable<Team> {
		return this.http.get<Team>(this.apiUrl + '/team/' + id);
	}

	getRoster(teamId: number): Observable<Player[]> {
		return this.http.get<Player[]>(this.apiUrl + '/teams/' + teamId + '/roster');
	}

	getDivisions(): Observable<Division[]> {
		return this.http.get<Division[]>(this.apiUrl + '/divisions');
	}

}
