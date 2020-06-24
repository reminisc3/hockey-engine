import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as localForage from "localforage";

export interface IDataStore {
	name: string;
	dataStore: LocalForage;
}

@Injectable({
	providedIn: 'root'
})
export class DatabaseService {

	private databaseUrl: string = 'assets/database/database.json';
	private database: LocalForage = localForage;
	private dataStores: IDataStore[] = [];

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
				var dataStore = this.database.createInstance({ name: v });
				this.dataStores.push({ name: v, dataStore: dataStore });
				//Add objects to datastore
				for (var i = 0; i < data[v].length; i++) {
					var obj = data[v][i];
					dataStore.setItem(obj.id, obj);
				}

			});
		});

	}

	getDatabase(): any {
		return this.database;
	}

	getDataFile(): Observable<any> {
		return this.http.get(this.databaseUrl);
	}

}
