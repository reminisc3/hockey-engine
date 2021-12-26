import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

/** Material UI **/
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

/** HockeyEngine**/
import { DatabaseService } from './services/database.service';

import { PlayerListComponent } from './components/player-list/player-list.component';
import { PlayerComponent } from './components/player/player.component';
import { TeamListComponent } from './components/team-list/team-list.component';
import { TeamComponent } from './components/team/team.component';

@NgModule({
	declarations: [
		AppComponent,
		PlayerListComponent,
		PlayerComponent,
		TeamListComponent,
		TeamComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		BrowserAnimationsModule,
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

		/** Material UI Imports **/
		MatMenuModule,
		MatIconModule,
		MatToolbarModule,
		MatButtonModule,
		MatTableModule,

		/** Routing **/
		AppRoutingModule
	],
	providers: [
		DatabaseService
	],
	bootstrap: [AppComponent]
})
export class AppModule {

	constructor() { }

}
