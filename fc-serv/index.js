const mongoose = require('mongoose')
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const keys = require('./config/keys')

const mongooseConfig = {
	useNewUrlParser: true,
	useUnifiedTopology: true

}
mongoose.connect(keys.mLabURI, mongooseConfig)

require('./models/User')
require('./models/Event')
require('./services/passport')

const app = express()
app.use(express.json())
app.use(
	session({
		secret: [keys.cookieSecret],
		maxAge: 14 * 24 * 60 * 60 * 1000,
		resave: false,
		saveUninitialized: false
	})
)

app.use(passport.initialize())
app.use(passport.session())
require('./routes/authRoutes')(app)
require('./routes/eventRoutes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT)
