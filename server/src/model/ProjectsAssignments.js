import mongoose from "mongoose";

const projectsAssignmentsSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employees',
    required: true
  },
  projectCode: {
    type: String,
    ref: 'Projects',
    required: true
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now
  }
}, {
  timestamps: true
});

export const ProjectsAssignments = mongoose.model('projectsAssignments', projectsAssignmentsSchema);
