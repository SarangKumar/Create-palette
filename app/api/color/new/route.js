import Color from "@models/color";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
	const { colors, name } = await req.json();
	await connectToDB();

	try {
		await connectToDB();
		const newColors = new Color({ colors, name });
		await newColors.save();

		return new Response(JSON.stringify(newColors), { status: 201 });
	} catch (error) {
		return new Response("Failed to create a new color", { status: 500 });
	}
};
