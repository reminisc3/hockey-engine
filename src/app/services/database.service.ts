import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as localForage from "localforage";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

	private databaseUrl: string = 'assets/database/database.json';
	private database: LocalForage = localForage;

  constructor(private http: HttpClient) {

		//Configure Database
		this.database.config({
			driver: localForage.INDEXEDDB,
			name: 'hockeyEngine',
			version: 1.0,
			description: 'Database for HockeyEngine application'
		});

		//Load Database
		this.getDataFile().subscribe(data => {
			Object.keys(data).forEach((v, k) => {
				this.database.setItem(v, data[v]);
			});
		});

	}

	getDatabase() : any {
		return this.database;
	}

	getDataFile() : Observable<any> {
		return this.http.get(this.databaseUrl);
	}

}
