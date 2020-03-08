import db from 'db'
import { omit } from 'lodash'

const eventDbApi = (table, cache) => {

	const localEvents = table.filter((item) => typeof item.id === 'number')

	const create = async (request) =>
		await table.add(omit(request, 'id'))

	const update = async (request) =>
		await table.update(request.id, omit(request, 'id'))

	const mapCache = async (callback) =>
		await cache.toCollection().modify(callback)

	return {
		db,
		localEvents,
		add: table.add,
		create,
		update,
		delete: table.delete,
		bulkAdd: table.bulkAdd,
		cache: {
			add: cache.add,
			map: mapCache
		}
	}
}

export const eventDb = eventDbApi(db.events, db.eventCache)
export default eventDb
