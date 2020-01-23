import React from 'react'
import ReactDOM from 'react-dom'
import Hour, { getTop, getBottom, offset } from '../Hour'
import { newEventQuery } from '../../utils'
describe('<Hour />', () => {
	afterEach(jest.clearAllMocks)
	const now = (minutes) => new Date(2020, 0, 23, 16, minutes)
	const props = {
		events: [
			{ start: now(0), end: now(90), id: 'these' },
			{ start: now(20), end: now(40), id: 'are' },
			{ start: now(1000), end: now(1001), id: 'arbitrary' },
			{ start: now(1000), end: now(1001) } // what happens if missing id?
		],
		now: new Date(),
		navLink: jest.fn(val => val)
	}


	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(<Hour {...props} />, div)
		ReactDOM.unmountComponentAtNode(div)
	})

	it('article calls navLink with a new event on click', () => {
		const hour = shallow(<Hour {...props} />)
		hour.simulate('click')
		expect(props.navLink.mock.calls.length).toBe(1)
		expect(props.navLink.mock.results[0].value).toEqual(newEventQuery(props.now))
	})

	it('section calls navLink with event id on click', () => {
		const hour = shallow(<Hour {...props} />)
		hour.find('section').forEach((node, index) => {
			node.simulate('click', { stopPropagation: () => {} })
			expect(props.navLink.mock.calls.length).toBe(index+1)
			expect(props.navLink.mock.results[index].value).toEqual(props.events[index].id)
		})
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
