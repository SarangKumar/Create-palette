"use client";

import { useState } from "react";
import Palette from "./Palette";
import { RxCross2 } from "react-icons/rx";
import { BiLoaderAlt } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const PaletteForm = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const [colors, setColors] = useState(["", "", "", "", ""]);
	const [name, setName] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const createPalette = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		
		if (name === "") 
		alert("Please provide a name");
		setSubmitting(false);

		return;

		for (let i = 0; i < colors.length; i++) {
			if (colors[i] === "") {
				alert("no");
				return;
			}
		}

		try {
			const response = await fetch("/api/color/new", {
				method: "POST",
				body: JSON.stringify({
					creator: session?.user.id,
					likes: 0,
					colors: colors,
					name: name,
				}),
			});

			if (response.ok) router.push("/");
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};
	const handleChange = (e, i) => {
		const handleChangeValue = [...colors];
		handleChangeValue[i] = e.target.value;
		setColors(handleChangeValue);
	};
	const handleAddInput = () => {
		setColors([...colors, ""]);
	};

	const handleDelete = (i) => {
		const deleteVal = [...colors];
		deleteVal.splice(i, 1);
		setColors(deleteVal);
	};

	return (
		<div className="flex flex-col justify-center items-center w-full gap-y-4">
			{session?.user ? (
				<>
					<div className="border border-gray-200 rounded-lg w-full sm:w-2/3 md:w-1/2 shadow-sm p-4 mx-5 my-4">
						<h1 className="font-bold text-3xl relative before:absolute before:w-8 before:h-1 before:bg-blue-600 before:-bottom-0 before:left-1">
							Create Palette
						</h1>
						<form
							onSubmit={(e) => createPalette(e)}
							className="flex flex-col gap-y-3 mt-5"
						>
							<label>
								<span className="text-xs block ml-1 text-gray-800 font-medium">
									Enter Name
								</span>
								<input
									type="text"
									className="text-sm focus:outline-blue-600 w-full px-3 py-[5px] border border-gray-200 rounded-md"
									onChange={(e) =>
										setName((prev) => e.target.value)
									}
									value={name}
								/>
							</label>
							<div className="">
								{colors.map((color, i) => (
									<ColorOption
										key={i}
										i={i}
										handleDelete={() => handleDelete(i)}
										handleChange={handleChange}
										color={color}
										length={colors.length}
									/>
								))}
							</div>
							{colors.length < 10 && (
								<button
									type="button"
									className="hover:bg-blue-600 hover:text-white transition-colors border border-gray-200 font-medium text-sm px-3 py-2 rounded-md text-slate-800"
									onClick={handleAddInput}
								>
									Add
								</button>
							)}

							{submitting ? (
								<button
									type="button"
									disabled
									className="cursor-not-allowed flex justify-center items-center text-center hover:shadow focus:outline-blue-600 bg-blue-600 text-white text-sm px-3 py-2 rounded-md"
								>
									Submit
									<BiLoaderAlt
										className="ml-2 animate-spin"
										size={22}
									/>
								</button>
							) : (
								<input
									type="submit"
									value="Submit"
									className="hover:shadow focus:outline-blue-600 bg-blue-600 text-white text-sm px-3 py-2 rounded-md cursor-pointer"
								/>
							)}
							{/* {JSON.stringify(colors)} */}
						</form>
					</div>
					<Palette
						colors={colors}
						name={name}
						length={colors.length}
					/>
				</>
			) : (
				<div className="text-gray-800">You need to signin to view this page</div>
			)}
		</div>
	);
};

export default PaletteForm;

const ColorOption = ({
	i,
	color,
	handleChange,
	handleDelete,
	length,
	name,
}) => {
	return (
		<>
			<input
				key={i}
				required
				type="color"
				name="colors"
				onChange={(e) => handleChange(e, i)}
				value={color}
			></input>
			{length > 5 && (
				<button
					type="button"
					onClick={handleDelete}
				>
					<RxCross2 />
				</button>
			)}
		</>
	);
};
