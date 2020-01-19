import React from 'react'
import * as ReactAll from 'react'
import ReactDOM from 'react-dom'
import { Event } from '../Event'

describe('<Event />', () => {
	jest.spyOn(ReactAll, 'useContext').mockImplementation(() => ({
		getEvent: jest.fn(() => ({})),
	}))

	// location.search === browser's window.location.search
	const props = {
		location: {
			search: ''
		},
	}

	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(<Event {...props} />, div)
		ReactDOM.unmountComponentAtNode(div)
	})
})
