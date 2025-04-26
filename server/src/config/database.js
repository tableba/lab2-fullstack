import mongoose from "mongoose"

mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const url = process.env.CONNECTION_URL
export const connectDB = async() => {
  try{
    await mongoose.connect(url);
    console.log("connected to the db!")
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
