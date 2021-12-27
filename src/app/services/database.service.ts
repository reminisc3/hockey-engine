import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Dexie, { Table } from 'dexie';
import * as dataModel from '../models/models'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService extends Dexie {

  private databaseUrl: string = 'assets/database/database.json';
  players!: Table<dataModel.Player, number>;

  constructor(private http: HttpClient) {

    super('ngdexieliveQuery');
    this.version(3).stores({
      players: '++id'
    });
    this.on('populate', () => this.populate());

    //Load Database
    this.getDataFile().subscribe(data => {

    });

  }

  async populate() {

  }

  getDatabase(): any {
  }

  getDataFile(): Observable<any> {
    return this.http.get(this.databaseUrl);
  }

}
