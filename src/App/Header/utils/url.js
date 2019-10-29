import { curry } from 'lodash/fp'

const _url = (eventUrl, date, view) => `/${view}/${date}/${eventUrl}`
export const url = curry(_url)
