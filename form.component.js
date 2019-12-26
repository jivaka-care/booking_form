$(document).ready(function () {
	var requiredErrorMessage = "This field is required";
	var emailPatternInvalidErrorMessage = "Invalid email address. Valid e-mail can contain only latin letters, numbers, '@' and '.' (e.g: example@domain.com)";
	var phoneNumberPatternInvalidErrorMessage = "Invalid phone number. Valid phone number contain only numbers (e.g: 01012345678)";
	
	var userFirstNameField = "#user-first-name";
	var userLastNameField = "#user-last-name";
	var userBirthdayField = "#user-birthday";
	var userNationalityField = "#user-nationality";
	var userLanguageField = "#user-language";
	var userMessengerTypeField = "#user-messenger-type";
	var userEmailAddressField = "#user-email-address";
	var userPhoneNumberField = "#user-phone-number";
	var clinicField = "#clinic";
	var treatmentField = "#treatment";
	var timeDateField = "#time-date";
	var timeHourField = "#time-hour";
	var notesField = "#notes";

	var clinicRadioName = "entry.896669018";
	
	var datepickerParams = { format: "yyyy.mm.dd", autoclose: true };
	
	var clinics = [
	  {
	    name: "Bioface",
		hours: [
		  { min: null, max: null },
		  { min: 1030, max: 2100 },
		  { min: 1030, max: 2100 },
		  { min: 1030, max: 2100 },
		  { min: 1030, max: 2100 },
		  { min: 1030, max: 2100 },
		  { min: 1030, max: 1700 },
		]
	  },
	  {
	    name: "Ppeum Myeongdong",
		hours: [
		  { min: 1030, max: 1700 },
		  { min: 1030, max: 2100 },
		  { min: 1030, max: 2100 },
		  { min: 1030, max: 2100 },
		  { min: 1030, max: 2100 },
		  { min: 1030, max: 2100 },
		  { min: 1030, max: 1900 },
		]
	  },
	  {
	    name: "Ppeum Sinnonhyeon",
		hours: [
		  { min: 1100, max: 1700 },
		  { min: 1030, max: 2100 },
		  { min: 1030, max: 2100 },
		  { min: 1030, max: 2100 },
		  { min: 1030, max: 2100 },
		  { min: 1030, max: 2100 },
		  { min: 1030, max: 1700 },
		]
	  },
	  {
	    name: "Ppeum Sinsa",
		hours: [
		  { min: 1030, max: 1700 },
		  { min: 1030, max: 2100 },
		  { min: 1030, max: 2100 },
		  { min: 1030, max: 2100 },
		  { min: 1030, max: 2100 },
		  { min: 1030, max: 2100 },
		  { min: 1030, max: 1900 },
		]
	  },
	  {
	    name: "Ppeum Hongdae",
		hours: [
		  { min: 1030, max: 1700 },
		  { min: 1030, max: 2100 },
		  { min: 1030, max: 2100 },
		  { min: 1030, max: 2100 },
		  { min: 1030, max: 2100 },
		  { min: 1030, max: 2100 },
		  { min: 1030, max: 1900 },
		]
	  },
	  {
	    name: "Junho Lee Dentistry",
		hours: [
		  { min: null, max: null },
		  { min: 1000, max: 1900 },
		  { min: 1000, max: 1900 },
		  { min: 1000, max: 2100 },
		  { min: 1000, max: 1900 },
		  { min: 1000, max: 1900 },
		  { min: 1030, max: 1500 },
		]
	  },
	  {
	    name: "Chang Clinic",
		hours: [
		  { min: null, max: null },
		  { min: 1030, max: 2100 },
		  { min: 1030, max: 1830 },
		  { min: 1030, max: 2100 },
		  { min: 1030, max: 1830 },
		  { min: 1030, max: 2100 },
		  { min: 1030, max: 1530 },
		]
	  }
	];
	
    $(userBirthdayField).datepicker(datepickerParams);
	
	$(timeDateField).datepicker(datepickerParams);
	initTimepicker(timeHourField, 0000, 2400);
	
	onUpdateEvent();
	
	$(userBirthdayField).change(function() {
      var val = $(this).val();
	  var date = val.split(".");
      
	  $(userBirthdayField + "-year-input").val(date[0]);
	  $(userBirthdayField + "-month-input").val(date[1]);
	  $(userBirthdayField + "-day-input").val(date[2]);
	});
	
	$(".btn-user-language").click(function() {
      var text = $(this).attr("name");

      $(userLanguageField + "-input").val(text);
	  
	  $(".btn-user-language").removeClass("choosed");
	  $("img[name='" + text + "']").addClass("choosed");
	});
	
	$(".btn-messenger-type").click(function() {
      var text = $(this).attr("name");
      $(userMessengerTypeField + "-input").val(text);
	  
	  $(".btn-messenger-type").removeClass("choosed");
	  $("img[name='" + text + "']").addClass("choosed");
	});
	
	$(clinicField).change(function(){
	  if ($(timeDateField).val().length > 0) {
	    var val = $(timeDateField).val();
	    var date = val.split(".");
	  
	    reInitTimeField(date);
	  } else {
		resetTimeField();
	  }
    });
	
	$(timeDateField).change(function() {
      var val = $(this).val();
	  var date = val.split(".");
      
	  $("#time-year-input").val(date[0]);
	  $("#time-month-input").val(date[1]);
	  $("#time-day-input").val(date[2]);
	  
	  reInitTimeField(date);
	});
	
	$(timeHourField).change(function() {
      var val = $(this).val();
	  
	  var dayNight = val.split(" ");
	  var time = dayNight[0].split(":");
	  var hour = parseInt(time[0]);
	  
	  if (hour != 12 && dayNight[1] == "PM") {
	    hour += 12;
	  }
	  if(hour == 12 && dayNight[1] == 'AM') {
		hour = 0;
	  }
	  
      $("#time-hour-input").val(hour);
	  $("#time-minute-input").val(time[1]);
	});
	
	$('#booking-form').submit(function(event) {	 
	  if (!isFormValid()) {
		event.preventDefault();  
	  }
	});
	
	function initTimepicker($field, $minTime, $maxTime) {
      if ($minTime != null && $maxTime != null) {
		addAndRemoveError(true, timeDateField, "");
		$($field + "-container").removeClass("hidden");
		
		$($field).timepicker({
          defaultTime: "",
		  showInputs: false,
		  minuteStep: 30,
        }).on('changeTime.timepicker', function(e) {    
		  var h = e.time.hours;
		  var m = ("0" + e.time.minutes).slice(-2);
		  var mer = e.time.meridian;
		
		  var temp = mer == "PM" && h < 12 ? (h+12) + "" + m : h + "" + m;
		
		  if ($maxTime != null && parseInt(temp) > $maxTime) {
		    var validTime = $maxTime > 12000 ? parseInt($maxTime.toString().substr(0, $maxTime.toString().length - 2)) - 12 + ":" + $maxTime.toString().substr($maxTime.toString().length, 2) + " PM"
		     : $maxTime.toString().substr(0, $maxTime.toString().length - 2) + ":" + $maxTime.toString().substr($maxTime.toString().length - 2, 2) + " AM"
		 
		    $($field).timepicker("setTime", validTime);
	      } else if ($minTime != null && parseInt(temp) < $minTime) {
		    var validTime = $minTime > 12000 ? parseInt($minTime.toString().substr(0, $minTime.toString().length - 2)) - 12 + ":" + $minTime.toString().substr($minTime.toString().length, 2) + " PM"
		     : ($minTime.toString().substr(0, $minTime.toString().length - 2)) + ":" + ($minTime.toString().substr($minTime.toString().length - 2, 2)) + " AM"
		 
		    $($field).timepicker("setTime", validTime);
	      }	
	    });
	  } else {
		  resetTimeField();
		  addAndRemoveError(false, timeDateField, "Clinic is Closed! Choose another date");
		  $($field + "-container").addClass("hidden");
	  }
	}
	
	function reInitTimeField($date) {
	  var newDate = new Date($date[0] + "-" + $date[1] + "-" + $date[2] + "T10:00:00Z");
      var day = newDate.getDay();

	  if ($("input[name='" + clinicRadioName + "']:checked").val() != undefined) {
		var selectedClinicHours = clinics.find(clinic => clinic.name === $("input[name='" + clinicRadioName + "']:checked").val()).hours;

		resetTimeField();
		initTimepicker(timeHourField, selectedClinicHours[day].min, selectedClinicHours[day].max);  
	  }
	}
	
	function resetTimeField() {
	  $("#time-hour-input").val("");
	  $("#time-minute-input").val("");
	  
	  $(timeHourField).timepicker("setTime", "");
	}
	
	function onUpdateEvent() {
	  onKeyUpCheckRequired(userFirstNameField);
	  onKeyUpCheckRequired(userLastNameField);
	  onChangeCheckRequired(userBirthdayField);
	  onKeyUpCheckRequired(userNationalityField);
	  onClickCheckRequired(userLanguageField);
	  onChangeEmail();
	  onChangePhoneNumber();
	  onCheckedOptionCheckRequired("radio", clinicRadioName, clinicField);
	  onKeyUpCheckRequired(treatmentField);
	  onChangeCheckRequired(timeDateField);
	  onChangeCheckRequired(timeHourField);	  
	}
	
	function onChangeEmail() {
	  $(userEmailAddressField).keyup(function() {
	    if (isRequiredFieldValid(userEmailAddressField)) {
		  isEmailValid();
		}
	  });
	}
	
	function onChangePhoneNumber() {
	  $(userPhoneNumberField).keyup(function() {
	    if (isRequiredFieldValid(userPhoneNumberField)) {
		  isPhoneNumberValid();
		}
	  });
	}
	
	function onCheckedOptionCheckRequired($type, $name, $inputField) {
	  $("input[type='" + $type + "'][name='" + $name + "']").change(function() {
		isRadioChecked($name, $inputField);
	  });
	}
	
	function onClickCheckRequired($inputField) {
	  $($inputField).click(function() {
	    addAndRemoveError(true, $inputField, requiredErrorMessage);
	  });
	}
	
	function onChangeCheckRequired($inputField) {
	  $($inputField).change(function() {
	    isRequiredFieldValid($inputField);
	  });
	}
	
	function onKeyUpCheckRequired($inputField) {
	  $($inputField).keyup(function() {
	    isRequiredFieldValid($inputField);
	  });
	}
	
	function isFormValid() {
	  var isValid = true;
	  var errorField = "";
	  if (!isRequiredFieldValid(userFirstNameField)) { errorField = setErrorField(isValid, userFirstNameField, errorField); isValid = false; }
	  if (!isRequiredFieldValid(userLastNameField)) { errorField = setErrorField(isValid, userFirstNameField, errorField); isValid = false; }
	  if (!isRequiredFieldValid(userBirthdayField)) { errorField = setErrorField(isValid, userBirthdayField, errorField); isValid = false; }
	  if (!isRequiredFieldValid(userNationalityField)) { errorField = setErrorField(isValid, userNationalityField, errorField); isValid = false; }
	  if (!isRequiredHiddenFieldValid(userLanguageField, "#user-language-input")) { errorField = setErrorField(isValid, userLanguageField, errorField); isValid = false; }
	  if (!isRequiredFieldValid(userEmailAddressField) || !isEmailValid()) { errorField = setErrorField(isValid, userEmailAddressField, errorField); isValid = false; }
	  if (!isRequiredFieldValid(userPhoneNumberField) || !isPhoneNumberValid()) { errorField = setErrorField(isValid, userPhoneNumberField, errorField); isValid = false; }
	  if (!isRadioChecked(clinicRadioName, clinicField)) { errorField = setErrorField(isValid, clinicField, errorField);  isValid = false; }
	  if (!isRequiredFieldValid(treatmentField)) { errorField = setErrorField(isValid, treatmentField, errorField); isValid = false; }
	  if (!isRequiredFieldValid(timeDateField) || !isClinicAvailable()) { errorField = setErrorField(isValid, timeDateField, errorField); isValid = false; }
	  if (!isRequiredFieldValid(timeHourField)) { errorField = setErrorField(isValid, timeDateField, errorField); isValid = false; }
	  
	  if (!isValid) {
	    $('html, body').animate({ scrollTop: $(errorField).offset().top - 25 }, 0);
	  }
	  
	  return isValid;
	}
	
	function setErrorField($isValid, $field, $previousField) {
	  return $isValid ? $field : $previousField;
	}
	
	function isClinicAvailable() {
	  addAndRemoveError(isClinicValid(), timeDateField, "Clinic is closed. Please select another date!");
	  
	  return isClinicValid();
	}
	
	function isClinicValid() {
  	  var val = $(timeDateField).val();
	  var date = val.split(".");
	  var newDate = new Date(date[0] + "-" + date[1] + "-" + date[2] + "T10:00:00Z");
      var day = newDate.getDay();

	  if ($("input[name='" + clinicRadioName + "']:checked").val() != undefined) {
		var selectedClinicHours = clinics.find(clinic => clinic.name === $("input[name='" + clinicRadioName + "']:checked").val()).hours;

		return selectedClinicHours[day].min != null && selectedClinicHours[day].max != null;
	  }
	  
	  return false;
	}
	
	function isRadioChecked($radioName, $inputField) {
	  var isRadioValid = $("input[name='" + $radioName + "']:checked").val() != undefined;
	  
	  addAndRemoveError(isRadioValid, $inputField, requiredErrorMessage);
	  
	  return isRadioValid;
	}
	
	function isPhoneNumberValid() {
	  var phoneNumberRegex = /\d{1,15}/;

	  return isPatternFieldValid(phoneNumberRegex, userPhoneNumberField, phoneNumberPatternInvalidErrorMessage);
	}
	
	function isEmailValid() {
	  var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

	  return isPatternFieldValid(emailRegex, userEmailAddressField, emailPatternInvalidErrorMessage);
	}
	
	function isPatternFieldValid($regex, $inputField, $errorMessage) {
	  var input = $($inputField).val();
	  var isInputPatternValid = $regex.test(input);
	  
	  addAndRemoveError(isInputPatternValid, $inputField, $errorMessage);
	  return isInputPatternValid;
	}
	
	function isRequiredHiddenFieldValid($inputField, $hiddenField) {
	  var isFieldValid = $($hiddenField).val().length > 0 && $($hiddenField).val().trim().length > 0;
	  
	  addAndRemoveError(isFieldValid, $inputField, requiredErrorMessage);
	  
	  return isFieldValid;
	}
	
	function isRequiredFieldValid($inputField) {
	  var isFieldValid = $($inputField).val().length > 0 && $($inputField).val().trim().length > 0;
	  
	  addAndRemoveError(isFieldValid, $inputField, requiredErrorMessage);
	  
	  return isFieldValid;
	}
	
	function addAndRemoveError($isValid, $inputField, $errorMessage) {
	  if ($isValid) {
		  $($inputField).removeClass("is-invalid");
		  $($inputField + "-error").text("");
	  } else {
		  $($inputField).addClass("is-invalid");
		  $($inputField + "-error").text($errorMessage);
	  }	  
	}
});