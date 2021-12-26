import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DatabaseService {

	private databaseUrl: string = 'assets/database/database.json';

	constructor(private http: HttpClient) {

		//Load Database
		this.getDataFile().subscribe(data => {

		});

	}

	getDatabase(): any {
	}

	getDataFile(): Observable<any> {
		return this.http.get(this.databaseUrl);
	}

}
