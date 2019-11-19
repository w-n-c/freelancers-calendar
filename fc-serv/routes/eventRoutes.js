const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')

const Event = mongoose.model('event')

module.exports = app => {
	app.get('/api/events', requireLogin, async (req, res) => {
		const events = await Event.find({_user: req.user.id })
		res.json(events.map(event => event.transform()))
	})

	app.post('/api/events/new', requireLogin, async ({body: eventData, user: {id: _user }}, res) => {
		const event = new Event({
			...eventData,
			_user
		})
		try {
			await event.save((err, savedEvent) => res.json(savedEvent.transform()))
		} catch (err) {
			res.status(422).send(err)
		}
	})
}
