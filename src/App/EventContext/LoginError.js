class LoginError extends Error {
	constructor(message = 'not logged in') {
		super(message)
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, LoginError)
		}
		this.name = 'LoginError'
	}
}
export default LoginError
