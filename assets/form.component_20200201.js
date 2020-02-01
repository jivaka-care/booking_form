$(document).ready(function () {
	var requiredErrorMessage = "This field is required";
	var emailPatternInvalidErrorMessage = "Invalid email address. Valid e-mail can contain only latin letters, numbers, '@' and '.' (e.g: example@domain.com)";
	
	var userNameField = "#user-name";
	var userMessengerIdField = "#user-messenger-id";
	var userMessengerTypeField = "#user-messenger-type";
	var userEmailAddressField = "#user-email-address";
	
	
    onUpdateEvent();
	$('#booking-form').submit(function(event){
		location.href = "https://beauty.jivaka.care/pages/coupon-confirmation";
		if (!isFormValid()) {
			event.preventDefault();  
		}
	});
	$('#booking-form-bottom').submit(function(event){
		location.href = "https://beauty.jivaka.care/pages/coupon-confirmation";
		if (!isFormValid()) {
			event.preventDefault();  
		}
	});
	
	function initTimepicker($field, $minTime, $maxTime, $lunchStartTime, $lunchEndTime) {
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
		
		  if (($lunchStartTime != null && parseInt(temp) >= $lunchStartTime) && ($lunchEndTime != null && parseInt(temp) < $lunchEndTime)) {
			var isMinusTime = prevTime < parseInt(temp);
		    prevTime = parseInt(temp);  

			var validTime = isMinusTime ? convertTime($lunchStartTime - minusHalfMinutes) : convertTime($lunchEndTime);
		 
		    $($field).timepicker("setTime", validTime);
		  } else if ($maxTime != null && parseInt(temp) > $maxTime) {
		    var validTime = convertTime($maxTime);
		 
		    $($field).timepicker("setTime", validTime);
	      } else if ($minTime != null && parseInt(temp) < $minTime) {
		    var validTime = convertTime($minTime);
		 
		    $($field).timepicker("setTime", validTime);
	      }	
	    });
	  } else {
		  resetTimeField();
		  addAndRemoveError(false, timeDateField, clinicNotAvailableErrorMessage);
		  $($field + "-container").addClass("hidden");
	  }
	}
	
	function reInitTimeField($date) {
	  var newDate = new Date($date[0] + "-" + $date[1] + "-" + $date[2] + "T10:00:00Z");
      var day = newDate.getDay();

	  if ($("input[name='" + clinicRadioName + "']:checked").val() != undefined) {
		var selectedClinic = clinics.find(clinic => clinic.name === $("input[name='" + clinicRadioName + "']:checked").val());
		var selectedClinicHours = selectedClinic.hours;
		var selectedClinicLunchHours = selectedClinic.lunch;

		resetTimeField();
		initTimepicker(timeHourFiled, selectedClinicHours[day].min, selectedClinicHours[day].max, selectedClinicLunchHours[day].min, selectedClinicLunchHours[day].max);  
	  }
	}
	
	function resetTimeField() {
	  $("#time-hour-input").val("");
	  $("#time-minute-input").val("");
	  
	  $(timeHourFiled).timepicker("setTime", "");
	}
	
	function onUpdateEvent() {
	  onKeyUpCheckRequired(userNameField);
	  onKeyUpCheckRequired(userMessengerIdField);
	  onChangeEmail();
	}
	
	function onChangeEmail() {
	  $(userEmailAddressField).keyup(function() {
	    if (isRequiredFieldValid(userEmailAddressField)) {
		  isEmailValid();
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
	  if (!isRequiredFieldValid(userNameField)) { errorField = setErrorField(isValid, userNameField, errorField); isValid = false; }
	  if (!isRequiredFieldValid(userMessengerIdField)) { errorField = setErrorField(isValid, userNameField, errorField); isValid = false; }
	  if (!isRequiredFieldValid(userEmailAddressField) || !isEmailValid()) { errorField = setErrorField(isValid, userEmailAddressField, errorField); isValid = false; }
	  
	  if (!isValid) {
	    $('html, body').animate({ scrollTop: $(errorField).offset().top - 25 }, 0);
	  }
	  
	  return isValid;
	}
	
	function setErrorField($isValid, $field, $previousField) {
	  return $isValid ? $field : $previousField;
	}
	
	function isClinicAvailable() {
	  addAndRemoveError(isClinicValid(), timeDateField, clinicNotAvailableErrorMessage);
	  
	  return isClinicValid();
	}
	
	function isClinicValid() {
  	  var val = $(timeDateField).val();
	  
	  if (val) {
		var date = val.split(".");
	    var newDate = new Date(date[0] + "-" + date[1] + "-" + date[2] + "T10:00:00Z");
        var day = newDate.getDay();

	    if ($("input[name='" + clinicRadioName + "']:checked").val() != undefined) {
		  var selectedClinicHours = clinics.find(clinic => clinic.name === $("input[name='" + clinicRadioName + "']:checked").val()).hours;
		  return selectedClinicHours[day].min != null && selectedClinicHours[day].max != null;
	    }  
	  }
	  
	  return isRequiredFieldValid(timeDateField);
	}
	
	function isRadioChecked($radioName, $inputField) {
	  var isRadioValid = $("input[name='" + $radioName + "']:checked").val() != undefined;
	  
	  addAndRemoveError(isRadioValid, $inputField, requiredErrorMessage);
	  
	  return isRadioValid;
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
	
	function addClinicInfo() {
	  if ($("input[name='" + clinicRadioName + "']:checked").val() != undefined) {
		$(clinicInfoContainer).removeClass("hidden");

		var selectedClinic = clinics.find(clinic => clinic.name === $("input[name='" + clinicRadioName + "']:checked").val());
		var clinicAddress = selectedClinic.address;
		var clinicHours = selectedClinic.hours;
		var clinicSupportLanguages = selectedClinic.supportLanguages;
		
		var businessHoursTemplate = "";
		var supportLanguagesTemplate = "";
		
		for (var idx = 0; idx < clinicHours.length; idx++) {
		  var minHours = clinicHours[idx].min;
		  var maxHours = clinicHours[idx].max;
		  
		  var formattedMinHours = minHours != null ? convertTime(minHours) : null;
		  var formattedMaxHours = maxHours != null ? convertTime(maxHours) : null;
		  
		  var isClosed = formattedMinHours == null || formattedMaxHours == null;
		  var openHours = isClosed ? "Closed" : formattedMinHours + " - " + formattedMaxHours;
		  var hoursClass = isClosed ? "col-7 text-danger" : "col-7";
			
		  businessHoursTemplate += "<span class='col-5'>" + days[idx] + ": </span><span class='notranslate " + hoursClass + "'>" + openHours + "</span><br>";
		}
		
		for (var idx = 0; idx < clinicSupportLanguages.length; idx++) {		  
		  if (idx > 0) {
		    supportLanguagesTemplate += ", "
		  }
		  
		  supportLanguagesTemplate += clinicSupportLanguages[idx];
		}

		$("#clinic-info__address").html(clinicAddress);
		$("#clinic-info__business-hours").html(businessHoursTemplate);
		$("#clinic-info__support-languages").html(supportLanguagesTemplate);
	  } else {
		$(clinicInfoContainer).addClassClass("hidden");
	  }
	}
	
	function convertTime($time) {
	  return $time > 1200 ? (parseInt($time.toString().substr(0, $time.toString().length - 2)) - 12 + ":" + $time.toString().substr($time.toString().length - 2, 2) + " PM")
		     : (($time.toString().substr(0, $time.toString().length - 2)) + ":" + ($time.toString().substr($time.toString().length - 2, 2)) + " AM");
	}
});