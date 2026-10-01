import express from 'express'
import fetch from 'node-fetch'

const router = express.Router()

router.get('/stats', async (req, res) => {
  const GITHUB_PAT = process.env.GITHUB_PAT

  if (!GITHUB_PAT) {
    return res.status(500).json({ error: 'GitHub PAT is missing in environment variables.' })
  }

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
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
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
      console.error('GitHub GraphQL Errors:', data.errors)
      return res.status(400).json({ errors: data.errors })
    }

    const viewer = data.data?.viewer || {}
    const calendar = viewer.contributionsCollection?.contributionCalendar

    // Safely map contribution days to scale levels (0-4)
    const contributionDays = calendar?.weeks?.flatMap(week =>
      (week.contributionDays || []).map(day => {
        let level = 0
        if (day.contributionCount > 0 && day.contributionCount <= 3) level = 1
        else if (day.contributionCount > 3 && day.contributionCount <= 6) level = 2
        else if (day.contributionCount > 6 && day.contributionCount <= 9) level = 3
        else if (day.contributionCount > 9) level = 4

        return {
          date: day.date,
          count: day.contributionCount,
          level
        }
      })
    ) || []

    const totalForks = (viewer.repositories?.nodes || []).reduce(
      (acc, repo) => acc + (repo.forkCount || 0), 0
    )

    const totalCommits = 
      (viewer.contributionsCollection?.totalCommitContributions || 0) + 
      (viewer.contributionsCollection?.restrictedContributionsCount || 0)

    res.json({
      stats: {
        repos: viewer.repositories?.totalCount || 0,
        forks: totalForks,
        commits: totalCommits,
        mergedPRs: viewer.pullRequests?.totalCount || 0
      },
      contributions: contributionDays,
      totalContributions: calendar?.totalContributions || 0
    })
  } catch (error) {
    console.error('Error fetching GitHub stats:', error)
    res.status(500).json({ error: 'Failed to fetch stats from GitHub.' })
  }
})

export default router