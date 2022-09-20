import Piece from "../pieces/Piece";

export default function Square({
	onClick,
	isSquareOdd,
	style,
	keyVal,
}: {
	onClick: Function;
	isSquareOdd: boolean;
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
			className={`bg-transparent border-solid h-12 hover:scale-105 transition-200 hover:shadow-md
			w-12 p-0 m-0 text-center outline-0 bg-cover outline-none border-0
			${isSquareOdd ? "bg-gray-700" : "bg-gray-100"}`}></button>
	);
}