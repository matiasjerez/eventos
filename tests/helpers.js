const {app} = require('../index');
const supertest =require('supertest');
const api = supertest(app);
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const initialEvents = [
	{
		'titulo': 'evento 1',
		'descripcion': 'Descripcion 1 con test',
		'lugar': 'Lugar 1',
		'fechas': ['2021-08-04', '2021-08-04'],
		'destacado': true,
		'imagen': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/800px-Google_Images_2015_logo.svg.png'
	},
	{
		'titulo': 'Evento test 2',
		'descripcion': 'Descripcion 2 con test',
		'lugar': 'Lugar 1',
		'fechas': ['2021-08-04', '2021-08-04'],
		'destacado': true,
		'imagen': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/800px-Google_Images_2015_logo.svg.png'
	}
];

const getUsers = async () => {
	const response = await api.get('/api/users');
	console.log(response.body);
    
};


const getAllTitulosFromEvents = async () => {
	const response = await api.get('/api/events')
		.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMTAyMDNlMTIxYTZhMzZmYzQxYjk4OCIsInVzZXJuYW1lIjoibWF0aWFzX3Rlc3QiLCJpYXQiOjE2Mjg0NDcxNTd9.eUYHvcH2w59x2jO98tLQQXyXPHe5bGNcpsXmb5Tvy9g');
		
	return {
		titulos: response.body.map( evento => evento.titulo),
		response
	};
};


const generarToken = async () => {
	await User.deleteMany({});

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash('123', saltRounds);
	const user = new User ({
		username: 'usertest',
		passwordHash
	});

	const savedUser = await user.save();

	const userDB = await User.findOne({ username: savedUser.username });

	const userForToken = {
		id: userDB._id,
		username: userDB.username
	};

	const token = await jwt.sign(
		userForToken, 
		process.env.SECRET,
		{
			expiresIn: 60 * 60 * 24 * 7
		}
	);
    
	//console.log(token);
	return token;

};

module.exports = {
	initialEvents,
	api,
	getUsers,
	getAllTitulosFromEvents,
	generarToken
};