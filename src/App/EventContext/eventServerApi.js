import axios from 'axios'
import LoginError from './LoginError'

const throwUnless = (loggedIn) => cb => {
	if (loggedIn) return cb
	throw new LoginError()
}

const get = async () => (await axios.get('/api/events')).data
const create = async (request) => (await axios.post('/api/events/new', request)).data
const createMany = async (request) => (await axios.post('/api/events/', request)).data
const update = async (request) => (await axios.post(`/api/events${request.id}`, request)).data
const _delete = async (id) => (await axios.delete(`/api/events/${id}`)).data

export const server = (loggedIn) => {
	const throwOr = throwUnless(loggedIn)
	return {
		get: throwOr(get),
		create: throwOr(create),
		createMany: throwOr(createMany),
		update: throwOr(update),
		delete: throwOr(_delete),
	}
}

export default server
