import express from 'express'
import cloudinary from '../config/cloudinary.js'

const router = express.Router()

// GET /api/images - Fetch list of images from Cloudinary
router.get('/images', async (req, res) => {
  try {
    const folder = req.query.folder || '' // Optional folder filter query parameter

    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folder, 
      max_results: 50
    })

    const images = result.resources.map((resource) => ({
      id: resource.public_id,
      url: resource.secure_url,
      format: resource.format,
      width: resource.width,
      height: resource.height,
      created_at: resource.created_at
    }))

    res.status(200).json({ success: true, count: images.length, images })
  } catch (error) {
    console.error('Cloudinary fetch error:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

export default router