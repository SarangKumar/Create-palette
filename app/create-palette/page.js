import PaletteForm from "@components/PaletteForm";
import React from "react";

const CreatePalettePage = () => {
	return (
		<div>
			{/* <h1>Create Palette Page</h1> */}
			<section className="flex justify-center items-center my-10">
				<PaletteForm />
			</section>
		</div>
	);
};

export default CreatePalettePage;
