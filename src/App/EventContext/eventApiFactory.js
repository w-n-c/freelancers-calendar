// Accepts two dates, returns true if both dates occur on the same day
const sameDayAs = day1 => day2 => new Date(day1).toDateString() === new Date(day2).toDateString()

export const eventApiFactory = ({ state, setState }) => {
	const findIndexById = (array, value) => array.findIndex(item => item.id === value.id)
	const create = (event) => {
		setState(pre => ({
			...pre,
			events: [
				...pre.events,
				event
			]
		}))
	}

	const setMany = (events) => {
		setState(pre => ({
			...pre,
			events
		}))
	}

	const update = (value) => {
		setState(pre => {
			pre.events[findIndexById(pre.events, value)] = value
			return pre
		})
	}

	const remove = (value) => {
		setState(pre => {
			pre.events.splice(findIndexById(pre.events, value), 1)
			return pre
		})

	}

	const findById = (id) => {
		return state.events.find(event => event.id === id)
	}

	const findInDay = ({ year, month, date }) => {
		const today = new Date(`${year}/${month}/${date}`)
		const isToday = sameDayAs(today)

		const doesEventOverlap = day => event => (new Date(event.start) < day && day < new Date(event.end))
		const overlapsToday = doesEventOverlap(today)

		// Event may start, end, or completely overlap a specific date
		const eventIsToday = event =>
			isToday(event.start) || isToday(event.end) || overlapsToday(event)

		return state.events.filter(eventIsToday)
	}

	return {
		setMany,
		create,
		update,
		delete: remove,
		findById,
		findInDay
	}
}

export default eventApiFactory
