import mongoose from "mongoose";

const { Schema } = mongoose;

const nurseWorkDatesSchema = new Schema({
  vacationDates: [{ startDate: Date, endDate: Date }],
  daysOff: [Date],
  availability: {
    monday: [{ type: String, enum: ["morning", "afternoon", "night"] }],
    tuesday: [{ type: String, enum: ["morning", "afternoon", "night"] }],
    wednesday: [{ type: String, enum: ["morning", "afternoon", "night"] }],
    thursday: [{ type: String, enum: ["morning", "afternoon", "night"] }],
    friday: [{ type: String, enum: ["morning", "afternoon", "night"] }],
    saturday: [{ type: String, enum: ["morning", "afternoon", "night"] }],
    sunday: [{ type: String, enum: ["morning", "afternoon", "night"] }],
  },
});

const NurseWorkDates =
  mongoose.models.NurseWorkDates ||
  mongoose.model("NurseWorkDates", nurseWorkDatesSchema, "nurseWorkDates");

export default NurseWorkDates;
