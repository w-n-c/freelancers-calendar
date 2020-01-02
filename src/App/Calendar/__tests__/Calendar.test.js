import * as ReactAll from 'react'
import React from 'react'
import ReactDOM from 'react-dom'
import {Calendar} from '../Calendar'

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
})
