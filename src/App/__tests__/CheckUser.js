import * as ReactAll from 'react'
import React from 'react'
import ReactDOM from 'react-dom'
import CheckUser from '../CheckUser'

describe('<CheckUser />', () => {
	function setup() {
		// Shallow render does not work with useContext so mock the functionality
		const div = document.createElement('div')
		const navigate = jest.fn()
		const getUser = jest.fn()

		jest.spyOn(ReactAll, 'useContext').mockImplementation(() => ({
			getUser
		}))

		return { div, navigate, getUser }
	}

	it('renders without crashing', () => {
		const { div, navigate } = setup()
		ReactDOM.render(<CheckUser navigate={navigate} />, div)
		ReactDOM.unmountComponentAtNode(div)
	})

	it('calls getUser and navigate on change', () => {
		const { div, navigate, getUser } = setup()
		ReactDOM.render(<CheckUser navigate={navigate} />, div)
		ReactDOM.render(<CheckUser navigate={navigate} />, div)
		expect(getUser.mock.calls.length).toBe(1)
		expect(navigate.mock.calls.length).toBe(1)
		ReactDOM.unmountComponentAtNode(div)
		expect(getUser.mock.calls.length).toBe(2)
		expect(navigate.mock.calls.length).toBe(2)
	})
})
