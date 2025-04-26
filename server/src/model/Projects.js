import mongoose from "mongoose"

const projectsSchema = new mongoose.Schema({
  projectCode: String,
  projectName: String,
  projectDescription: String,
});

export const Projects = mongoose.model('Projects', projectsSchema);
