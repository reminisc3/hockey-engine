import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

/** Material UI **/
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';

/** HockeyEngine**/
import { DatabaseService } from './services/database.service';
import { NhlApiService } from './services/nhl-api.service';
import { SearchService } from './services/search.service';
import { GameService } from './services/game.service';
import { AiService } from './services/ai.service';

import { PlayerListComponent } from './components/player-list/player-list.component';
import { PlayerComponent } from './components/player/player.component';
import { TeamListComponent } from './components/team-list/team-list.component';
import { TeamComponent } from './components/team/team.component';
import { HomeComponent } from './components/home/home.component';
import { FranchiseComponent } from './components/franchise/franchise.component';
import { FranchiseListComponent } from './components/franchise-list/franchise-list.component';
import { GameComponent } from './components/game/game.component';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerListComponent,
    PlayerComponent,
    TeamListComponent,
    TeamComponent,
    HomeComponent,
    FranchiseComponent,
    GameComponent,
    FranchiseListComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

    /** Material UI Imports **/
    FormsModule, ReactiveFormsModule,
    FlexLayoutModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,

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
    NhlApiService,
    SearchService,
    GameService,
    AiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() { }

}
