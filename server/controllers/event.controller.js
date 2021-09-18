
import Event from '../models/event.model.js'
import extend from 'lodash/extend.js'
import errorHandler from '../helpers/dbErrorHandler.js'
import * as geocode from '../geocode/geocoding.js'


// Note how this uses the mongoose methods to operate on the mongo db (e.g. find, findById, select, etc)

const create = async (req, res) => {
    const event = new Event(req.body)
    try {
        await event.save()
        const matching = geocode.match(location, filter, distance)
        return res.status(200).send(matching)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

/**
 * Load event and append to req (make new 'profile' key)
 */
const eventByID = async (req, res, next, id) => {
    try {
        let event = await Event.findById(id)
        if (!event)
            return res.status('400').json({
                error: "Event not found"
            })
        req.profile = event   //append the event to the request object in a profile key
        next()
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve event"
        })
    }
}

const read = (req, res) => {
    //req.profile.hashed_password = undefined
    //req.profile.salt = undefined
    return res.json(req.profile)
}

const list = async (req, res) => {
    try {
        let events = await Event.find().select('event_type service_type name email updated created') //just selects these fields
        res.json(events)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const update = async (req, res) => {
    try {
        let event = req.profile
        event = extend(event, req.body)
        event.updated = Date.now()
        await event.save()
        //user.hashed_password = undefined
        //user.salt = undefined
        res.json(event)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const remove = async (req, res) => {
    try {
        let event = req.profile
        let deletedEvent = await event.remove()
        //deletedEvent.hashed_password = undefined
        //deletedEvent.salt = undefined
        res.json(deletedEvent)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export default {
    create,
    eventByID,
    read,
    list,
    remove,
    update
}