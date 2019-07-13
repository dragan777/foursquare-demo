
//default base confiugation that are used for this app
const config = {


  fourSquare : {
    explore:
      {
        url:"https://api.foursquare.com/v2/venues/explore",
        params:{
          client_id:"VMVJRKPXD5COIE1TJO4E1EXWZHSJJTLW2XF0EUF0MIGWUNPN",
          client_secret:"JHRJL5ACM1FHT1RWGNZOJDZLYLNP1UMEAKQVPDTI3BHKNFEK",
          v:20180323,
          limit: 30,
          ll: "40.7243,-74.0018"
        }
      }
  }

};





//function that render list of venues from retreived json
const renderVenues = (data) =>  {
  document.querySelector('#venuesWrapper').innerHTML = "";
  data.forEach(item => buildVenueCard(item.venue))

};



//get user location
const getLocation = () =>  {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showVenuesForUserLocation,showDefaultVenues);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";

  }
};




const showVenuesForUserLocation = (position) =>  {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const latAndLng = lat + "," + lon;
  document.querySelector("#userLatAndLng").value = latAndLng;
  fetchVenues(latAndLng);
};

const showDefaultVenues = () =>  {
  document.querySelector("#userLatAndLng").value = config.fourSquare.params.ll;
  fetchVenues();
};



const fetchVenues = (latAndLng, place, category, radius, ) =>  {

  var url = new URL(config.fourSquare.explore.url);

  var params = config.fourSquare.explore.params;

  if(place){
    // if user search for custom location we remove ll prop for params and we are adding near param
    delete params.ll;
    params.near = place;
  }else if(latAndLng){
    //if lat and lng are fetch from browser we need to override default lan and lng
    params.ll = latAndLng;
  }
  if(category){
    params.section = category;
  }
  if(radius){
    params.radius = radius;
  }
  url.search = new URLSearchParams(params);


  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderVenues( data.response.groups[0].items);

    })
    .catch(function() {
      // Code for handling errors
    });

};


//function that create and append venue html on parent wrapper
// best solution for this can be done with react with usage of jsx
const buildVenueCard = (venue) => {

  venuesWrapper = document.querySelector('#venuesWrapper');
  // Create elements needed to build a card
  const columnDiv = document.createElement('div');
  const cardDiv = document.createElement('div');
  const h4 = document.createElement('h4');
  const currentVisitors = document.createElement('span');
  const a = document.createElement('a');
  const addressParagraph = document.createElement('p');

  // Append newly created elements into the DOM
  venuesWrapper.append(columnDiv);
  h4.append(a);
  h4.append(currentVisitors);
  cardDiv.append(h4);

  cardDiv.append(addressParagraph);
  columnDiv.append(cardDiv);

  // Set content and attributes
  addressParagraph.innerHTML = venue.location.formattedAddress.join(" | ");
  currentVisitors.innerHTML = venue.hereNow.count;
  currentVisitors.setAttribute("class", "badge badge-info");
  a.innerHTML = venue.name;
  a.setAttribute('href',"#");//TODO DETAIL VENUE
  a.setAttribute('data-toggle',"modal");
  a.setAttribute('id', venue.id);
  a.setAttribute('class', 'openDetailsDialog');
  columnDiv.setAttribute('class', 'col-12 col-sm-6 mb-5');
  cardDiv.setAttribute('class', 'card p-2')
};
getLocation();
