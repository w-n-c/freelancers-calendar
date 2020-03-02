const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')

const Event = mongoose.model('event')

module.exports = app => {
	app.get('/api/events', requireLogin, async (req, res) => {
		try {
			const events = await Event.find({_user: req.user.id })
			return res.json(events.map(event => event.transform()))
		} catch (err) {
			res.status(500).send(err)
		}
	})

	const localEventIds = []
	app.post('/api/events', requireLogin, async (req, res) => {
		const events = []
		req.body.forEach(eventRequest => { 
			if (!localEventIds.includes(eventRequest.id)) {
				const event = Object.assign({}, eventRequest)
				event._user = req.user.id
				event.localId = event.id
				localEventIds.push(event.id)
				delete event.id
				events.push(new Event(event))
			}
		})
		try {
			if (events.length) {
				Event.insertMany(events, (err, events) => {
					if (err) return res.status(500).send(err)
					return res.json(events.map(event => event.transform()))
				})
			} else {
				res.status(400).send('redundant request')
			}
		} catch (err) {
			res.status(422).send(err)
		}
	})

	app.post('/api/events/new', requireLogin, async ({body: eventData, user: {id: _user }}, res) => {
		const event = new Event({...eventData, _user})
		try {
			const savedEvent = await event.save()
			return res.json(savedEvent.transform())
		} catch (err) {
			res.status(500).send(err)
		}
	})

	app.post('/api/events/:id', requireLogin, async (req, res) => {
		try {
			const event = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true})
			return res.json(event.transform())
		} catch (err) {
			res.status(500).send(err)
		}
	})

	app.delete('/api/events/:id', requireLogin, async (req, res) => {
		try {
			await Event.findByIdAndRemove(req.params.id)
			return res.status(200).send({ message: "Event successfully deleted"})
		} catch (err) {
			res.status(500).send(err)
		}
	})
}
