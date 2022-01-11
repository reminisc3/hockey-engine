import { Line } from './line';

export class Shift {
  line: Line;
  timeOnIce: number = 0;
  goals: number = 0;
  assists: number = 0;
  points: number = 0;
  plusMinus: number = 0;
  penaltyMins: number = 0;
  shotsOnGoal: number = 0;
  hits: number = 0;
  blocks: number = 0;
  giveaways: number = 0;
  takeaways: number = 0;
  powerplay: boolean = false;
  penaltyKill: boolean = false;
}
