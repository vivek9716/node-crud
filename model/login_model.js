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
		 if (bcrypt.compareSync(data.password, docs[0].password)) {
			jsonError['status'] = 'success'; 
			jsonError['user_info'] = docs[0]; 
			next(null, JSON.stringify(jsonError));	
		 } else {
			 jsonError['email'] = 'Email/Password Not Matched.';
			 err = new Error(JSON.stringify(jsonError));
			 next(err);
		 }
		 
      } else {		 
		 jsonError['email'] = 'Email Not In DB!!';
		 err = new Error(JSON.stringify(jsonError));
		 next(err);
	  }	  
  });
}

// make this available to our users in our Node applications
module.exports = LOGIN;
