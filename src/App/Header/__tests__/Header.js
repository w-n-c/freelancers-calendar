import * as ReactAll from 'react'
import React from 'react'
import { Header } from '../Header'
import { toDateString } from '../../utils'

describe('<Header />', () => {
	// location.search and '*' are provided by routing library
	const monthlyProps = {
		view: 'monthly',
		today: toDateString(new Date('2018/1/14')),
		'*': '',
		location: {
			search: ''
		},
		year: '2019',
		month: '10',
		date: '19'
	}
	const weeklyProps = {
		view: 'weekly',
		today: toDateString(new Date('2020/11/6')),
		'*': '',
		location: {
			search: ''
		},
		year: '2018',
		month: '10',
		date: '16'
	}


	// Shallow render does not work with useContext so mock the functionality
	jest.spyOn(ReactAll, 'useContext').mockImplementation(() => ({
		userLink: jest.fn(() => <a href="/auth/google">Login</a>)
	}))

	it('renders when given the correct props', () => {
		const wrapper = shallow(<Header {...monthlyProps} />)
		expect(wrapper.html()).toBeDefined()
	})

	it('sets today link based on props', () => {
		const monthly = shallow(<Header {...monthlyProps} />)
		const mToday = monthly.find({title: 'Return to Today'})
		expect(mToday.props()).toHaveProperty('to', '/calendar/monthly/2018/1/14/')

		const weekly = shallow(<Header {...weeklyProps} />)
		const wToday = weekly.find({title: 'Return to Today'})
		expect(wToday.props()).toHaveProperty('to', '/calendar/weekly/2020/11/6/')
	})

	it('displays a login link', () => {
		const monthly = shallow(<Header {...monthlyProps} />)
		expect(monthly.contains(<li><a href={`/auth/google`}>Login</a></li>)).toBe(true)
		const weekly = shallow(<Header {...weeklyProps} />)
		expect(weekly.contains(<li><a href={`/auth/google`}>Login</a></li>)).toBe(true)
	})

})
