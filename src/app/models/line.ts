import { Player } from './player';

export class Line {
  lineNumber: number = 1;
  center: Player;
  leftWing: Player;
  rightWing: Player;
  leftDefense: Player;
  rightDefense: Player;
}
