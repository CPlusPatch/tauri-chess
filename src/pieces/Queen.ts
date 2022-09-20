import Piece from "./Piece";

export default class Queen extends Piece {
	constructor(playerId: number) {
		super(
			playerId,
			playerId === 1
				? "/queen_white.svg"
				: "/queen_black.svg"
		);
	}

	isMovePossible(src: number, dest: number): boolean {
		let mod = src % 8;
		let diff = 8 - mod;

		return (
			Math.abs(src - dest) % 9 === 0 ||
			Math.abs(src - dest) % 7 === 0 ||
			Math.abs(src - dest) % 8 === 0 ||
			(dest >= src - mod && dest < src + diff)
		);
	}

	/**
	 * get path between src and dest (src and dest exclusive)
	 */
	getSrcToDestPath(src: number, dest: number): Array<number> {
		let path = [],
			pathStart,
			pathEnd,
			incrementBy;
		if (src > dest) {
			pathStart = dest;
			pathEnd = src;
		} else {
			pathStart = src;
			pathEnd = dest;
		}
		if (Math.abs(src - dest) % 8 === 0) {
			incrementBy = 8;
			pathStart += 8;
		} else if (Math.abs(src - dest) % 9 === 0) {
			incrementBy = 9;
			pathStart += 9;
		} else if (Math.abs(src - dest) % 7 === 0) {
			incrementBy = 7;
			pathStart += 7;
		} else {
			incrementBy = 1;
			pathStart += 1;
		}

		for (let i = pathStart; i < pathEnd; i += incrementBy) {
			path.push(i);
		}
		return path;
	}
}