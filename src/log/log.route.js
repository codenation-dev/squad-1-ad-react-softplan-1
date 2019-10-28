const express = require('express')
const router = express.Router()
const { getLogs, createLog, deleteLog, createDummyLog } = require('./log.controller')

router.get('/test', (_, res) => res.send('{"ok": true}'))

router.get('/logs', getLogs)

router.post('/logs', createLog)

router.get('/logs/:id/delete', deleteLog);

router.get('/logs/add-dummy', createDummyLog)

module.exports = router