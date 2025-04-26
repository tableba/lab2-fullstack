import mongoose from "mongoose"

const employeesSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  hashedPassword: String,
});

export const Employees = mongoose.model('Employees', employeesSchema);
