import { Player } from "./player";

export class TeamLine {
    lineNumber: number = 1;
    players: Player[] = [];
    powerPlay: boolean = false;
    penaltyKill: boolean = false;
}
