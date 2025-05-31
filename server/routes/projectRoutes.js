import express from "express";
import { createProject, getAllProjects , deleteProject, updateProject} from "../controllers/projectController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/projects",userAuth, createProject);
router.get("/projects", userAuth,getAllProjects);
router.delete("/projects/:id", userAuth, deleteProject);
router.put("/projects/:id", userAuth, updateProject);

export default router;
