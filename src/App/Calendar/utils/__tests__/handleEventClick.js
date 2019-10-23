import { handleEventClick } from '../'

describe('handleEventClick', () => {
	it('passes the event string to navigate', () => {
		const navigate = jest.fn()
		const { mock } = navigate
		const handleClick = handleEventClick(navigate)
		handleClick('new')
		expect(mock.calls.length).toBe(1)
		expect(mock.calls[0][0]).toBe('events/new')
	})
})
