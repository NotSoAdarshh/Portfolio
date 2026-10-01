import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Allow frontend requests
app.use(cors())
app.use(express.json())

// API Route to fetch repositories from GitHub
app.get('/api/projects', async (req, res) => {
  const GITHUB_PAT = process.env.GITHUB_PAT

  if (!GITHUB_PAT) {
    return res.status(500).json({ error: 'GitHub PAT is not configured in .env file.' })
  }

  const query = `
    query {
      viewer {
        repositories(
          first: 20
          ownerAffiliations: OWNER
          orderBy: { field: UPDATED_AT, direction: DESC }
          isFork: false
        ) {
          nodes {
            id
            name
            description
            url
            homepageUrl
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
            repositoryTopics(first: 5) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    }
  `

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_PAT}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Portfolio-App'
      },
      body: JSON.stringify({ query })
    })

    const data = await response.json()

    if (data.errors) {
      return res.status(400).json({ errors: data.errors })
    }

    const repositories = data.data.viewer.repositories.nodes.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || 'No description provided.',
      githubUrl: repo.url,
      liveUrl: repo.homepageUrl || null,
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      language: repo.primaryLanguage ? repo.primaryLanguage.name : 'JavaScript',
      languageColor: repo.primaryLanguage ? repo.primaryLanguage.color : '#f1e05a',
      topics: repo.repositoryTopics.nodes.map(t => t.topic.name)
    }))

    res.json({ projects: repositories })
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    res.status(500).json({ error: 'Failed to fetch repositories from GitHub.' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})