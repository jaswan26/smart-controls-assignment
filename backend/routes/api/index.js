const router = require('express').Router()
const authMiddleware = require('../../middlewares/auth')
const auth = require('./auth')
const user = require('./user')
const timesheet = require('./timesheet')

router.use('/auth', auth)
router.use('/user', authMiddleware)
router.use('/user', user)
router.use('/timesheet',timesheet)


module.exports = router