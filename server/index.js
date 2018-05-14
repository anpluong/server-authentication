const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
// create an instance of express
const app = express();

// DB Setup
// go connect with instance of mongodb - this creates a database inside mongodb called auth
mongoose.connect('mongodb://localhost:auth/auth');

// App setup

//mogan and body parsers are middleware. Any incoming request into our server will be passed into morgan and bodyParser by default. 
// mogan is a logging framework. What happens in the localhost server will be logged. Used for debugging
app.use(morgan('combined'));

// bodyParser is used to parse incoming requests, it is going to parse them into json, no matter what request type is
app.use(bodyParser.json({type: '*/*'}));
router(app);

// Server Setup
// if there is an environment variable of PORT already defined, use it. Otherwise use 3090
const port  = process.env.PORT || 3090

// this is a native node library with HTTP request. Create an HTTP server that knows how to receive HTTP request. and anything comes in, 
// put it in our express application. 

const server = http.createServer(app);
server.listen(port);
console.log('server listening on', port)