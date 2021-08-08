const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/User');

usersRouter.get('/', async (req, resp) => {
	const users = await User.find({});
	resp.json(users);
});

usersRouter.post('/', async (req, resp) => {

	try {
		const {username, password} = req.body;

		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(password, saltRounds);
	
		const newUser = new User({
			username,
			passwordHash
		});
	
		const savedUser = await newUser.save();
	
		resp.json(savedUser);
	} catch (err) {
		resp.status(400).json(err);
	}
	

});

module.exports = usersRouter;