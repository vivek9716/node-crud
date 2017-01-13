var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('underscore');

var salt = bcrypt.genSaltSync(10);
var LOGIN = {};
var Register = mongoose.model('Register');

LOGIN.loginAuth = function(data, next) {
	var jsonError = {};
	Register.find({email:data.email}, function (err, docs) {
	  if(err) {
		 next(err);
	  } else if (docs.length) {
		 next(null, docs);		 
      } else {
		 jsonError['email'] = 'Email Not In DB!!';
		 err = new Error(JSON.stringify(jsonError));
		 next(err);
	  }	  
  });
}

// make this available to our users in our Node applications
module.exports = LOGIN;
