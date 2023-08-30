import mongoose from "mongoose";

const { Schema } = mongoose;

const availabilitySchema = new Schema({
  nurseId: { type: Schema.Types.ObjectId, ref: "Nurse", required: true },
  date: { type: Date, required: true },
  shift: {
    type: String,
    enum: ["morning", "afternoon", "night"],
    required: true,
  },
});

const Availability =
  mongoose.models.Availability ||
  mongoose.model("Availability", availabilitySchema, "availabilities");

export default Availability;
