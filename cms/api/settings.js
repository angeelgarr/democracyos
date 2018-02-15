const express = require('express')
const {
  OK,
  CREATED,
  NO_CONTENT,
  INTERNAL_SERVER_ERROR
} = require('http-status')
const { log } = require('../../main/logger')
const Setting = require('../db-api/settings')

const router = express.Router()

router.route('/')
  .post(async (req, res, next) => {
    try {
      const newSetting = await Setting.create(req.body)
      res.status(CREATED).json({
        data: newSetting
      })
    } catch (err) {
      log.error(err)
      res.status(INTERNAL_SERVER_ERROR).json({ error: 'error' })
    }
  })
  .get(async (req, res, next) => {
    // returns Settings only record
    try {
      const results = await Setting.getOne()
      res.status(OK).json(results)
    } catch (err) {
      log.error(err)
      res.status(INTERNAL_SERVER_ERROR).json({ error: 'error' })
    }
  })

router.route('/:id')
  .get(async (req, res, next) => {
    try {
      const setting = await Setting.get(req.params.id)
      res.status(OK).json(setting)
    } catch (err) {
      log.error(err)
      res.status(INTERNAL_SERVER_ERROR).json({ error: 'error' })
    }
  })
  .put(async (req, res, next) => {
    try {
      const updatedSetting = await Setting.update({ id: req.params.id, setting: req.body })
      res.status(OK).json(updatedSetting)
    } catch (err) {
      log.error(err)
      res.status(INTERNAL_SERVER_ERROR).json({ error: 'error' })
    }
  })
  .delete(async (req, res, next) => {
    try {
      await Setting.remove(req.params.id)
      res.status(NO_CONTENT).json(req.params.id)
    } catch (err) {
      log.error(err)
      res.status(INTERNAL_SERVER_ERROR).json({ error: 'error' })
    }
  })

module.exports = router
