var express = require('express');
var validator = require('validator');
var router = express.Router();
var RegisterModel = require('../model/register_model');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/send', function(req, res, next) {
	var postData = {
	  name: req.body.full_name,
	  user_name:req.body.user_name,
	  email:req.body.email,
	  password:req.body.password,
	  cpassword:req.body.cpassword,
	  mobile_number:req.body.mobile_number,
	  gender:req.body.gender
  	};
  	
  	var errMessage = checkServerValidation(postData);
  	
	if(JSON.stringify(errMessage) == '{}') {		
		delete postData.cpassword;
		var saveDetail = new RegisterModel(postData);
		saveDetail.save(function(err) {
		  var responseData = null;
		  if(err) {
			responseData = JSON.stringify({
				'status' : 'error', 
				'response_code' : 302,
				'response_message' : 'Not Working.',
				'error': err.message
			});        
		  } else {
			responseData = JSON.stringify({
				'status' : 'success', 
				'response_code' : 301,
				'response_message' : 'You are registered successfully.'
			});        
		  }
		  res.end(responseData);
		});
	} else {
		responseData = JSON.stringify({
			'status' : 'error', 
			'response_code' : 303,
			'response_message' : 'Not Working.',
			'error': JSON.stringify(errMessage)
		}); 
		res.end(responseData);
	}	
});

var checkServerValidation = function (postData) {
	var errMessage = {};
	
	if (validator.isEmpty(postData.name)) {
		errMessage['full_name'] = 'Please enter your full name.';
	}
	
	if (validator.isEmpty(postData.user_name)) {
		errMessage['user_name'] = 'Please enter valid user name.';
	}
	
	if (!validator.isEmail(postData.email)) {
		errMessage['email'] = 'Please enter valid email address.';
	}
	
	if (validator.isEmpty(postData.password)) {
		errMessage['password'] = 'Please enter a password.';
	}
	
	if (validator.isEmpty(postData.cpassword) || !validator.equals(postData.cpassword, postData.password)) {
		errMessage['cpassword'] = 'Confirm password not matched.';
	}
	
	if (!validator.isMobilePhone(postData.mobile_number, 'en-IN')) {
		errMessage['mobile_number'] = 'Please enter a valid mobile number.';
	}
	
	if (validator.isEmpty(postData.gender)) {
		errMessage['gender'] = 'Please select gender.';
	}
	
	return errMessage;
};

module.exports = router;


























