import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
	mongoose.set("strictQuery", true);

	if (isConnected) {
		console.log("mongodb connection established");
		return;
	} else {
		try {
			await mongoose.connect(process.env.MONGODB_URL, {
				dbName: "gerua_db",
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});

			isConnected = true;
			console.log("mongodb connection successful");
		} catch (error) {
			console.log(error, 'not connected');
		}
	}
};
