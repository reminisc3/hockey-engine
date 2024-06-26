import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

/** Material UI **/
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from 'ngx-flexible-layout';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
import { proxyInterceptor } from './interceptors/proxy.interceptor';
import { LoadingService } from './services/loading.service';
import { httpInterceptor } from './interceptors/http.interceptor';

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
    MatExpansionModule,
    MatProgressBarModule,

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
    AiService,
    LoadingService,
    provideHttpClient(
      withInterceptors([
        httpInterceptor,
        proxyInterceptor
      ])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() { }

}
