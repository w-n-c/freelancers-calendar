const mongoose = require('mongoose')
const { Schema } = mongoose

const eventSchema = new Schema({
	id: String,
	title: String,
	description: String,
	start: String,
	end: String,
	_user: { type: Schema.Types.ObjectId, ref: 'User' }
})

mongoose.model('event', eventSchema)
