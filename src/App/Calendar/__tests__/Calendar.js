import * as ReactAll from 'react'
import React from 'react'
import ReactDOM from 'react-dom'
import { Calendar } from '../Calendar'

describe('<Calendar />', () => {
	// Shallow render does not work with useContext so mock the functionality
	jest.spyOn(ReactAll, 'useContext').mockImplementation(() => ({
		getUser: jest.fn(),
		checkEvents: jest.fn()
	}))

	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(<Calendar />, div)
		ReactDOM.unmountComponentAtNode(div)
	})

	it('calls handleUpdateToday on mouseover', () => {
		const onMouseMove = jest.fn()
		const preventDefault = jest.fn()

		const wrapper = shallow(
			<Calendar handleUpdateToday={onMouseMove} />
		).find('main').shallow()

		expect(preventDefault.mock.calls.length).toBe(0)
		expect(onMouseMove.mock.calls.length).toBe(0)
		wrapper.simulate('mouseMove', { preventDefault })
		expect(onMouseMove.mock.calls.length).toBe(1)
		expect(preventDefault.mock.calls.length).toBe(1)
	})
})
