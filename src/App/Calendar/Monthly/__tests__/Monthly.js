import React from 'react'
import * as ReactAll from 'react'
import ReactDOM from 'react-dom'
import { Monthly } from '../Monthly'

describe('<Monthly />', () => {
	jest.spyOn(ReactAll, 'useContext').mockImplementation(() => ({
		filterTodaysEvents: jest.fn(() => []),
	}))
	const props = { year: 2020, month: 1, date: 18 }
	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(<Monthly {...props} />, div)
		ReactDOM.unmountComponentAtNode(div)
	})
})
