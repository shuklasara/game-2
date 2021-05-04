var db = require('./db');

exports.login = function(options, callback) {
	var ret_data;
	var err;

	db.findByUsername(options, function(err, res) {
		if(res) {
			ret_data = res;
			ret_data.logged = 'Y';
			callback(err, ret_data);
		}	else {
			ret_data = { logged: 'N' };
			callback(err, ret_data);
		}
	});
}

exports.friendslist = function(options, callback) {
	var ret_data;
	var err;

	if(!options.username || options.username == '') {
		return callback(new Error('You must login first'));
	}

	db.friendsList(options, callback);
}
