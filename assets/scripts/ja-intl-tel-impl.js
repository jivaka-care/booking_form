var input = document.querySelector("#user-phone-number");
window.intlTelInput(input, {
  // allowDropdown: false,
  // autoHideDialCode: false,
  // autoPlaceholder: "off",
  dropdownContainer: document.body,
  customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
    return "e.g. " + selectedCountryPlaceholder;
  },
  // excludeCountries: ["us"],
  // formatOnDisplay: false,
  geoIpLookup: function(success, failure) {
    $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
      var countryCode = (resp && resp.country) ? resp.country : "";
      success(countryCode);
    });
  },
  hiddenInput: "entry.992934898",
  initialCountry: "auto",
  // localizedCountries: { 'de': 'Deutschland' },
  // nationalMode: false,
  // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
  // placeholderNumberType: "MOBILE",
  // preferredCountries: ['cn', 'jp'],
  separateDialCode: true,
  utilsScript: "https://eng.ppeum.com/wp-content/jivaka/202001141445/assets/libs/intl-tel-input-16.0.0/build/js/utils.js",
});