const uuid = require('nanoid/async')

function randInt(max) {
	return Math.floor(Math.random() * Math.floor(max))
}

// will come from server eventually, making async now so that everything is pre-promised
export const fetchEvents = async () => {
	const year = 2019
	const month = 5
	const fakeEvents = []
	let eventNumber = 1
	for (let day = 1; day <= 30; day++) {
		let moreEvents = day % 3
		for(let i = 0; i <= moreEvents; i++) {
			const event = {}
			event.id = await uuid()
			event.start = new Date(year, month, day, randInt(24), randInt(60)).toISOString()
			event.end = new Date(new Date(event.start).getTime() + 1000*60*60).toISOString()
			event.title = `event no: ${eventNumber++}`
			event.description = 'description'
			fakeEvents.push(event)
		}
	}
	return fakeEvents
}
