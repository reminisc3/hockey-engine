import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

/** Material UI **/
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

/** HockeyEngine**/
import { DatabaseService } from './services/database.service';
import { NhlApiService } from './services/nhl-api.service';

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
    FlexLayoutModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,

    /** Routing **/
    AppRoutingModule,
     ServiceWorkerModule.register('ngsw-worker.js', {
       enabled: environment.production,
       // Register the ServiceWorker as soon as the app is stable
       // or after 30 seconds (whichever comes first).
       registrationStrategy: 'registerWhenStable:30000'
     })
  ],
  providers: [
    DatabaseService,
    NhlApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() { }

}
