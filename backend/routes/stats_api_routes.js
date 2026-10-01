import express from 'express'
import fetch from 'node-fetch'

const router = express.Router()

router.get('/stats', async (req, res) => {
  const GITHUB_PAT = process.env.GITHUB_PAT

  if (!GITHUB_PAT) {
    return res.status(500).json({ error: 'GitHub PAT is missing in environment variables.' })
  }

  // Simplified query targeting core user metrics
  const query = `
    query {
      viewer {
        repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
          totalCount
          nodes {
            forkCount
          }
        }
        pullRequests(states: MERGED) {
          totalCount
        }
        contributionsCollection {
          totalCommitContributions
          restrictedContributionsCount
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
      console.error('GitHub GraphQL Errors:', data.errors)
      return res.status(400).json({ errors: data.errors })
    }

    const viewer = data.data.viewer

    const totalForks = viewer.repositories.nodes.reduce(
      (acc, repo) => acc + (repo.forkCount || 0), 0
    )

    const totalCommits = 
      (viewer.contributionsCollection?.totalCommitContributions || 0) + 
      (viewer.contributionsCollection?.restrictedContributionsCount || 0)

    res.json({
      stats: {
        repos: viewer.repositories.totalCount || 0,
        forks: totalForks,
        commits: totalCommits,
        mergedPRs: viewer.pullRequests.totalCount || 0
      }
    })
  } catch (error) {
    console.error('Error fetching GitHub stats:', error)
    res.status(500).json({ error: 'Failed to fetch stats from GitHub.' })
  }
})

export default router