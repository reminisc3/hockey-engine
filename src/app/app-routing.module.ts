import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TeamListComponent } from './components/team-list/team-list.component';
import { TeamComponent } from './components/team/team.component';
import { FranchiseComponent } from './components/franchise/franchise.component';
import { FranchiseListComponent } from './components/franchise-list/franchise-list.component';
import { PlayerComponent } from './components/player/player.component';
import { PlayerListComponent } from './components/player-list/player-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'teams', component: TeamListComponent },
  { path: 'team/:id', component: TeamComponent },
  { path: 'player/:id', component: PlayerComponent },
  { path: 'players', component: PlayerListComponent },
  { path: 'franchise', component: FranchiseListComponent },
  { path: 'franchise/:id', component: FranchiseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
