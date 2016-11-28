$(document).ready(function(){
  $('form').submit(function() {
	var formId = this.id;
    $('.errors,.success').remove();
    var formErrors = VALIDATOR.check(this);
    if($.isEmptyObject(formErrors)) {
	  $('#loading-indicator').show();
	  $('#overlay').show();
      var serializedFormData = $(this).serialize();
      var saveControllerName = $(this).attr('controller-name');
      $.post(saveControllerName + '/send', serializedFormData, function(result) {
          //$('#'+formId).before('<span class="success">Your Information Saved Successfully.</span>');
      }).done(function(result) {
		  $('#loading-indicator').hide();
		  $('#overlay').hide();
          var result = $.parseJSON(result);
          if(result.status === 'success') {
            $('#'+formId).before('<div class="success">' + result.response_message + '</div>');
            $('#'+formId)[0].reset();  
          } else if(result.status === 'error') { 
            var errors = $.parseJSON(result.error);
            $.each(errors,function(key, value) {
                VALIDATOR.showServerMessage(value, key);
            });
          } else {
            $('#'+formId).before('<div class="errors">You have some errors.</div>');
          }
      });      
    }
    return false;
  });
});



/*===========================================Form Validation Start==================================================*/
var VALIDATOR = [];

VALIDATOR.check = function(obj) {
  var formErrors = {};
  
  var requiredErrors = VALIDATOR.checkRequired(obj);
  if(!$.isEmptyObject(requiredErrors)) {
    $.extend(formErrors, requiredErrors);
  }

  var mobileNumberErrors = VALIDATOR.checkMobileNumber(obj);
  if(!$.isEmptyObject(mobileNumberErrors)) {
    $.extend(formErrors, mobileNumberErrors);
  }

  var emailErrors = VALIDATOR.checkEmail(obj);
  if(!$.isEmptyObject(emailErrors)) {
    $.extend(formErrors, emailErrors);
  }

  var cpasswordErrors = VALIDATOR.checkConfirmPassword(obj);
  if(!$.isEmptyObject(cpasswordErrors)) {
    $.extend(formErrors, cpasswordErrors);
  }  

  return formErrors;  
};

VALIDATOR.checkRequired = function(obj) {
  var errors = {};
  $(obj).find(".required").each(function(){
      var value = $(this).val();
      if(value == "") {
        $.extend(errors, VALIDATOR.showMessage(this));        
      }
  });
  return errors;  
};

VALIDATOR.checkMobileNumber = function(obj) {
  var errors = {};
  $(obj).find(".mobile_number").each(function(){
      var value = $(this).val();
      var pattern = /^[1-9]{1}[0-9]{9}$/;
      if(!pattern.test(value)) {
        $.extend(errors, VALIDATOR.showMessage(this));        
      }
  });
  return errors;  
};

VALIDATOR.checkEmail = function(obj) {
  var errors = {};
  $(obj).find(".check_email").each(function(){
      var value = $(this).val();
      var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if(!pattern.test(value)) {
        $.extend(errors, VALIDATOR.showMessage(this));        
      }
  });
  return errors;  
};

VALIDATOR.checkConfirmPassword = function(obj) {
  var errors = {};
  $(obj).find(".confirm_password").each(function(){
      var value = $(this).val();
      if(value !== $('#password').val()) {
        $.extend(errors, VALIDATOR.showMessage(this));
      }
  });
  return errors;  
};

VALIDATOR.showMessage = function(obj) {
  var errors = {};
  var id = obj.id;
  if($('#error_'+id).length == 0) {
    var error_message = $(obj).attr('data-message');
    VALIDATOR.showServerMessage(error_message, id);
    //$('#'+id).after('<div class="errors" id="error_'+id+'">'+error_message+'</div>');
    errors[id] = error_message;
  }
  return errors;  
};

VALIDATOR.showServerMessage = function(error_message, id) {
  if($('#error_'+id).length == 0) {
    $('#'+id).after('<div class="errors" id="error_'+id+'">'+error_message+'</div>');    
  }  
};

/*===========================================Form Validation End==================================================*/
