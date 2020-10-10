const env = process.env.NODE_ENV || 'development';
require('dotenv').config();
const config = require('./config/config')[env];
const app = require('express')();
const mongoose = require('mongoose');
require('./config/express')(app);
require('./routes')(app);

const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cubicle-workshop.cmgb5.mongodb.net/cubicle-workshop?retryWrites=true&w=majority`;

mongoose.connect(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.listen(
	config.port,
	console.log(`Listening on port ${config.port}! Now its up to you...`)
);
