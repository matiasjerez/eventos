const jwt = require('jsonwebtoken');

module.exports = (req, resp, next) => {
	const authorization = req.get('authorization');
	let token = '';

	if(authorization && authorization.toLowerCase().startsWith('bearer')) {
		token = authorization.substring(7);
	}

	try {
		jwt.verify(token, process.env.SECRET);
	} catch (e){
		return resp.status(400).json({error: 'token missing or invalid'});
	}

	next();
};