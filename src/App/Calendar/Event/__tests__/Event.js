import * as ReactAll from 'react'
import React from 'react'
import ReactDOM from 'react-dom'
import { Event } from '../Event'

describe('<Event />', () => {
	// Shallow render does not work with useContext so mock the functionality
	jest.spyOn(ReactAll, 'useContext').mockImplementation(() => ({
		getEvent: jest.fn(),
		isLoggedIn: true
	}))

	it('renders without crashing', () => {
		const div = document.createElement('div')
		const props = {
			location: {
				search: 'provided by routing library'
			}
		}
		ReactDOM.render(<Event {...props} />, div)
		ReactDOM.unmountComponentAtNode(div)
	})
})
