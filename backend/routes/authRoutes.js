import express from 'express'
const router = express.Router()

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.cookie('token', '', { httpOnly: true, expires: new Date(0) })
  res.json({ ok: true })
})

export default router
