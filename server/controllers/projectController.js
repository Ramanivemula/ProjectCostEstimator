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
      tools_infra_cost,
      userId //coming from JWT middleware
    } = req.body;

    const base_cost = calculateBaseCost(resources, timeline);
    const buffer_cost = (risk_buffer / 100) * base_cost;
    const total_cost = base_cost + buffer_cost + tools_infra_cost;

    const project = new Project({
      user: userId,//associate project with logged-in user
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
    const userId = req.body.userId; //comes from JWT middleware

    const projects = await Project.find({ user: userId }).sort({ createdAt: -1 });

    res.json(projects);
  } catch (err) {
    console.error("Get All Projects Error:", err.message);
    res.status(500).json({ error: "Unable to fetch projects" });
  }
};


//delete project with id
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.body.userId;

    const deleted = await Project.findOneAndDelete({ _id: id, user: userId });

    if (!deleted) {
      return res.status(404).json({ error: "Project not found or unauthorized" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({ error: "Failed to delete project" });
  }
};



//update existing project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.body.userId;

    const {
      project_name,
      desc,
      timeline,
      resources,
      risk_buffer,
      tools_infra_cost
    } = req.body;

    const base_cost = resources.reduce((total, res) => {
      return total + (res.count * res.rate * res.hrs_per_week * timeline);
    }, 0);

    const riskCost = (risk_buffer / 100) * base_cost;
    const total_cost = base_cost + riskCost + tools_infra_cost;

    const updated = await Project.findOneAndUpdate(
      { _id: id, user: userId }, // ensure only the owner can update
      {
        project_name,
        desc,
        timeline,
        resources,
        risk_buffer,
        tools_infra_cost,
        base_cost,
        total_cost,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Project not found or unauthorized" });
    }

    res.json({
      success: true,
      message: "Project Updated Successfully",
      project: updated
    });
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ error: "Failed to update project" });
  }
};