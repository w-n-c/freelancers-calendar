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

eventSchema.method('transform', function() {
	const obj = this.toObject()
	obj.id = obj._id
	delete obj._id
	return obj
})

mongoose.model('event', eventSchema)
