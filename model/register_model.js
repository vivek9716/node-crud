var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('underscore');

// create a schema
var registerSchema = new Schema({
  name: String,
  user_name:String,
  email:String,
  password:String,
  mobile_number:String,
  gender:String,
  created_at: Date,
  updated_at: Date
});
var salt = bcrypt.genSaltSync(10);


registerSchema.pre('save', function(next) {
  var self = this;
  var jsonError = {};
  
  Register.find({$or:[{user_name:self.user_name},{email:self.email},{mobile_number:self.mobile_number}]}, function (err, docs) {
	  if(err) {
		  next(err);
	  } else if (docs.length) {		  
		  if (_.find(docs , {mobile_number: self.mobile_number})) {
			jsonError['mobile_number'] = 'Mobile Number exist, use other.';			
		  }
		  if (_.find(docs , {email: self.email})){
			jsonError['email'] = 'Email already register, please login.';			
		  }
		  if (_.find(docs , {user_name: self.user_name})){
			jsonError['user_name'] = 'User Name already exist, choose other.';			
		  }
		  err = new Error(JSON.stringify(jsonError));
		  next(err);        
      } else {
        next();
      }
  });
  
  
  this.password = bcrypt.hashSync(this.password, salt);
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at)
    this.created_at = currentDate;  
});

// the schema is useless so far
// we need to create a model using it
var Register = mongoose.model('Register', registerSchema);

// make this available to our users in our Node applications
module.exports = Register;
