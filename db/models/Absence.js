import mongoose from "mongoose";
const { Schema } = mongoose;

const absenceSchema = new Schema({
  nurseId: { type: Schema.Types.ObjectId, ref: "Nurse", required: true },
  type: { type: String, enum: ["dayOff", "vacation"], required: true },
  date: { type: Date, required: true },
});

const Absence =
  mongoose.models.Absence ||
  mongoose.model("Absence", absenceSchema, "absences");

export default Absence;
