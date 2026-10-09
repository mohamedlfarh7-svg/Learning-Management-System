import express from 'express'
import { register, login, refresh, logout } from './auth.controller.js'
import authenticate from '../../middleware/authenticate.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/refresh', refresh)
router.get('/logout', authenticate, logout)

export default router