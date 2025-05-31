import Project from "../models/projectModel.js";

const calculateBaseCost = (resources, timeline) => {
  return resources.reduce((total, r) => {
    return total + (r.count * r.rate * r.hrs_per_week * timeline);
  }, 0);
};

export const createProject = async (req, res) => {
  try {
    const {
      project_name,
      desc,
      timeline,
      resources,
      risk_buffer,
      tools_infra_cost
    } = req.body;

    const base_cost = calculateBaseCost(resources, timeline);
    const buffer_cost = (risk_buffer / 100) * base_cost;
    const total_cost = base_cost + buffer_cost + tools_infra_cost;

    const project = new Project({
      project_name,
      desc,
      timeline,
      resources,
      base_cost,
      risk_buffer,
      tools_infra_cost,
      total_cost,
    });

    const saved = await project.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Create Project Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch projects" });
  }
};
