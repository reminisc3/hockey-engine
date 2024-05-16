import Dexie, { Table } from 'dexie';
import * as dataModel from '../app/models/models'

export class HockeyEngineDB extends Dexie {

  players!: Table<dataModel.Player, number>;
  teams!: Table<dataModel.Team, number>;
  coaches!: Table<dataModel.Coach, number>;
  divisions!: Table<dataModel.Division, number>;
  seasonStats!: Table<dataModel.SeasonStats, number>;

  constructor() {

    super('HockeyEngine');
    this.version(1).stores({
      players: 'id,teamId,firstName,lastName,positionCode',
      teams: 'id,franchiseId,fullName,triCode',
      seasonStats: 'playerId',
      coaches: 'id,lastName',
      leagues: 'id,name',
      divisions: 'id'
    });

    this.on('populate', () => this.populate());

  }

  async populate() {

  }

}
