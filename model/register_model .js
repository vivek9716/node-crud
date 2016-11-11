var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/contact_user');

var Schema = mongoose.Schema;

// create a schema
var registerSchema = new Schema({
  name: String,
  email:String,
  password:String,
  mobile_number:String,
  gender:String,
  created_at: Date,
  updated_at: Date
});



registerSchema.pre('save', function(next) {
	
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

// the schema is useless so far
// we need to create a model using it
var Register = mongoose.model('userRegister', registerSchema);

// make this available to our users in our Node applications
module.exports = Register;