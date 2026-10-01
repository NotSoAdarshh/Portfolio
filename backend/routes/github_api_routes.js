import express from 'express'
import fetch from 'node-fetch'

const router = express.Router()

router.get('/projects', async (req, res) => {
  const GITHUB_PAT = process.env.GITHUB_PAT

  if (!GITHUB_PAT) {
    return res.status(500).json({ error: 'GitHub PAT is missing in environment variables.' })
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

    const projects = data.data.viewer.repositories.nodes.map(repo => ({
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

    res.json({ projects })
  } catch (error) {
    console.error('Error querying GitHub GraphQL API:', error)
    res.status(500).json({ error: 'Failed to fetch repositories from GitHub.' })
  }
})

export default router