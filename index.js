require ('dotenv').config();
require ('./mongo');

const cors = require('cors');
const express = require('express');
const app = express();

const notFound = require('./middlewares/notFound');

const eventsRouter = require('./controllers/eventsController');
const usersRouter = require('./controllers/usersController');
const loginRouter = require('./controllers/loginController');


app.use(cors());
app.use(express.json());

app.use('/api/events', eventsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(notFound);


const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
	console.log(`Server running on the port ${PORT}`);
});

module.exports = {app, server};