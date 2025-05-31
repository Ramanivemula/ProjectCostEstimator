import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  count: { type: Number, required: true, min: 1 },
  role: { type: String, required: true },
  rate: { type: Number, required: true, min: 0 },
  hrs_per_week: { type: Number, required: true, min: 1, max: 168 }, // realistic limit
  experience: { type: String, required: true },
});

const projectSchema = new mongoose.Schema({
  project_name: { type: String, required: true },
  desc: { type: String },
  timeline: { type: Number, required: true, min: 1 }, // in weeks
  resources: {
    type: [resourceSchema],
    validate: [arrayLimit, '{PATH} must contain at least one resource']
  },
  base_cost: { type: Number },
  risk_buffer: { type: Number, min: 0, default: 0 }, // percentage
  tools_infra_cost: { type: Number, min: 0, default: 0 },
  total_cost: { type: Number },
}, { timestamps: true });

function arrayLimit(val) {
  return val.length > 0;
}

export default mongoose.model("Project", projectSchema);
