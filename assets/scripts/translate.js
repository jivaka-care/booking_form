function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en', autoDisplay: false, includedLanguages: 'en,ja,zh-CN'}, 'google_translate_element');
}

function onChangeLanguage(language) {
  var selectField = document.querySelector("#google_translate_element select");
  console.log(selectField.children.length);
  for(var i=0; i < selectField.children.length; i++){
	var option = selectField.children[i];

	if(option.value==language){
	   selectField.selectedIndex = i;
	   selectField.dispatchEvent(new Event('change'));
	   break;
	}
  }
}