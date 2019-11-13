import React, { useContext } from 'react'
import { navigate } from '@reach/router'
import queryString from 'query-string'
import { pick } from 'lodash/fp'
import EventContext from '../../EventContext'
import FormManager from './FormManager'
import { dateFromDay, nextHour } from '../utils'

const newEvent = (day) => {
	const date = dateFromDay(day)
	return {
		start: date.toISOString(),
		end: nextHour(date).toISOString(),
		title: "",
		description: ""
	}
}

const navString = ({route, year, month, date}) => `/calendar/${route}/${year}/${month}/${date}`

export default (props) => {
	const { getEvent } = useContext(EventContext)
	const { location, id } = props

	const eventDate = queryString.parse(location.search)
	const event = (id === 'new') ? newEvent(eventDate) : getEvent(id)

	const routeInfo = pick(['route', 'year', 'month', 'date'], props)
	const onClose = () => navigate(navString(routeInfo))

	return <FormManager event={event} onClose={onClose} />
}
