const mongoose = require('mongoose');
const { model, Schema} = mongoose;

const validator = (val) => {
	return val.length !== 0;	
};
const custom = [validator, '"fechas" cannot be null'];

const eventSchema = new Schema({
	titulo: {type: String, required: true},
	descripcion: {type: String, required: true},
	lugar: {type: String, required: true},
	fechas: {type: [Date], validate: custom},
	destacado: {type: Boolean, default: false},
	imagen: {type: String, required: true}
});

eventSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id;
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.passwordHash;
	}
});

const Event = model('Event', eventSchema);

module.exports = Event;
