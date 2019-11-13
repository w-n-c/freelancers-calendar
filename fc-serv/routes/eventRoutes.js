const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')

const Event = mongoose.model('event')

module.exports = app => {
	app.get('/api/events', requireLogin, async (req, res) => {
		const events = await Event.find({_user: req.user.id })
		res.json(events)
	})

	app.post('/api/events/new', requireLogin, async (req, res) => {
		const { id, title, start, end, description } = req.body
		const event = new Event({
			id,
			title,
			start,
			end,
			description,
			_user: req.user.id
		})
		try {
			await event.save()
			res.json(req.body)
		} catch (err) {
			res.status(422).send(err)
		}
	})
}
