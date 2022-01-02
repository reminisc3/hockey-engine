import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'HockeyEngine';
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private db: DatabaseService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {

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

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  exportDatabase() {
    this.db.export().then(blob => {
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  ngOnInit() {

  }

}
