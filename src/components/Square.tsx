import Piece from "../pieces/Piece";

export default function Square({
	onClick,
	isSquareOdd,
	turn,
	style,
	keyVal,
}: {
	onClick: Function;
	isSquareOdd: boolean;
	turn: "white" | "black";
	style: any;
	keyVal: any;
}) {
	return (
		<button
			key={keyVal}
			style={style}
			onClick={(e) => {
				onClick(e);
			}}
			className={`bg-transparent border-solid h-12 hover:scale-105 duration-200 hover:shadow-md
			w-12 p-0 m-0 text-center outline-0 bg-cover outline-none z-10 border-0 hover:z-50
			${isSquareOdd ? "bg-gray-700" : "bg-gray-100"}
			${turn == "white" ? "" : "rotate-180"}`}></button>
	);
}