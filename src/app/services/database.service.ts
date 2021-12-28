import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Dexie, { Table } from 'dexie';
import { importDB, exportDB, importInto, peakImportFile } from 'dexie-export-import';

import { HockeyEngineDB } from '../../db/db';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private db: HockeyEngineDB;

  constructor(private http: HttpClient) {
    this.db = new HockeyEngineDB();
  }

  //TODO
  private progressIOCallback({ totalRows, completedRows }): boolean {
    console.warn('Total Rows: ${totalRows}, Completed Rows: ${completedRows}');
    return true;
  }

  export(): Promise<Blob> {
    return this.db.export({ prettyJson: true, progressCallback: this.progressIOCallback });
  }

  async import(file: File) {
    await this.db.delete();
    this.db = await HockeyEngineDB.import(file, {
      progressCallback: this.progressIOCallback
    }) as HockeyEngineDB;
  }

}
