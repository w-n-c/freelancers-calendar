const mongoose = require('mongoose')
const { Schema } = mongoose

const calendarSchema = new Schema({
	title: String,
	description: String,
	start: String,
	end: String,
	_user: { type: Schema.Types.ObjectId, ref: 'User' }
})

mongoose.model('calendar', calendarSchema)
