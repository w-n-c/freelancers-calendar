import React from 'react'
import * as ReactAll from 'react'
import ReactDOM from 'react-dom'
import { Weekly } from '../Weekly'

describe('<Weekly />', () => {
	jest.spyOn(ReactAll, 'useContext').mockImplementation(() => ({
		filterTodaysEvents: jest.fn(() => []),
	}))
	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(<Weekly />, div)
		ReactDOM.unmountComponentAtNode(div)
	})
})
