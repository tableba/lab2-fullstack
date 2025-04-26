import express from "express"
import bcrypt from "bcrypt"
import { Projects as projectsModel } from "../model/Projects.js"
import { ProjectsAssignments as projectsAssignmentsModel } from "../model/ProjectsAssignments.js"
import { Employees as employeesModel } from "../model/Employees.js"

export const router = express.Router()

router.get('/api/projects', async (req, res) => {
  try {
    const projects = await projectsModel.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.get('/api/projectsAssignments', async (req, res) => {
  try {
    const projectsAssignments = await projectsAssignmentsModel.find();
    res.status(200).json(projectsAssignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.get('/api/employees', async (req, res) => {
  try {
    const employees = await employeesModel.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.post('/api/employees', async (req, res) => {
  try {
    // get the password of the body
    const plaintext = req.body.password

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(plaintext, saltRounds)
    // add a hashedPassowrd to the body
    req.body.hashedPassword = hashedPassword

    // password is ignored and hashedPassword is used because of model template
    const newEmployee = new employeesModel(req.body)
    const savedEmployee = await newEmployee.save()
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})


router.post('/api/projects', async (req, res) => {
  try {
    // create new employee document
    const { projectCode, projectName, projectDescription } = req.body;
    const exists = await Project.findOne({ projectCode });
    if (exists) return res.status(409).json({ error: 'Project code must be unique' });
    const newProject = new projectsModel({ projectCode, projectName, projectDescription })
    const savedProject = await newProject.save()
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.post('/api/projectsAssignments', async (req, res) => {
  try {
    // create new employee document
    const newProjectAssignments = new projectsAssignmentsModel(req.body)
    const savedProjectAssignments = await newProjectAssignments.save()
    res.status(201).json(newProjectAssignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.delete('/api/employees', async (req, res) => {
  try {
    const result = await employeesModel.deleteMany({});
    res.status(200).json({
      message: `${result.deletedCount} employee(s) deleted successfully.`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/api/projects', async (req, res) => {
  try {
    const result = await projectsModel.deleteMany({});
    res.status(200).json({
      message: `${result.deletedCount} project(s) deleted successfully.`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/api/projectsAssignments', async (req, res) => {
  try {
    const result = await projectsAssignmentsModel.deleteMany({});
    res.status(200).json({
      message: `${result.deletedCount} employee(s) deleted successfully.`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
