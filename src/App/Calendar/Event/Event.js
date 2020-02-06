import React, { useContext, useEffect } from 'react'
import { navigate } from '@reach/router'
import queryString from 'query-string'
import { pick } from 'lodash/fp'
import EventContext from '../../EventContext'
import FormManager from './FormManager'
import { dateFromDay, nextHour } from '../utils'

export const newEvent = (date) => ({
	start: date.toISOString(),
	end: nextHour(date).toISOString(),
	title: "",
	description: ""
})
export const newEventFromDay = (day) => newEvent(dateFromDay(day))

const navString = ({route, year, month, date}) => `/calendar/${route}/${year}/${month}/${date}`

export const Event = (props) => {
	const routeInfo = pick(['route', 'year', 'month', 'date'], props)
	const { location, id } = props
	const eventDate = queryString.parse(location.search)

	const { getEvent } = useContext(EventContext)

	const event = (id === 'new') ? newEventFromDay(eventDate) : getEvent(id)
	useEffect(()=>{},[event])
	const onClose = () => navigate(navString(routeInfo))

	return <FormManager event={event || newEvent(new Date())} onClose={onClose} />
}
