import React from 'react'
import ReactDOM from 'react-dom'
import Hour from '../Hour'

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
})
