import Piece from "./Piece";

export default class Pawn extends Piece {
	initialPositions: {
		1: number[],
		2: number[],
	}
	constructor(playerId: number) {
		super(
			playerId,
			playerId === 1
			? "/pawn_white.svg"
			: "/pawn_black.svg"
		);
		this.initialPositions = {
			1: [48, 49, 50, 51, 52, 53, 54, 55],
			2: [8, 9, 10, 11, 12, 13, 14, 15],
		};
	}

	isMovePossible(src: number, dest: number, isDestEnemyOccupied: boolean): boolean {
		if (this.playerId === 1) {
			if (
				(dest === src - 8 && !isDestEnemyOccupied) ||
				(dest === src - 16 &&
					this.initialPositions[1].indexOf(src) !== -1)
			) {
				return true;
			} else if (
				isDestEnemyOccupied &&
				(dest === src - 9 || dest === src - 7)
			) {
				return true;
			}
		} else if (this.playerId === 2) {
			if (
				(dest === src + 8 && !isDestEnemyOccupied) ||
				(dest === src + 16 &&
					this.initialPositions[2].indexOf(src) !== -1)
			) {
				return true;
			} else if (
				isDestEnemyOccupied &&
				(dest === src + 9 || dest === src + 7)
			) {
				return true;
			}
		}
		return false;
	}

	getSrcToDestPath(src: number, dest: number): Array<number> {
		if (dest === src - 16) {
			return [src - 8];
		} else if (dest === src + 16) {
			return [src + 8];
		}
		return [];
	}
}