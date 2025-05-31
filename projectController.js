import Project from "../models/projectModel.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Calculate base cost
const calculateBaseCost = (resources, timeline) => {
  return resources.reduce((total, r) => {
    return total + (r.count * r.rate * r.hrs_per_week * timeline);
  }, 0);
};

// Generate optimization suggestion using Gemini API with your key
const generateOptimization = async (project) => {
  try {
    const prompt = `
You are a senior software project cost optimization consultant. Given the software project details in the JSON below, analyze and return strictly **3–4 short, high-impact suggestions per category**, separated by commas.

Your response must be direct and realistic, like an expert advising a startup CTO. Avoid generic ideas — focus on what would actually move the needle in a real-world project.

### Return format (no bullets or markdown):
Cost Reduction Areas: <comma-separated suggestions>  
Timeline/Resource Changes: <comma-separated suggestions>  
Tool/Infra Suggestions: <comma-separated suggestions>

### Example of a good response:
Cost Reduction Areas: reduce backend developer hours, remove redundant QA cycles, consolidate API services  
Timeline/Resource Changes: extend timeline by 1 week, use 1 PM instead of 2, parallelize dev and testing  
Tool/Infra Suggestions: switch from AWS EC2 to Firebase, use free tier of GitHub Actions, adopt Trello for PM

Now, generate your suggestions for this project:

PROJECT:
${JSON.stringify(project, null, 2)}
`;

    // Initialize Google Generative AI client with your API key
    const genAI = new GoogleGenerativeAI("AIzaSyC3Np36ZlIqi-xy6yEgeXjBL1IiqUBMxNU");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text || "No suggestions returned.";
  } catch (error) {
    console.error("Gemini API Error:", error.message || error);
    return "Failed to get optimization suggestion from Gemini.";
  }
};

// Create new project
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

// Get all projects and suggest optimization for the latest one
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    if (projects.length === 0) {
      return res.json({ projects: [], suggestion: "No projects available for optimization." });
    }

    const suggestion = await generateOptimization(projects[0]);
    res.json({ projects, suggestion });
  } catch (err) {
    console.error("Fetch Error:", err.message);
    res.status(500).json({ error: "Unable to fetch projects" });
  }
};
