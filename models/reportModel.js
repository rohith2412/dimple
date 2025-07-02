import { model, models, Schema } from "mongoose";

const reportSchema = new Schema(
  {
    user: { type: String, required: true },
    report: { type: String, required: true },
  },
  { timestamps: true }
);

const Report = models.Report || model("Report", reportSchema);
export default Report;
