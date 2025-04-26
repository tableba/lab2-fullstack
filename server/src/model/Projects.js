import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  projectCode:        { type: String, required: true, unique: true },
  projectName:        { type: String, required: true },
  projectDescription: { type: String }
}, { timestamps: true });
