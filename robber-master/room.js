var db = require('./db');

exports.hide = function(options, callback) {
	var ret_data;
	var err;

	if(!options.username || options.username == '') {
		return callback(new Error('You must login first.'));
	}

	if(!options.hide) {
		return callback(new Error('invalid parameter'));
	}

	db.hide(options, function(err, res) {	
		if(res) {
			ret_data = {};
		} else {
			ret_data = {};
		}
	});
	
	callback(err, ret_data);
}

exports.roominfo = function(options, callback) {
	var ret_data;
	var err;
	
	if(!options.username || options.username == '') {
		return callback(new Error('You must login first.'));
	}

	if(!options.friend_username) {
		return callback(new Error('invalid parameter'));
	}

	db.findByUsername({username: options.friend_username}, function(err, res) {
		if(res) {
			ret_data = {
				item_no: res.item_no,
				hide: res.hide_pos
			};
			callback(err, ret_data);
		}	else {
			return callback(new Error('invalid user'));
		}
	});
}

exports.robfail = function(options, callback) {
	var ret_data;
	var err;
	
	if(!options.username || options.username == '') {
		return callback(new Error('You must login first.'));
	}

	if(!options.friend_username) {
		return callback(new Error('invalid parameter'));
	}

	db.robfail({username: options.friend_username}, function(err, res) {
		if(res) {
			ret_data = {};
			callback(err, ret_data);
		}	else {
			return callback(new Error('invalid user'));
		}
	});
}

exports.state = function(options, callback) {
	var ret_data;
	var err;
	
	if(!options.username || options.username == '') {
		return callback(new Error('You must login first.'));
	}

	db.findByUsername({username: options.username}, function(err, res) {
		if(res) {
			ret_data = {
				fail: res.fail
			};
			callback(err, ret_data);
		}	else {
			return callback(new Error('invalid user'));
		}
	});
}

exports.robreseet = function(options, callback) {
	var ret_data;
	var err;
	
	if(!options.username || options.username == '') {
		return callback(new Error('You must login first.'));
	}

	db.robreset({username: options.username}, function(err, res) {
		if(res) {
			ret_data = {};
			callback(err, ret_data);
		}	else {
			return callback(new Error('invalid user'));
		}
	});
}


