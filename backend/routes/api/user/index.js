const router = require('express').Router()
const controller = require('./user.controller')

router.get('/list', controller.list)
router.post('/assign-employer/:username', controller.assignEmployer)

module.exports = router