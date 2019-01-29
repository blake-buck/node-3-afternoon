const swag = require('../models/swag.js');

function search(req, res, next){
	if(req.query.category){
		var newArr = swag.filter((val)=>val.category === req.query.category);
		res.status(200).json(newArr);
	}
	else{
		res.status(200).json(swag);
	}
	next();
}

module.exports ={
	search
}