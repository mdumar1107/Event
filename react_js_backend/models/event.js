import { Schema, model } from "mongoose";

const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    venue: { type: String, required: true },
    startTime: { type: Object, required: true }, // Updated to Object type
    endTime: { type: Object, required: true }, // Updated to Object type
    startDate: { type: Object, required: true }, // Updated to Object type
    endDate: { type: Object, required: true }, // Updated to Object type
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Event", EventSchema);