import { Schema, model, models } from "mongoose";

const ColorSchema = new Schema({
	creator: {
		type: Schema.Types.ObjectId,
		ref: "Color",
	},
	colors: {
		type: Array,
		required: [true, "Colors are required"],
		// min: 5,
		// max: 10,
	},
	name: {
		type: String,
		required: [true, "Name is required"],
		min: 3,
	},
	likes: {
		type: Number,
		default: 0,
	},
});

const Color = models.Color || model("Color", ColorSchema);

export default Color;
