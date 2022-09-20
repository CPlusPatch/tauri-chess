import React from "react";
import initializeChessBoard from "../helpers/initializeChessBoard";
import Piece from "../pieces/Piece";
import Board from "./Board";

export default class Game extends React.Component {
	state: {
		squares: Array<Piece | null>;
		whiteFallenSoldiers: Array<Piece>;
		blackFallenSoldiers: Array<Piece>;
		player: number;
		sourceSelection: number;
		status: string;
		turn: "white" | "black";
	};
	
	constructor(props: any) {
		super(props);
		this.state = {
			squares: initializeChessBoard(),
			whiteFallenSoldiers: [],
			blackFallenSoldiers: [],
			player: 1,
			sourceSelection: -1,
			status: "",
			turn: "white",
		};
	}

	handleClick(i: number) {
		var squares = this.state.squares.slice();

		if (this.state.sourceSelection === -1) {
			if (!squares[i] || squares[i]!.playerId !== this.state.player) {
				this.setState({
					status:
						"Wrong selection. Choose player " +
						this.state.player +
						" pieces.",
				});
				squares[i] ? squares[i]!.setBackgroundColor("") : null;
			} else {
				squares[i]!.setBackgroundColor("RGB(111,143,114)") // Emerald from http://omgchess.blogspot.com/2015/09/chess-board-color-schemes.html
				this.setState({
					status: "Choose destination for the selected piece",
					sourceSelection: i,
				});
			}
		} else if (this.state.sourceSelection > -1) {
			//console.log(squares[this.state.sourceSelection]!.style.backgroundColor);
			squares[this.state.sourceSelection]?.setBackgroundColor("");
			if (squares[i] && squares[i]!.playerId === this.state.player) {
				this.setState({
					status: "Wrong selection. Choose valid source and destination again.",
					sourceSelection: -1,
				});
			} else {
				var squares = this.state.squares.slice();
				var whiteFallenSoldiers =
					this.state.whiteFallenSoldiers.slice();
				var blackFallenSoldiers =
					this.state.blackFallenSoldiers.slice();
				var isDestEnemyOccupied = squares[i] ? true : false;
				var isMovePossible = squares[
					this.state.sourceSelection
				]!.isMovePossible(
					this.state.sourceSelection,
					i,
					isDestEnemyOccupied
				);
				const srcToDestPath = squares[
					this.state.sourceSelection
				]!.getSrcToDestPath(this.state.sourceSelection, i);
				const isMoveLegal = this.isMoveLegal(srcToDestPath);

				if (isMovePossible && isMoveLegal) {
					if (squares[i] !== null) {
						if (squares[i]!.playerId === 1) {
							whiteFallenSoldiers.push(squares[i]!);
						} else {
							blackFallenSoldiers.push(squares[i]!);
						}
					}
					console.log("whiteFallenSoldiers", whiteFallenSoldiers);
					console.log("blackFallenSoldiers", blackFallenSoldiers);
					squares[i] = squares[this.state.sourceSelection];
					squares[this.state.sourceSelection] = null;
					let player = this.state.player === 1 ? 2 : 1;
					let turn = this.state.turn === "white" ? "black" : "white";
					this.setState({
						sourceSelection: -1,
						squares: squares,
						whiteFallenSoldiers: whiteFallenSoldiers,
						blackFallenSoldiers: blackFallenSoldiers,
						player: player,
						status: "",
						turn: turn,
					});
				} else {
					this.setState({
						status: "Wrong selection. Choose valid source and destination again.",
						sourceSelection: -1,
					});
				}
			}
		}
	}

	/**
	 * Check all path indices are null. For one steps move of pawn/others or jumping moves of knight array is empty, so  move is legal.
	 */
	isMoveLegal(srcToDestPath: number[]): boolean {
		let isLegal = true;
		for (let i = 0; i < srcToDestPath.length; i++) {
			if (this.state.squares[srcToDestPath[i]] !== null) {
				isLegal = false;
			}
		}
		return isLegal;
	}

	render() {
		return (
			<div>
				<div className="flex flex-row gap-4">
					<div className="col-4">
						<Board
							squares={this.state.squares}
							onClick={(i: number) => this.handleClick(i)}
							turn={this.state.turn}
						/>
					</div>
					<div className="col-3 font-sans font-black">
						<h3>It is {this.state.turn.toUpperCase()}'s turn to play</h3>
						<div>
							Pieces lost:<br/>
							White: {this.state.whiteFallenSoldiers.length}<br/>
							Black: {this.state.blackFallenSoldiers.length}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
