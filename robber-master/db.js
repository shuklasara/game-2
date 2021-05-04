var mongo = require('mongodb');

var Server = mongo.Server,
		Db = mongo.Db,
		Bson = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('robber', server, {safe: true});

exports.init = function() {
	db.open(function(err, db) {
		if(!err) {
			console.log('connected to robber db');
			db.collection('users', {strict:true}, function(err, collection) {
				if(err) {
					console.log("The 'users' collection doesn't exist. populateDB()");
					populateDB();
				}
			});
		}
	});
};

function populateDB() {
	var users = [
		{
			username: "test",
			pw: "1234",
			points: 1000,
			rob_count: 0,
			robbed_count: 0,
			logged: 'N',
			hide: 'N',
			item_no: 1,
			user_image: 'http://2dal.com:3002/public/qa-guy.jpg',
			hide_pos: '',
			fail: 'N',
			auth_key: null
		},
		{
			username: "alice",
			pw: "1234",
			points: 1000,
			rob_count: 0,
			robbed_count: 0,
			logged: 'N',
			hide: 'N',
			item_no: 2,
			user_image: 'http://2dal.com:3002/public/alice2m.jpg',
			hide_pos: '',
			fail: 'N',
			auth_key: null
		},
		{
			username: "tony",
			pw: "1234",
			points: 1000,
			rob_count: 0,
			robbed_count: 0,
			logged: 'N',
			hide: 'N',
			item_no: 1,
			user_image: 'http://2dal.com:3002/public/images.jpg',
			hide_pos: '',
			fail: 'N',
			auth_key: null
		},

		{
			username: "techcrunch",
			pw: "1234",
			points: 1000,
			rob_count: 0,
			robbed_count: 0,
			logged: 'N',
			hide: 'N',
			item_no: 1,
			user_image: 'http://2dal.com:3002/public/10576v3-max-250x250.jpg',
			hide_pos: '',
			fail: 'N',
			auth_key: null
		},
		{
			username: "flitto",
			pw: "1234",
			points: 1000,
			rob_count: 0,
			robbed_count: 0,
			logged: 'N',
			hide: 'N',
			item_no: 1,
			user_image: 'http://2dal.com:3002/public/776779886691d298c8fca38a28bcdefc.jpg',
			hide_pos: '',
			fail: 'N',
			auth_key: null
		},
		{
			username: "mario",
			pw: "1234",
			points: 1000,
			rob_count: 0,
			robbed_count: 0,
			logged: 'N',
			hide: 'N',
			item_no: 1,
			user_image: 'http://2dal.com:3002/public/mario.jpg',
			hide_pos: '',
			fail: 'N',
			auth_key: null
		},
		{
			username: "wonderwoman",
			pw: "1234",
			points: 1000,
			rob_count: 0,
			robbed_count: 0,
			logged: 'N',
			hide: 'N',
			item_no: 1,
			user_image: 'http://2dal.com:3002/public/wonder-woman-tv-series-04-g.jpg',
			hide_pos: '',
			fail: 'N',
			auth_key: null
		}
	];

	db.collection('users', function(err, collection) {
		collection.insert(users, {safe:true}, function(err, result) {});
	});
};

exports.findByUsername = function(options, callback) {
	db.collection('users', function(err, collection) {
		collection.findOne(options, callback);
	});
};

exports.friendsList = function(options, callback) {
	db.collection('users', function(err, collection) {
		collection.find({username: {$ne:options.username}}, {user_image:1, username:1, hide:1}).toArray(function(err, users) {
			callback(null, users);
		});
	});
};

exports.hide = function(options, callback) {
	db.collection('users', function(err, collection) {
		collection.update({'username': options.username}, {$set: {hide: 'Y', hide_pos: options.hide}}, {safe:true}, function(err, result) {
				if(err) {
					console.log('Error updating user: ' + err);
					callback(err, null);
					res.send({'error':'An error has occurred'});
				} else {
					console.log('' + result + ' document(s) updated');
					callback(null, result); 
			}
   	});
	}); 
};

exports.robfail = function(options, callback) {
	db.collection('users', function(err, collection) {
		collection.update({'username': options.username}, {$set: {fail: 'Y'}}, {safe:true}, function(err, result) {
				if(err) {
					console.log('Error updating user: ' + err);
					callback(err, null);
					res.send({'error':'An error has occurred'});
				} else {
					console.log('' + result + ' document(s) updated');
					callback(null, result); 
			}
   	});
	}); 
};

exports.robreset = function(options, callback) {
	db.collection('users', function(err, collection) {
		collection.update({'username': options.username}, {$set: {fail: 'N'}}, {safe:true}, function(err, result) {
				if(err) {
					console.log('Error updating user: ' + err);
					callback(err, null);
					res.send({'error':'An error has occurred'});
				} else {
					console.log('' + result + ' document(s) updated');
					callback(null, result); 
			}
   	});
	}); 
};
