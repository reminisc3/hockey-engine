import { Game } from './game';
import { Line } from './line';

export class TeamGame extends Game {
  teamId: string|number;
  lines: Line[];
  timeOnAttack: number = 0;
}
