import express from "express"
import { router as apiRouter } from "./src/routes/apiRouter.js"
import { connectDB } from "./src/config/database.js"
import { fileURLToPath } from 'url';
import path from "path"

connectDB()

// defining dirname variables because it's a module project
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(apiRouter)

// express serveres static pages
// let React router handle the routes
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});


const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

//shutdown functionnality
async function shutdown () {
  server.close()
  process.exit(0)
}
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)


