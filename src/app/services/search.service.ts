import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
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

    this.searchResults = [];

    //TOO: Search DB here

    this.searchResults$.next(this.searchResults);

  }

}
