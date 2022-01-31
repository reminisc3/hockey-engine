import { Division } from './division';
import { Player } from './player';
import { DatabaseService } from '../services/database.service';

export class Team {
  id: number;
	name: string;
	link?: string;
	venue: {
		name: string;
		link?: string;
		city: string;
		timeZone?: {
			id: string;
			offset: number;
			tz: string;
		};
	};
  abbreviation: string;
  teamName: string;
  locationName: string;
  firstYearOfPlay?: string|number;
  division: Division;
  conference: {
    id: number;
    name: string;
    link?: string;
  };
  franchise: {
    franchiseId: number;
    teamName: string;
    link?: string;
  };
  shortName: string;
  officialSiteUrl?: string;
  franchiseId: number;
  active?: boolean;

  constructor(private dbService: DatabaseService) {

  }

  getRoster(): Promise<Player[]> {
    return this.dbService.getRoster(this.id);
  }

}
