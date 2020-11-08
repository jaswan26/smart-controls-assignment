const router = require('express').Router()
const controller = require('./timesheet.controller')

router.get('/list', controller.list)
router.post('/submitHours/:username', controller.submitHours)

module.exports = router
