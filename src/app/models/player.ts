import { Position } from './position';
import { PlayerAttributes } from './player-attributes';

export class Player {
  id: number;
  teamId?: number;
  active: boolean;
  fullName: string;
  headshot: string;
  link?: string;
  imageUrl?: string;
  actionImageUrl?: string;
  firstName: string;
  lastName: string;
  primaryNumber: number | string;
  jerseyNumber: number | string;
  sweaterNumber: number;
  birthDate: Date | string;
  currentAge: number;
  birthCity: string;
  birthStateProvince: string;
  birthCountry: string;
  nationality: string;
  height: number | string;
  heightInCentimeters: number;
  heightInInches: number;
  weight: number;
  weightInKilograms: number;
  weightInPounds: number;
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
  positionCode: string;
  primaryPosition: Position;
  totalCups?: number;
  morale?: number;
  star?: boolean;
  attributes?: PlayerAttributes;

  constructor() {

  }
}
