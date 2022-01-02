import Dexie, { Table } from 'dexie';
import * as dataModel from '../app/models/models'

export class HockeyEngineDB extends Dexie {

  players!: Table<dataModel.Player, number>;
  teams!: Table<dataModel.Team, number>;
  coaches!: Table<dataModel.Coach, number>;
  divisions!: Table<dataModel.Division, number>;

  constructor() {

    super('HockeyEngine');
    this.version(1).stores({
      players: 'id,teamId,lastName',
      teams: 'id,teamName,name',
      coaches: 'id,lastName',
      divisions: 'id'
    });

    this.on('populate', () => this.populate());

  }

  async populate() {

  }

}
