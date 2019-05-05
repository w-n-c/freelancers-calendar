const uuid = require('nanoid/async')

function randInt(max) {
	return Math.floor(Math.random() * Math.floor(max))
}

// will come from server eventually, making async now so that everything is pre-promised
export const fetchEvents = async () => {
	const year = 2019
	const month = 4
	const fakeEvents = []
	let eventNumber = 1
	for (let day = 1; day <= 30; day++) {
		let moreEvents
		do {
			const event = {}
			event.id = await uuid()
			event.start = new Date(year, month, day, randInt(24), randInt(60))
			event.end = new Date(event.start.getTime() + 1000*60*60) // 1 hr long events
			event.title = `event no: ${eventNumber++}`
			fakeEvents.push(event)

			moreEvents = Math.random()
		} while (moreEvents < 0.3)
	}
	return fakeEvents
}
