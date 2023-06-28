import Color from "@models/color";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
	try {
		await connectToDB();
		const palettes = await Color.find({}).populate('creator');
		// console.log(palettes);
		return new Response(JSON.stringify(palettes), { status: 200 });
	} catch (error) {
		return new Response("Failed to fetch colors", { status: 500 });
	}
};
