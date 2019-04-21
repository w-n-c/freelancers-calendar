const uuid = require('nanoid')

const year = 2019
const month = 4
export const FAKE_TODOS = []
	
for (let day = 1; day <= 30; day++) {
	const event = {}
	event.id = uuid()
	event.start = new Date(year, month, day, Math.random(24), Math.random(60))
	event.end = new Date(event.start + 1000*60*60) // 1 hr long events
	event.title = `event no: ${day}`
	FAKE_TODOS.push(event)
}
