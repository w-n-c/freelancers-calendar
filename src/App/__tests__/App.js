import React from 'react'
import { Redirect } from '@reach/router'
import App from '../'
import Header from '../Header'
import { toDateString } from '../utils'
import ReactDOM from 'react-dom'

describe('<App />', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(<App />, div)
		ReactDOM.unmountComponentAtNode(div)
	})

	it(`passes date info to redirect and header`, () => {
		const today = toDateString(new Date())
		const wrapper = shallow(<App />)
		expect(wrapper.contains(<Redirect noThrow from="/" to={`monthly/${today}`} />)).toBe(true)
		expect(wrapper.contains(<Header path="/:view/:year/:month/:date/*" today={today} />)).toBe(true)
	})

	it(`renders Calendar`, () => {
		const wrapper = shallow(<App />)
		expect(wrapper.find('Calendar')).toHaveLength(1)
	})

	it(`adds the EventProvider`, () => {
		const wrapper = shallow(<App />)
		expect(wrapper.find('EventProvider')).toHaveLength(1)
	})

})
