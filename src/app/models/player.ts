import { Position } from './position';
import { PlayerAttributes } from './player-attributes';

export class Player {
  person?: {
    id: number | string,
    fullName: string,
    link?: string
  };
  id: number;
  teamId?: number;
  active: boolean;
  fullName: string;
  link?: string;
  imageUrl?: string;
  actionImageUrl?: string;
  firstName: string;
  lastName: string;
  primaryNumber: number | string;
  jerseyNumber: number | string;
  birthDate: Date | string;
  currentAge: number;
  birthCity: string;
  birthStateProvince: string;
  birthCountry: string;
  nationality: string;
  height: number | string;
  weight: number;
  alternateCaptain: boolean;
  captain: boolean;
  rookie: boolean;
  shootsCatches: string;
  rosterStatus: string | boolean;
  currentTeam?: {
    id: number;
    name: string;
    link?: string;
  };
  primaryPosition: Position;
  totalCups?: number;
  morale?: number;
  star?: boolean;
  attributes?: PlayerAttributes;

  constructor() {

  }
}
