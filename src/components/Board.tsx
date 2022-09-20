import React from "react";
import Square from "./Square";

export default class Board extends React.Component {
	props: any;
	constructor(props: any) {
		super(props);
		this.props = props;
	}

	renderSquare(i: number, colorTheme: "light" | "dark") {
		return (
			<Square
				keyVal={i}
				key={i}
				style={
					this.props.squares[i] ? this.props.squares[i].style : null
				}
				colorTheme={colorTheme}
				onClick={() => this.props.onClick(i)}
			/>
		);
	}

	render() {
		const board = [];
		for (let i = 0; i < 8; i++) {
			const squareRows = [];
			for (let j = 0; j < 8; j++) {
				const colorTheme =
					(isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))
						? "light"
						: "dark";
				squareRows.push(this.renderSquare(i * 8 + j, colorTheme));
			}
			board.push(<div className="flex-row grow-0 h-12 w-[24rem]" key={i}>{squareRows}</div>);
		}

		return (
			<div className="flex justify-center flex-col items-center">
				{board}
			</div>
		)
	}
}


function isEven(num: number) {
	return num % 2 == 0;
}