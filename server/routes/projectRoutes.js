import express from "express";
import { createProject, getAllProjects } from "../controllers/projectController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/projects",userAuth, createProject);
router.get("/projects", userAuth,getAllProjects);

export default router;
