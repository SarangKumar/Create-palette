"use client";

import Palette from "@components/Palette";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
	const [allPalettes, setAllPalettes] = useState([]);
	const [count, setCount] = useState(3);

	const fetchPalettes = async () => {
		const response = await fetch("/api/color");
		const data = await response.json();

		setAllPalettes(data);
	};

	useEffect(() => {
		fetchPalettes();
	}, []);
	return (
		<>
			<h1 className="text-[90px] bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent text-center font-bold ">
				Gerua
			</h1>
			<div className="flex justify-center items-start">
				<Link
					href="create-palette"
					className="px-3 py-1 font-sm font-medium border-gray-200 border rounded-md"
				>
					Create Palette
				</Link>
			</div>

			<section className="flex justify-center items-center gap-5 m-5 flex-wrap">
				{allPalettes.map((palette) => (
					<Palette
						key={palette.id}
						{...palette}
					/>
				))}
			</section>
		</>
	);
}
