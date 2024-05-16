import { Position } from './position';
import { PlayerAttributes } from './player-attributes';
import { DraftDetails } from './draft-details';
import { SeasonStats } from './season-stats';

export class Player {
  id: number;
  playerId?: number;
  teamId?: number|string;
  active: boolean;
  fullName: string;
  headshot: string;
  link?: string;
  imageUrl?: string;
  heroImage?: string;
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
  positionCode: string;
  primaryPosition: Position;
  totalCups?: number;
  morale?: number;
  star?: boolean;
  superstar?: boolean;
  attributes?: PlayerAttributes;
  seasonTotals: SeasonStats[];
  draftDetails?: DraftDetails;

  constructor() {

  }
  
}
