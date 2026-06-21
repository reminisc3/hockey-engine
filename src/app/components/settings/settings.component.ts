import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SettingsComponent implements OnInit {

  constructor(private db: DatabaseService) { }

  ngOnInit(): void {
    
  }

  onSyncAll() {
    this.db.seedAll();
  }

  onSyncTeams() {
    
  }

  onSyncPlayers() {
    
  }

}
