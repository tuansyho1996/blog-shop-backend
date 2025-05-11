'use strict'
import express from "express"
import blog from './blog/index.js'
// import auth from './auth/index.js'

const router = express.Router()

router.use('/api/blog', blog)


export default router