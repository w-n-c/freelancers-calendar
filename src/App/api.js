const uuid = require('nanoid/async')

// will come from server eventually, making async now so that everything is pre-promised
export const fetchEvents = async () => {
	const year = 2019
	const month = 4
	const fakeEvents = []
	for (let day = 1; day <= 30; day++) {
		const event = {}
		event.id = await uuid()
		event.start = new Date(year, month, day, Math.random(24), Math.random(60))
		event.end = new Date(event.start.getTime() + 1000*60*60) // 1 hr long events
		event.title = `event no: ${day}`
		fakeEvents.push(event)
	}
	return fakeEvents
}
