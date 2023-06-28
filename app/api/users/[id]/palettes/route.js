
import Color from "@models/color";
import { connectToDB } from "@utils/database";


export const GET = async (request, { params }) => {
	try {
		await connectToDB();

		const colors = await Color.find({
			creator: params.id,
		}).populate("creator");

		return new Response(JSON.stringify(colors), { status: 200 });
	} catch (error) {
		return new Response("Failed to fetch all prompts", { status: 500 });
	}
};
