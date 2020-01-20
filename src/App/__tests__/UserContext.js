import React from 'react'
import ReactDOM from 'react-dom'
import { UserProvider, UserConsumer } from '../UserContext'

describe('<UserContext />', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(<UserProvider />, div)
		ReactDOM.unmountComponentAtNode(div)
		ReactDOM.render(<UserConsumer>{() => {}}</UserConsumer>, div)
		ReactDOM.unmountComponentAtNode(div)
	})
})
