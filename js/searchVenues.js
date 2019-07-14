/*SEACRCH FIELDS*/
let autocomplete;
const initializePlaceInputAutoComplete = () => {
    autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('autocomplete')),
        { types: ['(cities)'] });
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        fetchVenues(null,autocomplete.getPlace().address_components[0].long_name, categoryField.value, radiusField.value);
    });


};
document.addEventListener("DOMContentLoaded", function() {
    initializePlaceInputAutoComplete();

    categoryField = document.querySelector("#category");
    radiusField = document.querySelector("#radius");
    latAndLngField = document.querySelector("#userLatAndLng");

    categoryField.addEventListener('change', (event) => {
        fetchVenuesWithSearchParam();
    });
    radiusField.addEventListener('change', (event) => {
        fetchVenuesWithSearchParam();
    });



    const fetchVenuesWithSearchParam = () =>{
        const place = autocomplete.getPlace() ? autocomplete.getPlace().address_components[0].long_name : null;
        fetchVenues(latAndLngField.value, place, categoryField.value, radiusField.value);
    };

});


