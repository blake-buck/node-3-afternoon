const swag = require('../models/swag.js');

function read(req, res, next){
	res.status(200).json(swag);
}

module.exports = {
	read:(req, res, next) => {
		res.status(200).json(swag);
	}
}