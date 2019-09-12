const uuid = require('nanoid')
const fs = require('fs')

function randInt(max) {
	return Math.floor(Math.random() * Math.floor(max))
}

// Originally ran every time the app started,
// but random events made testing difficult
// now call "node api.js" if events.json doesn't
// exist to create a new static list of events

const createEvents = () => {
	const year = 2019
	const month = 8
	const fakeEvents = []
	let eventNumber = 1
	for (let day = 1; day <= 30; day++) {
		let moreEvents = day % 3
		for(let i = 0; i <= moreEvents; i++) {
			const event = {}
			event.id = uuid()
			event.start = new Date(year, month, day, randInt(24), randInt(60)).toISOString()
			event.end = new Date(new Date(event.start).getTime() + 1000*60*60).toISOString()
			event.title = `event no: ${eventNumber++}`
			event.description = 'description'
			fakeEvents.push(event)
		}
	}
	return fakeEvents
}

let data = createEvents() 
data = JSON.stringify(data)
fs.writeFileSync('events.json', data)
