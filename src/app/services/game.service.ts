import { Injectable } from '@angular/core';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  simulate(game: Game) {
    console.warn(game);
  }

}
