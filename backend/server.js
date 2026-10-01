import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Import route file
import router from './routes/github_api_routes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Health check
app.get('/', (req, res) => {
  res.send('Server running smoothly.')
})

// Mount GitHub API routes under /api
app.use('/api', githubRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})