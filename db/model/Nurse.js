import mongoose from "mongoose";

const { Schema } = mongoose;

const nurseSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  yearsExperience: { type: Number, required: true },
  role: { type: String, required: true },
  contractTime: { type: Number, required: true },
  availability: { type: String, required: true },
  specialist: { type: Boolean, required: true },
});

const Nurse =
  mongoose.models.Nurse || mongoose.model("Nurse", nurseSchema, "nurses");

export default Nurse;
