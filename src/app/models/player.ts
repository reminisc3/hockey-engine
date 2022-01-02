import { Position } from './position';

export class Player {
	person?: {
		id: number|string,
		fullName: string,
		link?: string
	};
	id: number;
	teamId?: number;
	active: boolean;
	fullName: string;
	link?: string;
	firstName: string;
	lastName: string;
	primaryNumber: number|string;
	jerseyNumber: number|string;
	birthDate: Date|string;
	currentAge: number;
	birthCity: string;
	birthStateProvince: string;
	birthCountry: string;
	nationality: string;
	height: number|string;
	weight: number;
	alternateCaptain: boolean;
	captain: boolean;
	rookie: boolean;
	shootsCatches: string;
	rosterStatus: string|boolean;
	currentTeam?: {
		id: number;
		name: string;
		link?: string;
	};
	primaryPosition: Position;
	totalCups?: number;
	morale?: number;
	star?: boolean;
	attributes?: {
		overall: number;
		potential: number;
		offense: number;
		defense: number;
		faceoffs: number;
		motivation: number;
		speed: number;
		strength: number;
		shooting: number;
		passing: number;
		stickHandling: number;
	};
	
	constructor() {

	}
}
