// db.ts
import Dexie, { Table } from 'dexie';


//Models
import {*} from '../app/classes/models'

export class AppDB extends Dexie {

  players!: Table<Player, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(3).stores({
      players: '++id'
    });
    this.on('populate', () => this.populate());
  }

  async populate() {

  }
}

export const db = new AppDB();
