export class Player {
	firstName: string;
	lastName: string;
	dateOfBirth: Date;
	age: number;
	position: string;
	teamId: number;
	totalCups: number;
	morale: number;
	star: boolean;
	potential: number;
	attributes: {
		overall: number;
		offense: number;
		defense: number;
		faceoffs: number;
		motivation: number;
		speed: number;
		strength: number;
		shooting: number;
		passing: number;
		stickHandling: number;
	}
}
