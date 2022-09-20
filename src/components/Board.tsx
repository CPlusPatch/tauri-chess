import React from "react";
import Piece from "../pieces/Piece";
import Square from "./Square";

export default class Board extends React.Component {
	props: {
		squares: Array<Piece | null>;
		onClick: Function;
		turn: "white" | "black";
	};
	constructor(props: any) {
		super(props);
		this.props = props;
	}

	renderSquare(i: number, isSquareOdd: boolean) {
		return (
			<Square
				keyVal={i}
				key={i}
				style={
					this.props.squares[i] ? this.props.squares[i]!.style : null
				}
				image={this.props.squares[i] ? this.props.squares[i]!.iconUrl : ""}
				isSquareOdd={isSquareOdd}
				onClick={() => this.props.onClick(i)}
				turn={this.props.turn}
			/>
		);
	}

	render() {
		const board = [];
		for (let i = 0; i < 8; i++) {
			const squareRows = [];
			for (let j = 0; j < 8; j++) {
				const isSquareOdd =
					(isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j));
				squareRows.push(this.renderSquare(i * 8 + j, !isSquareOdd));
			}
			board.push(
				<div className="flex-row grow-0 h-12 w-[24rem]" key={i}>
					{squareRows}
				</div>
			);
		}

		return (
			<div className={`flex justify-center flex-col items-center overflow-hidden ease-in-out rounded-sm duration-700 ${this.props.turn == "white" ? "" : "rotate-180"}`}>
				{board}
			</div>
		);
	}
}


function isEven(num: number) {
	return num % 2 == 0;
}