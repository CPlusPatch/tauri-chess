import { useState } from "react";
import { Transition } from "@headlessui/react";
import Game from "./components/Game";

function App() {
	return (
		<div className="flex justify-center items-center flex-row h-full w-full">
			<Game/>
		</div>
	);
}

export default App;
