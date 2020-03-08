import server from './eventServerApi'
import db from './eventDbApi'
import LoginError from './LoginError'

export const syncApi = loggedIn => ({
	create: async (request) => {
		let event = request
		try {
			event = await server.create(request)
		} finally {
			const id = await db.add(event)
			return { ...request, id }
		}
	},
	update: async (request) => {
		let event = request
		try {
			event = await server.update(request)
		} catch(error) {
			if (!(error instanceof LoginError)) {
			 db.cache.add({ update: event })
			 console.error(error)
			}
		} finally {
			await db.update(request)
			return request
		}
	},
	delete: async (id) => {
		try {
			await server.delete(id)
		} catch(error) {
			if (!(error instanceof LoginError)) {
			 db.cache.add({ delete: id })
			 console.error(error)
			}
		} finally {
			await db.delete(id)
		}
	}
})
