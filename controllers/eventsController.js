const eventsRouter = require('express').Router();
const Event = require('../models/Event');
const validToken = require('../middlewares/validToken');


eventsRouter.get('/', validToken, async (req, resp) => {
	const events = await Event.find({});
	resp.json(events);
});



eventsRouter.post('/', validToken, async (req, resp) => {

	const {titulo, descripcion, lugar, fechas, destacado, imagen} = req.body;

	try{
		const newEvent = new Event({
			titulo,
			descripcion,
			lugar,
			fechas,
			destacado,
			imagen
		});
	
		const savedEvent = await newEvent.save();
		resp.json(savedEvent);
		
	} catch(err) {
		//console.log(err);
		resp.status(400).json(err.errors);
	}

	

});



module.exports = eventsRouter;