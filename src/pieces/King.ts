import Piece from "./Piece";

export default class King extends Piece {
	constructor(playerId: number) {
		super(
			playerId,
			playerId === 1
				? "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg"
				: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg"
		); // Set the background image of the piece depending on the player color
	}

	isMovePossible(src: number, dest: number): boolean {
		return (
			src - 9 === dest ||
			src - 8 === dest ||
			src - 7 === dest ||
			src + 1 === dest ||
			src + 9 === dest ||
			src + 8 === dest ||
			src + 7 === dest ||
			src - 1 === dest
		);
	}

	/**
	 * always returns empty array because of one step
	 */
	getSrcToDestPath(src: number, dest: number): Array<number> {
		return [];
	}
}