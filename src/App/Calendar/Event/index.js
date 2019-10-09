import React, { useContext } from 'react'
import EventContext from '../../EventContext'
import FormManager from './FormManager'

const newEvent = (year, month, date) => ({
	start: new Date(`${year}/${month}/${date}`).toISOString(),
	end: new Date(`${year}/${month}/${date}`).toISOString(),
	title: "",
	description: ""
})

export default (props) => {
	const { getEvent } = useContext(EventContext)
	const { route, year, month, date, id } = props
	const event = (id === 'new') ? newEvent(year, month, date) : getEvent(id)
	const onClose = () => props.navigate(`/${route}/${year}/${month}/${date}`)

	return <FormManager event={event} onClose={onClose} />
}
