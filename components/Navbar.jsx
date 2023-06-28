"use client";

import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
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
		alert(JSON.stringify(providers));
	}, []);
	return (
		<nav>
			{session?.user ? (
				<>
					<button type="button" onClick={signOut}>SignOut</button>
				</>
			) : (
				<>
					{providers &&
						Object.values(providers).map((provider) => (
							<button
								key={provider.name}
								type="button"
								onClick={() => signIn(provider.id)}
								className="text-sm px-3 py-1 border rounded-md border-gray-200 text-gray-800"
							>
								{provider.name} SignIn
							</button>
						))}
				</>
			)}
		</nav>
	);
};

export default Navbar;
