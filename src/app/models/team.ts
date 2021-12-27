import { Division } from './division';

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
}
