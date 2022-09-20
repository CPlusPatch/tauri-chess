import Piece from "../pieces/Piece";

export default function Square({
	onClick,
	isSquareOdd,
	turn,
	style,
	keyVal,
	image
}: {
	onClick: Function;
	isSquareOdd: boolean;
	turn: "white" | "black";
	style: any;
	keyVal: any;
	image: string;
}) {
	return (
		<button
			key={keyVal}
			onClick={(e) => {
				onClick(e);
			}}
			className={`bg-transparent h-12 hover:scale-105 duration-200 hover:shadow-md
			w-12 p-0 m-0 text-center outline-0 bg-cover outline-none z-10 border-0 border-none hover:z-50
			${isSquareOdd ? "bg-gray-700" : "bg-gray-100"}
			${turn == "white" ? "" : "rotate-180"}`}
			style={style}>
			{(image) ? <img className="w-full h-full" src={image}/> : null}
		</button>
	);
}