import React from 'react'
import { Header } from '../Header'
import { toDateString } from '../../utils'

describe('<Header />', () => {
	it('renders when given the correct props', () => {
		// location.search and '*' are provided by routing library
		const props = {
			view: 'monthly',
			today: toDateString(new Date()),
			'*': '',
			location: {
				search: ''
			},
			year: '2019',
			month: '10',
			date: '19'
		}
		const wrapper = shallow(<Header {...props} />)
		expect(wrapper.html()).toBeDefined()
	})

	it(`sets today link based on props `, () => {
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
		const monthly = shallow(<Header {...monthlyProps} />)
		const mToday = monthly.find({title: 'Return to Today'})
		expect(mToday.props()).toHaveProperty('to', '/monthly/2018/1/14/')

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
		const weekly = shallow(<Header {...weeklyProps} />)
		const wToday = weekly.find({title: 'Return to Today'})
		expect(wToday.props()).toHaveProperty('to', '/weekly/2020/11/6/')
	})

})
