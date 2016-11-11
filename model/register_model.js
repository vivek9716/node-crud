var bcrypt = require('bcrypt');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://127.0.0.1:27017/contact_user');

var Schema = mongoose.Schema;

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
  Register.find({email : self.email}, function (err, docs) {
      if (docs.length) {
          jsonError['email'] = 'Email already register, please login.';
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