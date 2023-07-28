import mongoose from "mongoose";

const { Schema } = mongoose;

const nurseSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  yearsExperience: { type: Number, required: true },
  role: { type: String, required: true },
  hoursPerWeek: { type: Number, required: true },
  specialist: { type: Boolean, required: true },
});

const Nurse =
  mongoose.models.Nurse || mongoose.model("Nurse", nurseSchema, "nurses");

export default Nurse;
