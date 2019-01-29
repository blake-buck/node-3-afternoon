require('dotenv').config();
const express = require('express');
const session = require('express-session');

const {json}  = require('body-parser');
const {checkForSession} = require('./middlewares/checkForSession.js');

const {read} = require('./controllers/swag_controller.js');
const {login,register,signout,getUser, getAll} = require('./controllers/auth_controller.js');

const {add, remove, checkout} = require('./controllers/cart_controller.js');
const {search} = require('./controllers/search_controller.js');

const app = express();

const SERVER_PORT = process.env.SERVER_PORT;
const SESSION_SECRET = process.env.SESSION_SECRET;

app.use(json());

app.use(session({
	secret:process.env.SESSION_SECRET,
	resave:false,
	saveUninitialized:true
}));

app.use(checkForSession);

app.use( express.static( `${__dirname}/../build` ) );

app.get('/api/swag', read);
app.get('/api/user', getUser);
app.get('/api/search', search);
app.get('/api/all', getAll);

app.post('/api/login', login);
app.post('/api/register', register);
app.post('/api/signout', signout);

app.post('/api/cart', add);
app.post('/api/cart/checkout', checkout);

app.delete('/api/cart', remove);

app.listen(SERVER_PORT, ()=>console.log(`Listening on port ${SERVER_PORT}`));