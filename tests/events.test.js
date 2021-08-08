/* eslint-disable no-undef */
const mongoose = require('mongoose');
const {server} = require('../index');
const Event = require('../models/Event');
const {api, initialEvents, getAllTitulosFromEvents, generarToken} = require('./helpers');

let token;


beforeEach(async () => {

	await Event.deleteMany({});
	for(const event of initialEvents) {
		const eventObject = new Event(event);
		await eventObject.save();
	}

	token = await generarToken();
});

describe('GET all events', () => {
	test('GET events', async () => {
		await api
			.get('/api/events')
			.set('Authorization', `Bearer ${token}`)
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});
	
	test('there are two notes', async () => {
		const response = await api.get('/api/events')
			.set('Authorization', `Bearer ${token}`);
		expect(response.body).toHaveLength(initialEvents.length);
	});
	
	test('the first note is about evento 1', async() => {
		const response = await api.get('/api/events')
			.set('Authorization', `Bearer ${token}`);
		const titulos = response.body.map(event => event.titulo);
		expect(titulos).toContain('evento 1');
	});
	
});

describe('POST event', () => {
	test('a valid event can be added', async () => {
		const newEvent = {
			'titulo': 'evento nuevo del test',
			'descripcion': 'Descripcion de evento nuevo del test',
			'lugar': 'Lugar 1',
			'fechas': ['2021-08-04', '2021-08-04'],
			'destacado': true,
			'imagen': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/800px-Google_Images_2015_logo.svg.png'
		};
		
		await api
			.post('/api/events')
			.set('Authorization', `Bearer ${token}`)
			.send(newEvent)
			.expect(200)
			.expect('Content-Type', /application\/json/);

		const {titulos, response} = await getAllTitulosFromEvents();
    
		expect(response.body).toHaveLength(initialEvents.length + 1);
		expect(titulos).toContain(newEvent.titulo);
	
	});

	test('event without titulo  is not added', async () => {
		const newEvent = {
			//'titulo': 'evento nuevo del test',
			'descripcion': 'Descripcion de evento nuevo del test',
			'lugar': 'Lugar 1',
			'fechas': ['2021-08-04', '2021-08-04'],
			'destacado': true,
			'imagen': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/800px-Google_Images_2015_logo.svg.png'
		};
    
		await api
			.post('/api/events')
			.set('Authorization', `Bearer ${token}`)
			.send(newEvent)
			.expect(400)
			.expect('Content-Type', /application\/json/);
    
		const response = await api.get('/api/events')
			.set('Authorization', `Bearer ${token}`);
		expect(response.body).toHaveLength(initialEvents.length);
        
	});
	
});




afterAll(() => {
	mongoose.disconnect();
	server.close();
});
