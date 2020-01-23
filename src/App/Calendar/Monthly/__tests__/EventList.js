import React from 'react'
import ReactDOM from 'react-dom'
import EventList from '../EventList'
describe('<EventList />', () => {
	const now = (minutes) => new Date(2020, 0, 23, 16, minutes)
	const props = {
		events: [
			{ start: now(0), end: now(90), id: 'these', title: 'so' },
			{ start: now(20), end: now(40), id: 'are', title: 'are'},
			{ start: now(1000), end: now(1001), id: 'arbitrary', title: 'these' },
			{ start: now(1000), end: now(1001) }
		],
		handleClick: jest.fn(input => input)
	}
	afterEach(jest.clearAllMocks)

	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(<EventList {...props} />, div)
		ReactDOM.unmountComponentAtNode(div)
	})

	it('displays the event title', () => {
		const eventList = shallow(<EventList {...props} />)
		expect(eventList.find('li').forEach(
			(node, index) => expect(node.text()).toBe(props.events[index].title)
		))
	})

	it("li's call handleClick with event id on click", () => {
		const eventList = shallow(<EventList {...props} />)
		eventList.find('li').forEach((node, index) => {
			node.simulate('click', { stopPropagation: () => {} })
			expect(props.handleClick.mock.calls.length).toBe(index+1)
			expect(props.handleClick.mock.results[index].value).toEqual(props.events[index].id)
		})
	})
})
