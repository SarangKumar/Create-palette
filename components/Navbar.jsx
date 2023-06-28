"use client";

import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
	const [providers, setProviders] = useState(null);
	const { data: session } = useSession();

	useEffect(() => {
		const setUpProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		};
		setUpProviders();
		// alert(JSON.stringify(providers));
	}, []);
	return (
		<nav className="shadow-b  shadow-gray-200 px-4 py-2 flex items-center justify-between">
			<Link href="/" className="text-lg bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent text-center font-extrabold ">
				GERUA
			</Link>
			{session?.user ? (
				<div className="flex gap-x-2 items-center">
					<Link
						href="create-palette"
						className="text-sm px-3 py-1 border rounded-md border-gray-200 text-gray-800"
					>
						Create Palette
					</Link>
					<button
						className="text-sm px-3 py-1 border rounded-md border-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white transition-colors"
						type="button"
						onClick={signOut}
					>
						Sign Out
					</button>
					<Link href="profile">
						<Image
							src={session?.user.image}
							height={37}
							width={37}
							alt="profile"
							className="rounded-full"
						/>
					</Link>
				</div>
			) : (
				<div className="flex items-center gap-x-2 justify-center">
					{providers &&
						Object.values(providers).map((provider) => (
							<button
								key={provider.name}
								type="button"
								onClick={() => signIn(provider.id)}
								className="text-sm px-3 py-1 border rounded-md border-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white transition-colors"
							>
								{provider.name} SignIn
							</button>
						))}
				</div>
			)}
		</nav>
	);
};

export default Navbar;
