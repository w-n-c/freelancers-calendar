import React, { useReducer, useEffect } from 'react'
import axios from 'axios'

const UserContext = React.createContext()
const { Provider, Consumer } = UserContext

const getUser = async () => (await axios.get('/api/current_user')).data

const reducer = (state, action) => {
	switch (action.type) {
		case 'login':
			return {
				loggedIn: true,
				name: action.payload
			}
		default:
			return state
	}
}

const UserProvider = (props) => {
	const [state, dispatch] = useReducer(reducer, {loggedIn: false, name: ''})
	useEffect(() => {
		(async function() {
			try {
				const { name } = await getUser()
				if (name && name !== state.name) {
					dispatch({ type: 'login', payload: name})
				} else {
					dispatch('')
				}
			} catch (err) {
				console.log('cannot reach server')
			}
		})()
	}, [state.name])

	const loginLink = <a href="/auth/google">Login</a>
	const logoutLink = (
		<div onClick={() => dispatch('')}>
			<a href="/api/logout">Logout</a>
		</div>
	)
	const userLink = () => { return state.loggedIn ? logoutLink : loginLink }

	return (
		<Provider value={{
			userLink,
			isLoggedIn: state.loggedIn, 
		}}>{props.children}</Provider>
	)
}


export { UserProvider, Consumer as UserConsumer }
export default UserContext
