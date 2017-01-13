var express = require('express');
var router = express.Router();
var loginModel = require('../model/login_model');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/send', function(req, res, next) {
	var postData = {
	  email:req.body.email,
	  password:req.body.password	  
  	};
  	
  	loginModel.loginAuth(postData, function (err, result) {
		if(err) {
		 responseData = JSON.stringify({
				'status' : 'error', 
				'response_code' : 302,
				'response_message' : 'Not Working.',
				'error': err.message
			});
		} else {
			responseData = JSON.stringify(result);			
		}
		res.end(responseData);
	});
  	
		
	/*var authDetail = new LoginModel({
	  email:req.body.email,
	  password:req.body.password	  
  	});
  	
  	authDetail.logon(function(err) {
		res.end('Working');
	});*/
});

router.post('/send1', function(req, res, next) {
	var saveDetail = new RegisterModel({
	  name: req.body.full_name,
	  user_name:req.body.user_name,
	  email:req.body.email,
	  password:req.body.password,
	  mobile_number:req.body.mobile_number,
	  gender:req.body.gender
  	});
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
});

module.exports = router;
