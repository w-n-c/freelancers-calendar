import Dexie from 'dexie'

const db = new Dexie('EventsDB')
db.version(1).stores({
	events: '++id',
	eventCache: '++id',
})

export default db
