import React from 'react'
import ReactDOM from 'react-dom'
import Hour, { getTop, getBottom, offset } from '../Hour'
describe('<Hour />', () => {
	const props = {
		events: [],
		now: new Date(),
		navLink: jest.fn()
	}

	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(<Hour {...props} />, div)
		ReactDOM.unmountComponentAtNode(div)
	})

	describe('utility functions', () => {
		const dates = [
			new Date(2020, 3, 2, 13, 10),
			new Date(2020, 6, 12, 1, 0),
			new Date(2020, 0, 22, 12, 59),
		]

		const offsetTable = dates.map((date) => [date, (60 - date.getMinutes())/60])
		it.each(offsetTable)(
			'offset returns (portion of event in hour) / (length of hour)',
			(date, expected) => expect(offset(date)).toBe(expected)
		)

		const getTopTable = dates.map((date) => [date, `calc(${1 - offset(date)} * 100% - 2px)`])
		it.each(getTopTable)(
			'getTop returns the css top value',
			(date, expected) => expect(getTop(date)).toBe(expected)
		)

		const getBottomTable = dates.map((date) => [date,`calc(${offset(new Date(date))} * 100% + 2px)`])
		it.each(getBottomTable)(
			'getBottom returns the css bottom value',
			(date, expected) => expect(getBottom(date)).toBe(expected)
		)
	})
})
