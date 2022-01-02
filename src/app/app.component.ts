import { Component } from '@angular/core';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Hockey Engine';

  constructor(private db: DatabaseService) {

    //Seed Teams from NHL API
    db.getTeams().then(teams => {
      if (teams.length == 0) {
        db.seedTeams();
      }
    });

    //Seed Players from NHL API
    db.seedPlayers();

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
