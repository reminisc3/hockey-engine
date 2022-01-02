import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamListComponent } from './components/team-list/team-list.component';
import { TeamComponent } from './components/team/team.component';
import { PlayerComponent } from './components/player/player.component';
import { PlayerListComponent } from './components/player-list/player-list.component';

const routes: Routes = [
  { path: 'teams', component: TeamListComponent },
	{ path: 'team/:id', component: TeamComponent },
	{ path: 'player/:id', component: PlayerComponent },
  { path: 'players', component: PlayerListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
