const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/User');

loginRouter.post('/', async (req, resp) => {
	const {username, password} = req.body;

	console.log(password);

	const user = await User.findOne({ username });

	const passwordCorrect = user === null
		? false
		: await bcrypt.compare(password, user.passwordHash);
    
	if(!(user && passwordCorrect)) {
		resp.status(401).json({
			error: 'invalid user or password'
		});
	}

	const userForToken = {
		id: user._id,
		username: user.username
	};

	console.log(process.env.SECRET);
	const token = jwt.sign(
		userForToken,
		process.env.SECRET
	);

	resp.send({
		username: user.username,
		token
	});
    
});

module.exports = loginRouter;