import { combineLatestAll, concatAll, forkJoin, map, Observable, of, Subject, switchMap } from 'rxjs';
import { GameStats } from './game-stats';
import { Team } from './team';

const events = [
  {type: 'shot', probability: 0.6},
  {type: 'goal', probability: 0.25},
  {type: 'hit', probability: 0.65},
  {type: 'faceoff', probability: 0.1},
  {type: 'penalty', probability: 0.1}
];

export class Game {
  date: Date = new Date();
  homeTeam: Team;
  awayTeam: Team;
  stats: GameStats;
  currentPeriod: number = 1;
  timeRemaining: number = 1200; //20 Minutes in Seconds

  constructor(homeTeam: Team, awayTeam: Team) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
  }

  private init(): Observable<any> {

    let init$ = new Subject<void>();

    //Observables for retrieving rosters for both teams
    const homePlayers$ = this.homeTeam.roster ? of(this.homeTeam.roster) : of(
      this.homeTeam.getRoster())
      .pipe(
        switchMap(x => x.then(players => players)),
        map(players => this.homeTeam.roster = players)
    );
    const awayPlayers$ = this.awayTeam.roster ? of(this.awayTeam.roster) : of(
      this.awayTeam.getRoster())
      .pipe(
        switchMap(x => x.then(players => players)),
        map(players => this.awayTeam.roster = players)
    );

    //After rosters are retrieved, build lines if they are not present
    const roster$ = of([homePlayers$, awayPlayers$]).pipe(combineLatestAll());

    roster$.subscribe(rosters => {

      //Observables for building lines for both teams
      const homeLine$ = this.homeTeam.lines ? of(this.homeTeam.lines) : of(
        this.homeTeam.autoBuildLines())
        .pipe(
          switchMap(lines => lines),
          map(lines => this.homeTeam.lines = lines)
        );

      const awayLines$ = this.awayTeam.lines ? of(this.awayTeam.lines) : of(
        this.awayTeam.autoBuildLines())
        .pipe(
          switchMap(lines => lines),
          map(lines => this.awayTeam.lines = lines)
        );

      const lines$ = of([homeLine$, awayLines$]).pipe(combineLatestAll());

      lines$.subscribe(lines => {
        init$.next();
        init$.complete();
      })

    });

    return init$.asObservable();

  }

  simulateEvent() {

    const eventChance = Math.random();
    const attackingTeam = Math.random() < 0.5 ? this.homeTeam : this.awayTeam;
    const defendingTeam = attackingTeam == this.homeTeam ? this.awayTeam : this.homeTeam;

    const attackingPlayers = attackingTeam.roster;
    const defendingPlayers = defendingTeam.roster;

    //TODO: Use lines to group players together
    const attackingPlayer = attackingPlayers[Math.floor(Math.random() * attackingPlayers.length)];
    const defendingPlayer = defendingPlayers[Math.floor(Math.random() * attackingPlayers.length)];

    //Simulate a random event within the probability threshhold
    const targetEvents = events.filter(event => event.probability <= eventChance);
    if (targetEvents.length == 0) {
      return;
    }

    const event = targetEvents[Math.floor(Math.random() * targetEvents.length)];

    if (event.type == 'shot') {

      attackingPlayer.gameStats.shots++;
      attackingTeam.gameStats.shots++;

      // Chance to be on goal based on shooting rating
      if (Math.random() < attackingPlayer.attributes.shooting / 100) {

        //TODO: Track goal assists
        //const assister = attackingTeam.players[Math.floor(Math.random() * attackingTeam.players.length)];

        // Chance to score based on shooting and offense ratings
        if (Math.random() < (attackingPlayer.attributes.shooting + attackingPlayer.attributes.offense) / 200) {

          attackingPlayer.gameStats.goals++;
          attackingPlayer.gameStats.points++;
          attackingTeam.gameStats.goals++;

          //Track Power Play stats
          // if (this.gameState.powerPlay === attackingTeam.name) {
          //     shooter.stats.ppg++;
          //     attackingTeam.teamStats.powerPlayGoals++;
          // }

          // if (this.gameState.powerPlay === defendingTeam.name) {
          //     shooter.stats.shg++;
          // }

          attackingPlayer.gameStats.plusMinus++;

          // if (assister !== shooter && Math.random() < assister.ratings.passing / 100) {
          //     assister.stats.assists++;
          //     assister.stats.points++;
          //     assister.stats.plusMinus++;
          // }
        }
      }

    }
    else if (event.type == 'hit') {

    }
    else if (event.type == 'faceoff') {

    }
    else if (event.type == 'penalty') {

    }
    else {
      return;
    }

  }

  simulatePeriod() {

    const eventsPerPeriod = 60;
    this.timeRemaining = 1200;

    for(let i=0; i < eventsPerPeriod; i++) {
      this.simulateEvent();
    }

    this.currentPeriod++;

  }

  simulate() {

    this.init().subscribe(result => {

      this.currentPeriod = 1;

      while(this.currentPeriod <= 3) {
        this.simulatePeriod();
      }

    });

  }

}
