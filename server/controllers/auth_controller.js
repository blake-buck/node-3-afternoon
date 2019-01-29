const user = require('../models/users.js');
let id = 1;

function login(req, res, next){
	var {username, password} = req.body;
	for(var i=0; i< user.length; i++){
		if(username === user[i].username && password == user[i].password){
			req.session.user.username = username;
			res.status(200).json(req.session.user);
			next();
		}
	}
	res.status(500);
	next();
}

function register(req, res, next){
	var {username, password} = req.body;
	user.push({id, username, password});
	id++;
	req.session.user.username = username;
	res.status(200).json(req.session.user);
	next();
}

function signout(req, res, next){
	req.session.destroy();
	res.json(req.session);
	next();
}

function getUser(req, res, next){
	res.status(200).json(req.session.user);
}

function getAll(req, res, next){
	res.json(user)
}

module.exports = {
	login,
	register,
	signout,
	getUser,
	getAll
}