export default class Piece {
	playerId: number;
	iconUrl: string;
	style: {
		backgroundImage: string,
		backgroundColor: string,

	};

	constructor(playerId: number, iconUrl: string) {
		this.playerId = playerId;
		this.iconUrl = iconUrl;
		this.style = {
			backgroundImage: "url('" + iconUrl + "')",
			backgroundColor: ""
		};
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