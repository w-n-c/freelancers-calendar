import { eventsInHour, isEventInHour } from '../eventsInHour'
describe('eventsInHour', () => {
	const year = 2020,
		month = 1,
		date = 19,
		hour = 16,
		time = (minutes) => new Date(year, month, date, hour, minutes),
		table = [
			[{ start: time(-5), end: time(-1) }, false],  // starts before hour, ends before hour
			[{ start: time(-5), end: time(0) }, false],   // starts before hour, ends on hour start
			[{ start: time(-5), end: time(30) }, true],   // starts before hour, ends during hour
			[{ start: time(-5), end: time(59) }, true],   // starts before hour, ends during hour
			[{ start: time(-5), end: time(60) }, true],   // starts before hour, ends with hour
			[{ start: time(-5), end: time(61) }, true],   // starts before hour, ends after hour
			[{ start: time(0), end: time(0) }, true],     // starts on hour, ends on hour start
			[{ start: time(0), end: time(5) }, true],     // starts on hour, ends during hour
			[{ start: time(0), end: time(59) }, true],    // starts on hour, ends during hour
			[{ start: time(0), end: time(60) }, true],    // starts on hour, ends with hour
			[{ start: time(0), end: time(61) }, true],    // starts on hour, ends after hour
			[{ start: time(20), end: time(59) }, true],   // starts during hour, ends during hour
			[{ start: time(20), end: time(60) }, true],   // starts during hour, ends with hour
			[{ start: time(20), end: time(61) }, true],   // starts during hour, ends after hour
			[{ start: time(60), end: time(61) }, false],  // starts when hour ends, ends after hour
			[{ start: time(62), end: time(70) }, false],  // starts after hour, ends after hour
		]
	describe('helper function isEventInHour', () => {
		const isEventNow = isEventInHour(time(0))
		it.each(table)('returns true if event(%o) overlaps with the given hour', (event, expected) => {
			expect(isEventNow(event)).toBe(expected)
		})
	})
	it('returns events occuring during the given hour',() => {
		const getEvents = (table) => table.map(([event, _]) => event)
		const applyFilter = (table) => table.filter(([_, filter]) => filter)

		const events = getEvents(table)
		const expected = getEvents(applyFilter(table))
		expect(eventsInHour({year, month: month+1, date, hour}, events)).toEqual(expected)
	})
})

