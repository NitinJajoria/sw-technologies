import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    serviceRequired: { type: String, required: true },
    budget: { type: String, required: true },
    message: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.models.Quote || mongoose.model("Quote", quoteSchema);
