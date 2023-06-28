"use client";

import Palette from "@components/Palette";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
	const [allPalettes, setAllPalettes] = useState([]);

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
			<div className="flex justify-center items-start">
				<h1 className="font-bold text-3xl relative before:absolute before:w-8 before:h-1 before:bg-blue-600 before:-bottom-0 before:left-1">
					Palettes
				</h1>
			</div>

			<section className="flex justify-center items-center gap-5 m-5 flex-wrap">
				{allPalettes.map((palette) => (
					<Palette
						key={palette._id}
						{...palette}
					/>
				))}
			</section>
		</>
	);
}
