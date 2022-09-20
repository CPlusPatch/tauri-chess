import React from "react";
import initializeChessBoard from "../helpers/initializeChessBoard";
import King from "../pieces/King";
import Piece from "../pieces/Piece";
import Board from "./Board";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

enum GameState {
	WHITE_WON,
	BLACK_WON,
	INVALID_SELECTION,
	IDLE
}

export default class Game extends React.Component {
	state: {
		squares: Array<Piece | null>;
		whiteFallenSoldiers: Array<Piece>;
		blackFallenSoldiers: Array<Piece>;
		player: number;
		sourceSelection: number;
		gameState: GameState;
		turn: "white" | "black";
		isGameOver: boolean;
	};

	constructor(props: any) {
		super(props);
		this.state = {
			squares: initializeChessBoard(),
			whiteFallenSoldiers: [],
			blackFallenSoldiers: [],
			player: 1,
			sourceSelection: -1,
			gameState: GameState.IDLE,
			turn: "white",
			isGameOver: false,
		};
	}

	handleClick(i: number) {
		var squares = this.state.squares.slice();
		if (this.state.isGameOver) return;

		if (this.state.sourceSelection === -1) {
			if (!squares[i] || squares[i]!.playerId !== this.state.player) {
				this.setState({
					gameState: GameState.INVALID_SELECTION,
				});
				squares[i] ? squares[i]!.setBackgroundColor("") : null;
			} else {
				squares[i]!.setBackgroundColor("RGB(111,143,114)"); // Emerald from http://omgchess.blogspot.com/2015/09/chess-board-color-schemes.html
				this.setState({
					gameState: GameState.IDLE,
					sourceSelection: i,
				});
			}
		} else if (this.state.sourceSelection > -1) {
			//console.log(squares[this.state.sourceSelection]!.style.backgroundColor);
			squares[this.state.sourceSelection]?.setBackgroundColor("");
			if (squares[i] && squares[i]!.playerId === this.state.player) {
				this.setState({
					gameState: GameState.INVALID_SELECTION,
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
					if (this.isGameOver(whiteFallenSoldiers, blackFallenSoldiers)) {
						const winner =
							this.isGameOver(whiteFallenSoldiers, blackFallenSoldiers) === "white" ? "White" : "Black";
						console.info(`🎉 Congrats ${winner} for winning!`);
						this.setState({
							gameState: winner === "White" ? GameState.WHITE_WON : GameState.BLACK_WON,
							sourceSelection: -1,
							squares: squares,
							whiteFallenSoldiers: whiteFallenSoldiers,
							blackFallenSoldiers: blackFallenSoldiers,
							isGameOver: true,
						});
					} else {
						let player = this.state.player === 1 ? 2 : 1;
						let turn = this.state.turn === "white" ? "black" : "white";
						this.setState({
							sourceSelection: -1,
							squares: squares,
							whiteFallenSoldiers: whiteFallenSoldiers,
							blackFallenSoldiers: blackFallenSoldiers,
							player: player,
							gameState: GameState.IDLE,
							turn: turn,
						});
					}

				} else {
					this.setState({
						gameState: GameState.INVALID_SELECTION,
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

	/**
	* Check if the game is over, returns the winner if yes.
	*/
	isGameOver(
		whiteFallenSoldiers: Array<Piece>,
		blackFallenSoldiers: Array<Piece>,
	): "white" | "black" | false {
		for (let i = 0; i < whiteFallenSoldiers.slice().length; i++) {
			if (whiteFallenSoldiers[i] instanceof King) return "black";
		}
		for (let i = 0; i < blackFallenSoldiers.slice().length; i++) {
			if (blackFallenSoldiers[i] instanceof King) return "white";
		}
		return false;
	}

	render() {
		return (
			<div>
				<div className="flex gap-4 flex-row">
					<div className="col-span-8">
						<Board
							squares={this.state.squares}
							onClick={(i: number) => this.handleClick(i)}
							turn={this.state.turn}
						/>
					</div>
					<div className="font-sans font-black w-48">
						{this.state.gameState === GameState.IDLE ? (
							<h3>
								Playing&nbsp;&middot;&nbsp;
								{this.state.turn === "white"
									? "White"
									: "Black"}
								's turn
							</h3>
						) : (
							<></>
						)}
						{this.state.gameState ===
						GameState.INVALID_SELECTION ? (
							<h3 className="text-red-600">Invalid selection</h3>
						) : (
							<></>
						)}
						{this.state.gameState === GameState.WHITE_WON ? (
							<h3>🥳 White wins!</h3>
						) : (
							<></>
						)}
						{this.state.gameState === GameState.BLACK_WON ? (
							<h3>🥳 Black wins!</h3>
						) : (
							<></>
						)}
						{this.state.isGameOver === true ? (
							<Confetti width={window.innerWidth} height={window.innerHeight}/>
						) : (
							<></>
						)}
						<div>
							Pieces lost:
							<br />
							White: {this.state.whiteFallenSoldiers.length}
							<br />
							Black: {this.state.blackFallenSoldiers.length}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
