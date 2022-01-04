import { Injectable } from '@angular/core';
import { Observable, Subject, of, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { DatabaseService } from './database.service'

export interface SearchResult {
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchResults$ = new Subject<SearchResult[]>();
  private searchResults: SearchResult[] = [];

  constructor(private dbService: DatabaseService) { }

  search(query: string) {

    query = (query || '').trim().toLowerCase();

    if (!query) {
      this.searchResults$.next([]);
      return;
    }

    this.searchResults = [];

    //TOO: Search DB here
    let db = this.dbService.getDatabase();

    Promise.all([
      db.teams.filter(team => {
        return (team.name.toLowerCase().indexOf(query) >= 0);
      }).toArray(),
      db.players.filter(player => {
        return (player.fullName.toLowerCase().indexOf(query) >= 0);
      }).toArray()],
    ).then(result => {
      console.warn(result);
    });

  }

}
