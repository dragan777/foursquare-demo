/*SEACRCH FIELDS*/

document.addEventListener("DOMContentLoaded", function() {

  locationSearch = document.querySelector("#autocomplete");
  categorySearch = document.querySelector("#category");
  radusSearch = document.querySelector("#radius");
  latAndLng = document.querySelector("#userLatAndLng");

  categorySearch.addEventListener('change', (event) => {
      fetchVenues(latAndLng.value,locationSearch.value, categorySearch.value, radusSearch.value);

  });
  radusSearch.addEventListener('change', (event) => {
    fetchVenues(latAndLng.value, locationSearch.value, categorySearch.value, radusSearch.value);
  });

  initializePlaceInputAutoComplete();


});


const initializePlaceInputAutoComplete = () => {
  autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete')),
    { types: ['(cities)'] });
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    fetchVenues(null,autocomplete.getPlace().address_components[0].long_name, categorySearch.value, radusSearch.value);
  });


};