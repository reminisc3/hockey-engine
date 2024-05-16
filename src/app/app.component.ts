import { Component, ChangeDetectorRef } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { Observable, Subject, take } from 'rxjs';
import { DatabaseService } from './services/database.service';
import { SearchService, SearchResult } from './services/search.service';
import { environment } from 'src/environments/environment';
import { NhlApiService } from './services/nhl-api.service';
import { Team } from './models/team';
import { Player } from './models/player';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'HockeyEngine';
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  searchControl = new UntypedFormControl();
  searchEnabled: boolean = false;
  searchResults$ = new Subject<SearchResult[]>();

  constructor(
    private db: DatabaseService,
    private nhlApi: NhlApiService,
    private searchService: SearchService,
    public loadingService: LoadingService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

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
