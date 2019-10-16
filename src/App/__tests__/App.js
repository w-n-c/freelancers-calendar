import React from 'react'
import ReactDOM from 'react-dom'
import {App} from '../App'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe('<App />', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(<App />, div)
		ReactDOM.unmountComponentAtNode(div)
	})
	it('matches the snapshot', () => {
		const tree = shallow(<App />)
		expect(toJson(tree)).toMatchSnapshot()
	})
})
