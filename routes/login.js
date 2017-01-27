var express = require('express');
var router = express.Router();
var loginModel = require('../model/login_model');

var sess;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/send', function(req, res, next) {
	var postData = {
	  email:req.body.email,
	  password:req.body.password	  
  	};
  	
  	sess = req.session;
  	
  	loginModel.loginAuth(postData, function (err, result) {
		var responseData = '{}';
		
		if(err) {
		 responseData = JSON.stringify({
				'status' : 'error', 
				'response_code' : 302,
				'response_message' : 'Not Working.',
				'error': err.message
			});
		} else {
			result = JSON.parse(result);
			if(result.status == 'success') {
				
				sess.user_info = result.user_info;
				
				responseData = JSON.stringify({
					'status' : 'success', 
					'response_code' : 303,
					'response_message' : 'Login successfully.'
				});
			}
		}
		res.end(responseData);
	});  		
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
