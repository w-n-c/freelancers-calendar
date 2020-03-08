import { useMemo, useState } from 'react'

export const useApi = (apiFactory, initialState) => {
	let [state, setState] = useState(initialState)
	return useMemo(() => apiFactory({ state, setState }), [state, setState, apiFactory])
}

export default useApi
