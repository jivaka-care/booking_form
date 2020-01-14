$(document).ready(function () {
	var requiredErrorMessage = "This field is required";
	var emailPatternInvalidErrorMessage = "Invalid email address. Valid e-mail can contain only latin letters, numbers, '@' and '.' (e.g: example@domain.com)";
	var phoneNumberPatternInvalidErrorMessage = "Invalid phone number. Valid phone number contain only numbers (e.g: 01012345678)";
	var clinicNotAvailableErrorMessage = "Clinic is closed. Please select another date!";
	
	var userFirstNameField = "#user-first-name";
	var userLastNameField = "#user-last-name";
	var userBirthdayField = "#user-birthday";
	var userNationalityField = "#user-nationality";
	var userMessengerTypeField = "#user-messenger-type";
	var userEmailAddressField = "#user-email-address";
	var userPhoneNumberField = "#user-phone-number";
	var clinicField = "#clinic";
	var treatmentField = "#treatment";
	var timeDateField = "#time-date";
	var timeHourFiled = "#time-hour";
	
	var clinicInfoContainer = "#clinic-info-container";
	
	var clinicRadioName = "entry.896669018";
	var treatmentRadioName = "entry.1855726954";
	
	var datepickerParams = { format: "yyyy.mm.dd", autoclose: true };
	
    var clinics = [
        {
            name: "Ppeum Myeongdong",
            address: "Ewha building 6, 7 floor<br>11 Myeongdong 8ga-gil, Jung-gu, Seoul<br>(66-27Chungmuro 2(i)-ga)",
            supportLanguages: ["English", "Chinese", "Japanese"],
            hours: [
            { min: 1030, max: 1530 },
            { min: 1030, max: 1930 },
            { min: 1030, max: 1930 },
            { min: 1030, max: 1930 },
            { min: 1030, max: 1930 },
            { min: 1030, max: 1930 },
            { min: 1030, max: 1730 },
            ],
			lunch: [
			{ min: 1300, max: 1330 },
            { min: 1300, max: 1400 },
            { min: 1300, max: 1400 },
            { min: 1300, max: 1400 },
            { min: 1300, max: 1400 },
            { min: 1300, max: 1400 },
            { min: 1300, max: 1400 },
			]
        },
        {
            name: "Ppeum Sinnonhyeon",
            address: "808 Tower 13th, 14th floor<br>Gangnamdae-ro 470, Gangnam-gu, Seoul",
            supportLanguages: ["Chinese", "Japanese"],
            hours: [
            { min: 1100, max: 1530 },
            { min: 1030, max: 1930 },
            { min: 1030, max: 1930 },
            { min: 1030, max: 1930 },
            { min: 1030, max: 1930 },
            { min: 1030, max: 1930 },
            { min: 1030, max: 1530 },
            ],
			lunch: [
			{ min: 1300, max: 1400 },
            { min: 1300, max: 1400 },
            { min: 1300, max: 1400 },
            { min: 1300, max: 1400 },
            { min: 1300, max: 1400 },
            { min: 1300, max: 1400 },
            { min: 1300, max: 1400 },
			]
        },
        {
            name: "Ppeum Sinsa",
            address: "131, Dosan-daero, Gangnam-gu, Seoul, Korea",
            supportLanguages: ["Chinese", "Japanese"],
            hours: [
            { min: 1030, max: 1530 },
            { min: 1030, max: 1930 },
            { min: 1030, max: 1930 },
            { min: 1030, max: 1930 },
            { min: 1030, max: 1930 },
            { min: 1030, max: 1930 },
            { min: 1030, max: 1730 },
            ],
			lunch: [
			{ min: 1300, max: 1400 },
            { min: 1300, max: 1400 },
            { min: 1300, max: 1400 },
            { min: 1300, max: 1400 },
            { min: 1300, max: 1400 },
            { min: 1300, max: 1400 },
            { min: 1300, max: 1400 },
			]
        },
        {
            name: "Ppeum Hongdae",
            address: "140, Yanghwa-ro, Mapo-gu, Seoul,south Korea",
            supportLanguages: [""],
            hours: [
            { min: 1030, max: 1530 },
            { min: 1030, max: 1930 },
            { min: 1030, max: 1930 },
            { min: 1030, max: 1930 },
            { min: 1030, max: 1930 },
            { min: 1030, max: 1930 },
            { min: 1030, max: 1730 },
            ],
			lunch: [
			{ min: 1300, max: 1400 },
            { min: 1300, max: 1400 },
            { min: 1300, max: 1400 },
            { min: 1300, max: 1400 },
            { min: 1300, max: 1400 },
            { min: 1300, max: 1400 },
            { min: 1300, max: 1400 },
			]
        }
    ];
	
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	
	var prevTime = 0000;
	var minusHalfMinutes = 70;
	
    $(userBirthdayField).datepicker(datepickerParams);
	
	$(timeDateField).datepicker(datepickerParams);
	initTimepicker(timeHourFiled, 0000, 2400, null, null);	
	onUpdateEvent();
	
	$(userBirthdayField).change(function() {
      var val = $(this).val();
	  var date = val.split(".");
      
	  $(userBirthdayField + "-year-input").val(date[0]);
	  $(userBirthdayField + "-month-input").val(date[1]);
	  $(userBirthdayField + "-day-input").val(date[2]);
	});
	
	$(".btn-messenger-type").click(function() {
      var text = $(this).attr("name");
      $(userMessengerTypeField + "-input").val(text);
	  
	  $(".btn-messenger-type").removeClass("choosed");
	  $("img[name='" + text + "']").addClass("choosed");
	});
	
	$(clinicField).change(function(){
	  addClinicInfo();
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
	
	$(timeHourFiled).change(function() {
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
		
		  var temp = ((mer == "PM" && h < 12) ? ((h+12) + "" + m) : ((mer == "AM" && h >= 12) ? ((h-12) + "" + m) : (h + "" + m)));
		
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
	  onKeyUpCheckRequired(userFirstNameField);
	  onKeyUpCheckRequired(userLastNameField);
	  onChangeCheckRequired(userBirthdayField);
	  onKeyUpCheckRequired(userNationalityField);
	  onChangeEmail();
	  onChangePhoneNumber();
	  onCheckedOptionCheckRequired("radio", clinicRadioName, clinicField);
	  onCheckedOptionCheckRequired("radio", treatmentRadioName, treatmentField);
	  onChangeCheckRequired(timeDateField);
	  onChangeCheckRequired(timeHourFiled);	  
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
	  if (!isRequiredFieldValid(userEmailAddressField) || !isEmailValid()) { errorField = setErrorField(isValid, userEmailAddressField, errorField); isValid = false; }
	  if (!isRequiredFieldValid(userPhoneNumberField) || !isPhoneNumberValid()) { errorField = setErrorField(isValid, userPhoneNumberField, errorField); isValid = false; }
	  if (!isRadioChecked(clinicRadioName, clinicField)) { errorField = setErrorField(isValid, clinicField, errorField);  isValid = false; }
	  if (!isRadioChecked(treatmentRadioName, treatmentField)) { errorField = setErrorField(isValid, treatmentField, errorField);  isValid = false; }
	  if (!isClinicAvailable()) { errorField = setErrorField(isValid, timeDateField, errorField); isValid = false; }
	  if (!isRequiredFieldValid(timeHourFiled)) { errorField = setErrorField(isValid, timeDateField, errorField); isValid = false; }
	  
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