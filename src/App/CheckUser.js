import React, { useEffect, useContext } from "react"
import UserContext from './UserContext'
import EventContext from './EventContext'

export default ({navigate}) => {
	const {getUser} = useContext(UserContext)
	useEffect(() => {
		getUser()
		navigate('/')
	})

	return (
		<h1>Loading...</h1>
	)
}
