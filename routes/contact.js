var express = require('express');
var router = express.Router();
var ContactModel = require('../model/contact_model');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/send', function(req, res, next) {
	//console.log(req.body);
	//res.end(JSON.stringify(req.body));
  	//res.render('contact', { title: 'Contact' });
  	var saveDetail = new ContactModel({
		name: req.body.name,
		email:req.body.email,
		message:req.body.message,
  	});
  	saveDetail.save(function(err){
  		if(err) throw err;

  		responseData = JSON.stringify({'status' : 'success', 'response_code' : 201,'response_message' : 'We are happy to hear, You will assist within 24 hours.'});
  		res.end(responseData);
  	});

});

module.exports = router;
