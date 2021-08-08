const mongoose = require('mongoose');

const {MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV} = process.env;

const connectionString = NODE_ENV !== 'test'
	? MONGO_DB_URI
	: MONGO_DB_URI_TEST;

mongoose.connect(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: true,
	useCreateIndex: false
})
	.then(() => {
		console.log('Database connected');
	}). catch (err => {
		console.error(err);
	});