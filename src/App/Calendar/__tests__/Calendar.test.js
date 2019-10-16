import React from 'react'
import ReactDOM from 'react-dom'
import {Calendar} from '../Calendar'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

describe('<Calendar />', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(<Calendar />, div)
		ReactDOM.unmountComponentAtNode(div)
	})
	it('Calendar accepts handleUpdateToday as props', () => {
		const handleUpdateToday = () => {}
		const wrapper = shallow(<Calendar handleUpdateToday={handleUpdateToday} />)
		expect(wrapper.props.handleUpdateToday).toBe(handleUpdateToday)
	})
})
