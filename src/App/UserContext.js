import React, { useState } from 'react'
import axios from 'axios'

const UserContext = React.createContext()
const { Provider, Consumer } = UserContext

const UserProvider = (props) => {
	const [state, updateState] = useState({
		loggedIn: false,
		name: ''
	})

	const getUser = async () => {
		try {
			const { name } = (await axios.get('/api/current_user')).data
			const loggedIn = name !== ''
			if (name !== state.name) updateState({name, loggedIn})
			return state
		} catch (error) {
			console.log(error)
			return state
		}
	}

	const loginLink = <a href="/auth/google">Login</a>
	const logoutLink = <a href="/api/logout">Logout</a>
		const userLink = () => {
			return state.loggedIn ? logoutLink : loginLink
		}

	return (
		<Provider value={{
			userLink,
			getUser
		}}>{props.children}</Provider>
	)
}


export { UserProvider, Consumer as UserConsumer }
export default UserContext
