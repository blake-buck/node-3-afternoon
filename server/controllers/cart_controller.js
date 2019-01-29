const swag = require('../models/swag.js');

function add(req, res, next){	
	if(req.query.id){
		var doNext = true;
		
		for(var i=0; i<req.session.user.cart.length; i++){
			if(+req.query.id === req.session.user.cart[i].id){
				res.status(200).json(req.session.user);
				doNext = false;
			}
		}
		
		if(doNext){
			for(var j=0; j<swag.length; j++){
				if(swag[j].id === +req.query.id){
					req.session.user.cart.push(swag[j]);
					req.session.user.total += swag[j].price;
					console.log(req.session.user.total);
					res.status(200).json(req.session.user);
				}
			}
		}
		next();
	}
	
	
}

function remove(req, res, next){
	if(req.query.id){
		var spliceNum = 0;
		for(var i=0; i<req.session.user.cart.length; i++){
			if(req.query.id == req.session.user.cart[i].id)spliceNum = i;
		}
		
		req.session.user.total -= req.session.user.cart[spliceNum].price;
		
		req.session.user.cart.splice(spliceNum, 1);
		res.status(200).json(req.session.user);
		next();
	}
	
}

function checkout(req, res, next){
	var {user} = req.session;
	user.cart = [];
	user.total = 0;
	res.status(200).json(user);
	next();
}

module.exports ={
	add,
	remove,
	checkout
}