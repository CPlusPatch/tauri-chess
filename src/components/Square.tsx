import Piece from "../pieces/Piece";

export default function Square({ onClick, colorTheme, style, keyVal }: {
	onClick: Function;
	colorTheme: "light" | "dark";
	style: any;
	keyVal: any;
}) {
	return (
		<button key={keyVal} style={style} onClick={(e) => { onClick(e); }} className={`bg-transparent border-[1px] border-solid border-transparent h-12 w-12 p-0 m-0 text-center focus:outline-none outline-none bg-cover ${colorTheme == "dark" ? "bg-gray-700" : "bg-gray-100"}`}></button>	
	)
}