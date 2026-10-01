import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Import GitHub routes from backend/routes/github_api_routes.js
import githubRoutes from './routes/github_api_routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Helper to define __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Middleware
app.use(cors())
app.use(express.json())

// API Routes
app.use('/api', githubRoutes)

// Serve frontend static build files from frontend/dist
const frontendDistPath = path.join(__dirname, '../frontend/dist')
app.use(express.static(frontendDistPath))

// Wildcard fallback to serve index.html for React Router client-side navigation
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})