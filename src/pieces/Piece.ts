export default class Piece {
	playerId: number;
	iconUrl: string;
	style: {
		backgroundColor: string,
	};
	classes: string;

	constructor(playerId: number, iconUrl: string) {
		this.playerId = playerId;
		this.iconUrl = iconUrl;
		this.style = {
			backgroundColor: ""
		};
		this.classes = "";
	}

	isMovePossible(src: number, dest: number, isDestEnemyOccupied: boolean): boolean {
		return false;
	}

	getSrcToDestPath(src: number, dest: number): Array<number> {
		return [];
	}

	setBackgroundColor(color: string): void {
		this.style = {
			...this.style,
			backgroundColor: color,
		};
	}
}