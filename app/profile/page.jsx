"use client";

import Palette from "@components/Palette";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
	const { data: session } = useSession();
	const [myPalettes, setMyPalettes] = useState([]);

	useEffect(() => {
		const fetchPalettes = async () => {
			const response = await fetch(
				`/api/users/${session?.user.id}/palettes`
			);
			const data = await response.json();
			setMyPalettes(data);
			// console.log(myPalettes);
		};
		if (session?.user.id) fetchPalettes();
	}, [session?.user.id]);

	return (
		<div>
			{session?.user ? (
				<div className="mx-5 my-9">
					<h1 className="my-2 font-bold text-3xl relative before:absolute before:w-8 before:h-1 before:bg-blue-600 before:-bottom-0 before:left-1">
						Hello <span className="">{session?.user.name}</span>
					</h1>
					<p className="text-gray-800 text-base">
						Let&apos;s see your colors
					</p>
					<section className="flex justify-center items-center gap-5 m-5 flex-wrap">
                        {myPalettes.map(palette => <Palette key={palette._id} {...palette}/>)}
                    </section>
				</div>
			) : (
				<div className="text-gray-800">
					You need to signin to view this page
				</div>
			)}
		</div>
	);
};

export default ProfilePage;
