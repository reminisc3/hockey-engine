import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
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
