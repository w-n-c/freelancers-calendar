const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')

const Event = mongoose.model('event')

module.exports = app => {
	app.get('/api/events', requireLogin, async (req, res) => {
		try {
			await Event.find({_user: req.user.id }, (err, events) => {
				if (err) return res.status(500).send(err)
				return res.json(events.map(event => event.transform()))
			})
		} catch (err) {
			res.status(422).send(err)
		}
	})

	app.post('/api/events/new', requireLogin, async ({body: eventData, user: {id: _user }}, res) => {
		const event = new Event({...eventData, _user})
		try {
			await event.save((err, savedEvent) => {
				if (err) return res.status(500).send(err)
				return res.json(savedEvent.transform())
			})
		} catch (err) {
			res.status(422).send(err)
		}
	})

	app.post('/api/events/:id', requireLogin, async (req, res) => {
		try {
			await Event.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, event) => {
				if (err) return res.status(500).send(err)
				return res.json(event.transform())
			})
		} catch (err) {
			res.status(422).send(err)
		}
	})
}
