import mongoose from "mongoose";
const { Schema } = mongoose;

const shiftSchema = new Schema({
  date: { type: Date, required: true, unique: true },
  morningShift: [{ type: Schema.Types.ObjectId, ref: "Nurse" }],
  afternoonShift: [{ type: Schema.Types.ObjectId, ref: "Nurse" }],
  nightShift: [{ type: Schema.Types.ObjectId, ref: "Nurse" }],
});

const Shift =
  mongoose.models.Shift || mongoose.model("Shift", shiftSchema, "shifts");

export default Shift;
