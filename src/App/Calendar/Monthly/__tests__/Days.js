import React from 'react'
import ReactDOM from 'react-dom'
import Days from '../Days'

describe('<Days />', () => {
	const hour = new Date().getHours()
	const props = {
		days: [{
			year: 2020,
			month: 0,
			date: 24,
			hour,
			events: []
		}, {
			year: 2020,
			month: 0,
			date: 25,
			hour,
			events: []
		}, {
			year: 2020,
			month: 0,
			date: 26,
			hour,
			events: []
		}],
		navLink: jest.fn(input => input)
	}
	afterEach(jest.clearAllMocks)

	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(<Days days={[]} />, div)
		ReactDOM.unmountComponentAtNode(div)
	})

	it("displays the day's date", () => {
		const days = shallow(<Days {...props} />)
		expect(days.find('h4').forEach(
			(node, index) => expect(node.text()).toBe(`${props.days[index].date}`)
		))
	})

	it('each article calls navLink on click', () => {
		const days = shallow(<Days {...props} />)
		days.find('article').forEach((node, index) => {
			const wrapper = node.shallow()
			wrapper.simulate('click')
		})
		expect(props.navLink.mock.calls.length).toBe(3)
	})
})
