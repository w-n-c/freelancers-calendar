import { curry } from 'lodash/fp'

const _url = (eventUrl, date, view) => `/calendar/${view}/${date}/${eventUrl}`
export const url = curry(_url)
