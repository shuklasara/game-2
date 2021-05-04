var restify = require('restify')
var bunyan = require('bunyan')

var server = restify.createServer();

var db = require('./db');

var user = require('./user');
var room = require('./room');


db.init();

server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());

// routing
server.get('/api/login', login);
server.get('/api/friendslist', friendslist);
server.get('/api/hide', hide);
server.get('/api/roominfo', roominfo);
server.get('/api/robfail', robfail);
server.get('/api/state', state);
server.get('/api/robreset', robreset);

server.get(/\/public\/?.*/, restify.serveStatic({
	directory: './public'
}));

/*
server.on('after', restify.auditLogger({
  log: bunyan.createLogger({
    name: 'audit',
    stream: process.stdout
  })
}));
*/

server.listen(3002, function() {
  console.log('%s listening at %s', server.name, server.url);
});

function handleError(err, next) {
  if (err instanceof Error)
    next(err);
  else
    next(new Error(err));
}

function login(req, res, next) {
	var username = req.params.username.toLowerCase();
	var pw = req.params.pw;

  user.login({ username: username, pw: pw }, function (err, data) {
    if (err) return handleError(err, next);
    res.send(data);
    return next();
  });
}

function friendslist(req, res, next) {
	var username = req.params.username.toLowerCase();

	user.friendslist({ username: username }, function (err, data) {
    if (err) return handleError(err, next);
    res.send(data);
		return next();
	});
}

function hide(req, res, next) {
	var username = req.params.username.toLowerCase();
	var hide = req.params.hide;

	room.hide({ username: username, hide: hide }, function (err, data) {
		if(err) return handleError(err, next);
		res.send(data);
		return next();
	});
}

function roominfo(req, res, next) {
	var username = req.params.username.toLowerCase();
	var friend_username = req.params.friend_username;
	
	room.roominfo({ username: username, friend_username: friend_username }, function (err, data) {
		if(err) return handleError(err, next);
		res.send(data);
		return next();
	});
}

function robfail(req, res, next) {
	var username = req.params.username.toLowerCase();
	var friend_username = req.params.friend_username;
	
	room.robfail({ username: username, friend_username: friend_username }, function (err, data) {
		if(err) return handleError(err, next);
		res.send(data);
		return next();
	});
}

function state(req, res, next) {
	var username = req.params.username.toLowerCase();
	
	room.state({ username: username }, function (err, data) {
		if(err) return handleError(err, next);
		res.send(data);
		return next();
	});
}

function robreset(req, res, next) {
	var username = req.params.username.toLowerCase();

	room.robreset({ username: username }, function (err, data) {
		if(err) return handleError(err, next);
		res.send(data);
		return next();
	});
}

