import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { DatabaseService } from './services/database.service';
import { SearchService, SearchResult } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'HockeyEngine';
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  searchControl = new FormControl();
  searchEnabled: boolean = false;
  searchResults$ = new Subject<SearchResult[]>();

  constructor(
    private db: DatabaseService,
    private searchService: SearchService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    //Seed Teams from NHL API
    db.getTeams().then(teams => {
      if (teams.length == 0) {
        db.seedTeams();
      }
    });

    //Seed Players from NHL API
    db.seedPlayers();

  }

  ngOnInit() {

    //So we do not have to expose SearchService to public
    this.searchResults$ = this.searchService.searchResults$;

    this.searchControl.valueChanges.subscribe(query => {
      this.searchService.search(query);
    });

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  toggleSearch() {
    this.searchEnabled = !this.searchEnabled;
  }

  exportDatabase() {
    this.db.export().then(blob => {
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

}
