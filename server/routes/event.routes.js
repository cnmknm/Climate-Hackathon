
import express from 'express'
import eventCtrl from '../controllers/event.controller.js'
//import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/event/exchange')
    .get(eventCtrl.list)
    .post(eventCtrl.create)

router.route('/event/:eventId')
    .get(eventCtrl.read)
    .put(eventCtrl.update)
    .delete(eventCtrl.remove)

router.param('eventId', eventCtrl.eventByID)

export default router